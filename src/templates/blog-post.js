import React from "react"
import { Link, graphql } from "gatsby"
import { useForm, usePlugin } from "tinacms";
import { useRemarkForm, DeleteAction } from 'gatsby-tinacms-remark'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, pageContext, location }) => {

  console.log(data)

  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = pageContext

  const post = data.markdownRemark;

  const [remark, form] = useRemarkForm(data.markdownRemark, {
    label: "Blog Post",
    actions: [DeleteAction],
    fields: [
      {
        label: 'Title',
        name: 'frontmatter.title',
        description: 'Enter the title of the post here',
        component: 'text',
      },
      {
        label: 'Description',
        name: 'frontmatter.description',
        description: 'Enter the post description',
        component: 'textarea',
      },
      {
        name: "frontmatter.draft",
        component: "toggle",
        label: "Draft",
      },
      {
        label: "Body",
        name: "rawMarkdownBody",
        description: 'Enter the post body',
        component: 'markdown'
      },
    ]
  });

  usePlugin(form);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={remark.frontmatter.title}
        description={remark.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{remark.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
       
        <br/>
      
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <br/>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(published: { eq: true },fields: { slug: { eq: $slug } }) {
      ...TinaRemark
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        draft
      }
    }
  }
`
