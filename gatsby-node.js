const { createFilePath } = require('gatsby-source-filesystem')

// Replacing '/' would result in empty string which is invalid
const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``))
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions

  const oldPage = Object.assign({}, page)
  // Remove trailing slash unless page is /
  page.path = replacePath(page.path)
  if (page.path !== oldPage.path) {
    // Replace new page with old page
    deletePage(oldPage)
    createPage(page)
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  const BlogPostTemplate = require.resolve('./src/templates/blog-post.js')
  const BlogPostMysqlTemplate = require.resolve('./src/templates/blog-post-mysql.js')
  const BlogPostShareImage = require.resolve(
    './src/templates/blog-post-share-image.js'
  )
  const PageTemplate = require.resolve('./src/templates/page.js')
  const PostsBytagTemplate = require.resolve('./src/templates/tags.js')
  const ListPostsTemplate = require.resolve(
    './src/templates/blog-list-template.js'
  )
  const ListPostsMysqlTemplate = require.resolve(
    './src/templates/blog-list-mysql-template.js'
  )

  const ListPostsCategoryTemplate = require.resolve(
    './src/templates/blog-category-template.js'
  )
  const allMarkdownQuery = await graphql(`
    {
      allMarkdown: allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              slug
              tags
            }
          }
        }
      }
    }
  `)

  if (allMarkdownQuery.errors) {
    reporter.panic(allMarkdownQuery.errors)
  }

  const postPerPageQuery = await graphql(`
    {
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }
  `)

  const markdownFiles = allMarkdownQuery.data.allMarkdown.edges

  const posts = markdownFiles.filter(item =>
    item.node.fileAbsolutePath.includes('/content/posts/')
  )

  // generate paginated post list
  const postsPerPage = postPerPageQuery.data.site.siteMetadata.postsPerPage
  const nbPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: nbPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/pages/${i + 1}`,
      component: ListPostsTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        currentPage: i + 1,
        nbPages: nbPages,
      },
    })
  })

  // generate blog posts
  posts.forEach((post, index, posts) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.frontmatter.slug,
      component: BlogPostTemplate,
      context: {
        slug: post.node.frontmatter.slug,
        previous,
        next,
      },
    })

    // generate post share images (dev only)
    if (process.env.gatsby_executing_command.includes('develop')) {
      createPage({
        path: `${post.node.frontmatter.slug}/image_tw`,
        component: BlogPostShareImage,
        context: {
          slug: post.node.frontmatter.slug,
          width: 440,
          height: 220,
          type: 'twitter',
        },
      })
      createPage({
        path: `${post.node.frontmatter.slug}/image_fb`,
        component: BlogPostShareImage,
        context: {
          slug: post.node.frontmatter.slug,
          width: 1200,
          height: 630,
          type: 'facebook',
        },
      })
    }
  })

  // generate pages
  markdownFiles
    .filter(item => item.node.fileAbsolutePath.includes('/content/pages/'))
    .forEach(page => {
      createPage({
        path: page.node.frontmatter.slug,
        component: PageTemplate,
        context: {
          slug: page.node.frontmatter.slug,
        },
      })
    })

  // generate tags
  markdownFiles
    .filter(item => item.node.frontmatter.tags !== null)
    .reduce(
      (acc, cur) => [...new Set([...acc, ...cur.node.frontmatter.tags])],
      []
    )
    .forEach(uniqTag => {
      createPage({
        path: `term/${uniqTag}`,
        component: PostsBytagTemplate,
        context: {
          tag: uniqTag,
        },
      })
    })

  ///
  //  msyql posts
  const allMysqlWpQuery = await graphql(`
    {
    allMysqlWpPosts(
      filter: {post_type: {eq: "post"},
      post_status: {eq: "publish"}},
      sort: {fields:post_date}
      limit: 10000
      ) {
        edges {
          node {
            ID
            post_name
            post_title
            post_content
            post_excerpt
          }
          previous {
              post_name
              post_title
            }
          next {
              post_name
              post_title
            }
        }
      },
    allMysqlCategories:allMysqlWpTerm(
      filter: {WpTaxonomies: {elemMatch: {taxonomy: {regex: "/(category|post_tag)/i"}}}}
      ) {
        edges {
          node {
            name
            slug
            WpTaxonomies {
              type:taxonomy
              term_taxonomy_id
              WpTermRelations {
                ID: object_id
              }
            }
          }
        }
      }
    }
  `)

  if (allMysqlWpQuery.errors) {
    reporter.panic(allMysqlWpQuery.errors)
  }

  const mysqlWpPosts = allMysqlWpQuery.data.allMysqlWpPosts.edges
  const nbPagesMyql = Math.ceil(mysqlWpPosts.length / postsPerPage)

  Array.from({ length: nbPagesMyql }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/pages/${i + 1}`,
      component: ListPostsMysqlTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        currentPage: i + 1,
        nbPages: nbPagesMyql,
      },
    })

  })



  mysqlWpPosts.forEach(({ node: post, previous, next }, index, mysqlWpPosts) => {
    const previousNumber = index === mysqlWpPosts.length - 1 ? null : mysqlWpPosts[index + 1].node
    const nextNumber = index === 0 ? null : mysqlWpPosts[index - 1].node

    // pages without directories
    createPage({
      path: `/posts/${post.post_name}.html`,
      component: BlogPostMysqlTemplate,
      component: BlogPostMysqlTemplate,
      context: {
        slug: post.post_name,
        previous: previousNumber,
        next: nextNumber,
        postNext: next ? next.post_name : '0',
        postPrevious: previous ? previous.post_name : '0'
      },
    })



    createPage({
      path: `/${post.post_name}`,
      component: BlogPostMysqlTemplate,
      component: BlogPostMysqlTemplate,
      context: {
        slug: post.post_name,
        previous: previousNumber,
        next: nextNumber,
        postNext: next ? next.post_name : '0',
        postPrevious: previous ? previous.post_name : '0'
      },
    })

    createRedirect({
      fromPath: `/${post.post_name}/feed`,
      isPermanent: true,
      force: true,
      redirectInBrowser: true,
      toPath: `/${post.post_name}`,
    })

  }
  )

  // mysql categories
  const mysqlWpCategories = allMysqlWpQuery.data.allMysqlCategories.edges

  mysqlWpCategories.forEach(({ node: category }, index) => {
    category.WpTaxonomies.map((taxonomy) => {
      createPage({
        path: `/${taxonomy.type === 'category' ? 'category' : 'tag'}/${category.slug}.html`,
        component: ListPostsCategoryTemplate,
        context: {
          slug: category.slug,
          taxonomyID: taxonomy.term_taxonomy_id,
          limit: postsPerPage,
          skip: 0,
        },
      })
    })

  }
  )

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

