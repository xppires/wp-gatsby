import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import PostsListItem from '../components/PostsListItem'

class mysqlTest extends React.Component {
    render() {
        const posts = this.props.data.allMysqlWpPosts.edges;
        return (
            <Layout>
                {posts.map(({ node }) => {

                    const props = {
                        title: node.post_title,
                        excerpt: node.post_content,
                        slug: node.post_name,
                        date: node.post_date,
                        language: node.language || 'pt',
                        tags: node.tags || [],
                    }

                    return <PostsListItem key={props.slug} {...props} />
                })}
            </Layout>
        )
    }
}

export default mysqlTest

export const pageQuery = graphql`
  query blogListMysqlQuery {
  allMysqlWpPosts(filter: {post_type: {eq: "post"}, post_status: {eq: "publish"}}, skip: 0, limit: 10) {
    edges {
      node {
        ID
        post_name
        post_title
        WpMetas {
          meta_key
          meta_value
        }
        post_content
        WpComments {
          comment_author_url
          comment_date_gmt
          comment_content
          comment_approved
          comment_author
        }
        post_excerpt
      }
    }
  }
  }
`