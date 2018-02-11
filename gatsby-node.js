const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const blogPostTempĺate = path.resolve('src/templates/blog-post.jsx')

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              date
              path
              title
              excerpt
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTempĺate
      })
    })
  })
}
