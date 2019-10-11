import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import SEO from '../components/SEO'
import PostsListItem from '../components/PostsListItem'
import { Text } from '../components/Commons'

const MainTitle = styled.h1`
  line-height: 1.5;
  text-align: center;
  font-size: 3rem;
`

const Ghost = styled.p`
  line-height: 1.5;
  text-align: center;
  font-size: 7rem;
`

const SubTitle = styled.h2`
  padding-top: 40px;
  line-height: 1.2;
  border-top: 1px solid #ececec;
  margin-top: 44px;
`

const NotFoundPage = props => {
  const data = useStaticQuery(graphql`
      query {
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
            filter: {post_type: {eq: "post"}, post_status: {eq: "publish"}},
            sort: {fields: post_date, order: DESC},
            limit: 4
            skip: 0
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
  `)

  const posts = props.data.allMysqlWpPosts.edges;
  const defaultImage = props.data.defaultImage.childImageSharp
  return (
    <Layout location={props.location} noCover={true}>
      <SEO title="Page Not Found" />
      <Wrapper>
        <MainTitle>404 Page Not Found</MainTitle>
        <Ghost>👻</Ghost>
        <Text>
          Nós tentamos encontrar as páginas correspondentes do nosso website.
        </Text>

        <SubTitle>Seguem algumas sugestões</SubTitle>

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
    </Layout>
  )
}

export default NotFoundPage
