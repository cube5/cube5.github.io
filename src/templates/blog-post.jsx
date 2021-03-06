import './styles/blog-post.css';
import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

const Template = ({ data, location }) => {
  const { markdownRemark: post } = data
  const { frontmatter, html } = post
  const { title, date } = frontmatter

  return (
    <div className='content'>
      <Helmet title={`${title} - My Blog`} />
      <h1>{title}</h1>
      <h3>{date}</h3>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        path
        tags
        excerpt
      }
    }
  }
`

export default Template
