---
title: Combining rust-chef and Docker BuildKit
draft: true
description: >-
  Combining rust-chef and Docker BuildKit to properly cache cargo dependencies
  and incremental builds in a fast way.
---
Properly caching downloaded cargo dependencies and building rust incrementally inside a docker environment can be a daunting task. There's quite a bit of differing information across the web. Popular solutions like [building a skeleton project with the needed Cargo.toml and rebuilding with the true source folder](https://stackoverflow.com/questions/58473606/cache-rust-dependencies-with-docker-build) did not work for me. Cargo would happily download all my dependencies every time I tried rebuilding the docker image. To fix this, I used [cargo-chef](https://crates.io/crates/cargo-chef), a handy cargo extension for this exact use case. 

There was one problem left though. Rebuilding the docker-image when using new dependencies still took _forever_. To fix this and a couple of smaller caching issues, I used [Docker BuildKit]()

The solution:

    # syntax=docker/dockerfile:experimental
    FROM rust as planner
    WORKDIR app
    RUN cargo install cargo-chef
    COPY . .
    RUN cargo chef prepare --recipe-path recipe.json
    FROM rust as cacher
    WORKDIR app
    RUN cargo install cargo-chef
    COPY --from=planner /app/recipe.json recipe.json
    RUN --mount=type=cache,target=/usr/local/cargo/registry \
        --mount=type=cache,target=/home/root/app/target \
        cargo chef cook --release --recipe-path recipe.json
    FROM rust as builder
    WORKDIR app
    COPY . .
    # Copy over cache
    COPY --from=cacher /app/target target
    COPY --from=cacher $CARGO_HOME $CARGO_HOME
    RUN --mount=type=cache,target=/usr/local/cargo/registry \
        --mount=type=cache,target=/app/target \
        cargo build --release --bin binary
    FROM rust as runtime
    WORKDIR app
    COPY --from=builder /app/target/release/binary /usr/local/bin
    ENTRYPOINT ["/usr/local/bin/service-serving-layer"]