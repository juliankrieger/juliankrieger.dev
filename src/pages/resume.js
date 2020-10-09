import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Resume = ({ data, pageContext, location }) => {

    const siteTitle = data.site.siteMetadata?.title || `Title`

    return (
        <Layout location={location} title={siteTitle}>
            <SEO title="Resume" />
            <p>
                You can find the latest version of my resume <a href="">here</a>
        </p>
        </Layout>
    )
}

export default Resume;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`