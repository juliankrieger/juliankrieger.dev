/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  //const avatar = data?.avatar?.childImageSharp?.fixed
  const avatar = undefined;

  return (
    <div className="bio">
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && (
        <div>
          <strong>{author.name}</strong>
          <br/>
          <i>{author?.summary || null}</i>
          <p>
            {
              author.name.split('').map(_ => "=")
            }
          </p>
          <br />
          <p>
            #### Skills 
          </p>
          <ol>
            <p> - JavaScript, TypeScript, Python, C#, Rust and others</p>
            <p> - React, Vue and Node.js</p>
            <p> - <i>DefinitelyTyped</i> contributor</p>
          </ol>
          <p>#### About</p>
          <br />
          <p>
            I enjoy learning about new programming languages, frameworks and tools in my free time. Recently, I've been infatuated 
            with <a href="https://www.rust-lang.org/">Rust</a>.
          </p>
          <br />
          <p>#### Noteable Projects</p>
          <br />
          <p>
            I wrote a driver for a specific type of SNES Controller. You can find it 
            <a href="https://github.com/juliankrieger/iBuffalo-Snes-Controller-Driver"> here</a>
          </p>
          
        </div>
      )}
    </div>
  )
}

export default Bio
