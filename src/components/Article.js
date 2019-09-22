import React from 'react'
import styled from 'styled-components'
import Bio from './Bio'
import Content from './Content'

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

class Article extends React.Component {
  render() {
    const { post } = this.props
    const postDate = post.frontmatter ? post.frontmatter.date : (post.date || '')
    const postTags = post.frontmatter ? post.frontmatter.tags : (post.tags || [])
    return (
      <ArticleWrapper>
        <Content
          content={post.body}
          date={postDate}
          tags={postTags}
        />
        <ArticleFooter>
          <Bio />
        </ArticleFooter>
      </ArticleWrapper>
    )
  }
}

export default Article
