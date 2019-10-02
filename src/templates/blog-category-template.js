import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import PostsListItem from '../components/PostsListItem'
import Hero from '../components/Hero'
import Pagination from '../components/Pagination'

import Wrapper from '../components/Wrapper'

class mysqlCategoryPosts extends React.Component {
    render() {
        const { title, description } = this.props.data.site.siteMetadata
        const posts = this.props.data.allMysqlWpPosts.edges;
        const defaultImage = this.props.data.defaultImage.childImageSharp
        const { pageContext } = this.props
        return (
            <Layout>
                <Hero title={title} subTitle={description} />
                <Wrapper>
                    {posts.map(({ node }) => {
                        let image = node.WpImages.map(({ mysqlImage }, index) => {
                            if (index === 0) return mysqlImage.childImageSharp;
                        })
                        let imageYT = node.WpYTImages.map(({ mysqlImage }, index) => {
                            if (index === 0) return mysqlImage.childImageSharp;
                        })
                        const props = {
                            title: node.post_title,
                            excerpt: node.post_txt.substring(0, 360) + '...',
                            slug: node.post_name,
                            date: node.post_date,
                            language: node.language || 'pt',
                            tags: node.tags || [],
                            img: image[0] || imageYT[0] || defaultImage
                        }

                        return <PostsListItem key={props.slug} {...props} />
                    })}
                </Wrapper>
                {/* <Pagination
                    nbPages={pageContext.nbPages}
                    currentPage={pageContext.currentPage}
                /> */}

            </Layout>
        )
    }
}

export default mysqlCategoryPosts

export const pageQuery = graphql`
  query categoryPostsListMysqlQuery($taxonomyID: Int!, $skip: Int!, $limit: Int!) {
        site {
            siteMetadata {
                title
                description
            }
        }
        defaultImage:file(name: {eq: "source_flor_400x400"}) {
            childImageSharp {
                fluid(maxWidth: 300 ) {
                    ...GatsbyImageSharpFluid
                    }
            }
        }
        allMysqlWpPosts(
            filter: {
                post_type: {eq: "post"},
                post_status: {eq: "publish"}
                WpTermPosts: {elemMatch: {term_taxonomy_id: {eq: $taxonomyID}}}
                },
            sort: {fields: post_date, order: DESC},
            limit: $limit
            skip: $skip
            ) {
            edges {
            node {
                ID
                post_name
                post_title
                WpMetas {
                meta_key
                meta_value
                }
                post_txt
                WpComments {
                comment_author_url
                comment_date_gmt
                comment_content
                comment_approved
                comment_author
                }
                WpImages {
                    mysqlImage {
                        childImageSharp {
                            fluid(maxWidth: 300) {
                                ...GatsbyImageSharpFluid
                            }
                    }
                    }

                }
                WpYTImages {
                    mysqlImage {
                        childImageSharp {
                            fluid(maxWidth: 300) {
                                ...GatsbyImageSharpFluid
                            }
                    }
                    }

                }
            }
            }
        }
  }
`