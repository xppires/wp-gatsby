import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import Hero from '../components/Hero'
import Article from '../components/Article'
import PrevNextPost from '../components/PrevNextPost'
import SEO from '../components/SEO'
import Disqus from '../components/Disqus'

class BlogPostTemplate extends React.Component {
  render() {
    console.log(this.props.data)
    const post = this.props.data.post
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <SEO
          title={post.frontmatter.title}
          description={post.excerpt}
          cover={post.frontmatter.cover && post.frontmatter.cover.publicURL}
          imageFb={
            post.frontmatter.imageFb && post.frontmatter.imageFb.publicURL
          }
          imageTw={
            post.frontmatter.imageTw && post.frontmatter.imageTw.publicURL
          }
          lang={post.frontmatter.language}
          path={post.frontmatter.slug}
          isBlogPost
        />

        <Hero
          heroImg={post.frontmatter.cover && post.frontmatter.cover.publicURL}
          title={post.frontmatter.title}
        />

        <Wrapper>
          <Article post={post} />
        </Wrapper>

        <Wrapper>
          <Disqus slug={post.frontmatter.slug} title={post.frontmatter.title} />
          <PrevNextPost previous={previous} next={next} />
        </Wrapper>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlugMysql($slug: String!) {
  post: allMysqlWpPosts(filter: {post_name: {eq: $slug}}) {
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
