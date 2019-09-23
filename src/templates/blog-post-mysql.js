import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components';
import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import Hero from '../components/Hero'
import ContentHeader from '../components/ContentHeader'
import Bio from '../components/Bio'
import { colors } from '../tokens'
import Content from '../components/Content'
import PrevNextPost from '../components/PrevNextPost'
import SEO from '../components/SEO'
import Disqus from '../components/Disqus'

const ArticleWrapper = styled.article`
  padding: 0 30px 30px;

  @media only screen and (max-width: 500px) {
    padding: 0;
  }
`

const ArticleFooter = styled.footer`
  position: relative;
  margin: 6rem 0 0;
  padding: 3rem 0 0;
  border-top: 1px solid #ececec;
`
const ContentBody = styled.div`
  line-height: 1.6;

  & > h2 {
    padding-top: 3rem;
    margin-top: 3rem;
    border-top: 1px solid #ececec;
  }

  & > h3 {
    padding-top: 3rem;
  }

  & > p {
    margin: 1em 0 0 0;
  }

  & a {
    border-bottom: 1px dotted rgba(162, 162, 162, 0.8);

    &:hover {
      border-bottom-style: solid;
    }

    &.anchor,
    &.gatsby-resp-image-link {
      border: none;
    }
  }

  & > blockquote {
    box-sizing: border-box;
    margin: 1.75em 0 1.75em -2.2em;
    padding: 0 0 0 1.75em;
    border-left: 0.4em solid rgba(32, 35, 42, 0.85);
  }

  & > blockquote p {
    margin: 0.8em 0;
    font-style: italic;
  }

  & .gatsby-highlight {
    border-radius: 5px;
    font-size: 15px;
    line-height: 1.7;
    border-radius: 10px;
    overflow: auto;
    tab-size: 1.5em;
    margin: 1.5em 0em 1.5em 0;
  }

  & .gatsby-highlight > pre {
    border: 0;
    margin: 0;
    padding: 1;
  }

  & .gatsby-highlight-code-line {
    background-color: ${colors.highlight_code_linebg};
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid ${colors.highlight_code_bg};
  }

  & p > code.language-text,
  & li > code.language-text {
    background: ${colors.highlight_code_oneline};
    color: #222222cc;
    padding: 0 3px;
    font-size: 0.94em;
    border-radius: 0.3rem;
  }

  & table {
    margin-top: 1em;
    border-collapse: collapse;
    border-radius: 0.5em;
    overflow: hidden;

    & th,
    & td {
      padding: 0.5em;
      background: #e8e8e8;
      border-bottom: 2px solid ${colors.white};
    }
  }
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.post
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <SEO
          title={post.title}
          description={post.excerpt}
          cover={post.cover && post.cover.publicURL}
          imageFb={
            post.imageFb && post.imageFb.publicURL
          }
          imageTw={
            post.imageTw && post.imageTw.publicURL
          }
          lang={post.language || 'pt'}
          path={post.slug}
          isBlogPost
        />

        <Hero
          heroImg={post.cover && post.cover.publicURL}
          title={post.title}
        />

        <Wrapper>
          <ArticleWrapper>
            <section>
              {(post.tags || post.date) && <ContentHeader date={post.date} tags={post.tags} />}
              <ContentBody>
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
              </ContentBody>
            </section>
            <ArticleFooter>
              <Bio />
            </ArticleFooter>
          </ArticleWrapper>
        </Wrapper>

        <Wrapper>
          <Disqus slug={post.slug} title={post.title} />
          {/* <PrevNextPost previous={previous} next={next} /> */}
        </Wrapper>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlugMysql($slug: String!) {
  post: mysqlWpPosts(post_name: {eq: $slug}) {

          ID
          slug:post_name
          title:post_title
          date:post_date
          body:post_content
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
`
