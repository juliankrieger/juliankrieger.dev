import React from "react"
import { Link, graphql } from "gatsby"
import { RemarkCreatorPlugin } from 'gatsby-tinacms-remark';
import { withPlugin } from 'tinacms';

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'New Blog Post',
  filename: form => {
    return `content/blog/${form.title}/index.md`
  },
  frontmatter: form => {
    date: new Date()
  },
  fields: [
    {
      name: 'filename',
      component: 'text',
      label: 'Filename',
      placeholder: 'content/blog/hello-world/index.md',
      description: 'Full, relative path to new Markdown file'
    }
  ]
})

const Blog = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const posts = data.allMarkdownRemark.nodes
  
    if (posts.length === 0) {
      return (
        <Layout location={location} title={siteTitle}>
          <SEO title="Blog - All posts" />

          <p>
            There's nothing here yet.
          </p>
        </Layout>
      )
    }
  
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug
  
            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
      </Layout>
    )
  }
  
  export default withPlugin(Blog, CreatePostPlugin);
  
  export const pageQuery = graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(filter: { published: { eq: true } }, sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  `