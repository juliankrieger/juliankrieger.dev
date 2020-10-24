---
title: The arrogance of rolling your own build system
date: '2020-10-24T12:02:09.628Z'
description: >-
  Modern build systems are large, unwieldy, bloated with unneeded features for
  your use case or slow. You venture out to build your own, exactly as you need
  it. This can sometimes be a bad idea.
draft: true
---
I like eleventy. However, consider the following.

Your static site gen is slow. Well, it does a lot of stuff you don‘t need, so you switch to a lighter one. You choose eleventy. You build assets yourself. This is tedious and boring. You include asset building into eleventy. You then (after some time) decouple asset building from your SSG entirely, because it‘s a bit complicated. To do this, you install node packages which do these jobs outside of your SSG to replace bash scripts. Now you need a live server to work with your output in production. No problem, you can do this via node. 11ty includes a dev server. You want hot reloading, because manually restarting the server sucks. You also need cash busting because your stupid browser gets in the way with its nice ideas about caching. Man your output is large. You want to minify it. No problem, there‘s a node package for this after all! You begin to work with images and svgs a lot. Damn, importing via strings sucks. Isn‘t there a better solution for this? Sure enough, get another package or switch templating systems. You need JavaScript for interactivity. No problem, you can just write vanilla JS. Damn, this only works in Chrome? Better get Babel or something. Uh oh, my JS is getting large and unwieldy. TypeScript it is! Now embedding your JS file for file kind of sucks... Can‘t we just combine these into one?

Man, all these steps to take for your application to build. Configuration files are everywhere. Assets are large and begin to be unmanageable. You begin to pull your system together. It can do all these things at once.

This feels nice! Maybe you should open source it!

Need a name... Let‘s see... Your application-slash-buildsystem prepares assets, scripts and bundles them and _packs them for the web_.

„Packweb“ it is.