import React, { useState, useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
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
import FacebookComments from '../components/CommentsFacebook'

import YouTube from 'react-youtube';
import PostsListItem from '../components/PostsListItem'

import useSiteMetadata from '../hooks/use-site-config'
import useSiteImages from '../hooks/use-site-images'

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
  img {
    display:block;
    margin: 14px;
  }
  .videoembe {
    margin: 14px 0 0;
  }
`
const Comment = styled.div`
h3{
  padding:14px 0;
}
.comment{
  padding-bottom:9px;
}
p {
  text-align:justify;
}
.sign {
  text-align:right;
  padding:7px 0;
}
`
const NavPosts = styled.div`
    position: relative;
    margin: 6rem 0 0;
    padding: 3rem 0 0;
    border-top: 1px solid #ececec;
    .title {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      display: block;
      position: absolute;
      top: -39px;
      left: 50%;
      margin-left: -46px;
      width: 130px;
      height: 75px;
      border-radius: 100%;
      overflow: hidden;
      padding: 26px 14px;
      z-index: 2;
      text-align: center;
      box-shadow: #ececec 0 0 0 1px;
      background-color: #ffffff;
      }
    .postImage {
      max-height: 115px;
    }
`

// class BlogPostTemplate extends React.Component {
const BlogPostTemplate = (props) => {
  // render() {
  const post = props.data.post
  const images = post.WpImages
  const { postPrevious, postNext } = props.data
  const { previous, next } = props.pageContext
  const comments = post.WpComments
  let postTxt = post.body
  let playeropt = { width: '640 ', height: '390' }

  const [width, setWidth] = useState(0)
  const mainRef = useRef(null)

  const {
    imageDefault,
  } = useSiteMetadata()
  const siteDefaultImage = imageDefault
    ? useSiteImages(imageDefault)
    : null

  useEffect(() => {
    setWidth(mainRef.current.clientWidth)
  })

  const re = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/g
  const ytLinks = post.body.match(re)
  if (ytLinks) {

    ytLinks.forEach(element => {
      postTxt = postTxt.replace(element, '')
    });
    postTxt = postTxt.replace(/&amp;feature=player_embedded#!/g, '')
    postTxt = postTxt.replace(/&amp;feature=related/g, '')
  }
  postTxt = postTxt.replace(/http:\/\/www.opass/g, 'https://www.opass')
  postTxt = postTxt.replace(/http:\/\/passoapasso.amaneira/g, 'https://www.passoapasso')
  const txtwords = post.post_txt.split(' ')
  let seoDescrition = ''
  txtwords.map((value) => {
    if (seoDescrition.length < 240) seoDescrition = seoDescrition.concat(value, ' ')
  })
  if (width < 650) {
    if (width < 425)
      playeropt = { width: '270 ', height: '202' }
    else playeropt = { width: '560 ', height: '315' }
  }

  const opts = {
    height: playeropt.height,
    width: playeropt.width,
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  }
  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    // console.log(height)
    event.target.pauseVideo()
  }

  return (
    <Layout location={props.location}>
      <SEO
        title={post.title}
        description={seoDescrition}
        cover={post.cover && post.cover.publicURL}
        imageFb={
          post.WpImages.mysqlImage && post.WpImages.mysqlImage[0].src
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
              <div ref={mainRef} dangerouslySetInnerHTML={{ __html: postTxt.replace(/<img[^>]*>/g, "") }} />
              {images && images.map((image, index) => {
                return <Image
                  key={index}
                  fluid={image.mysqlImage.childImageSharp.fluid}
                />
              })
              }
              {ytLinks && ytLinks.map((link, index) => {
                return <YouTube className='videoembe'
                  key={index}
                  videoId={link.replace('http://www.youtube.com/watch?v=', '')}
                  opts={opts}
                  onReady={_onReady}
                />
              })
              }

            </ContentBody>
          </section>
          <ArticleFooter>
            <Bio />
          </ArticleFooter>
        </ArticleWrapper>
      </Wrapper>

      <Wrapper>
        <FacebookComments slug={post.slug} />
        {/* <Disqus slug={post.slug} title={post.title} /> */}
        {/* <PrevNextPost previous={revious} next={next} /> */}
        {comments && comments.length > 0 && <Comment>
          <h3>Comentários</h3>
          {comments.map((comment, index) => {
            return <div key={index} className="comment">
              <p>{comment.comment_txt}</p>
              <div className="sign">{comment.comment_date_gmt} - {comment.comment_author}</div>
            </div>
          })}
        </Comment>}

        <NavPosts>
          <div className="title">Continuamos?</div>
          {[postPrevious, postNext].map((node) => {
            if (!node) return;
            let image = node.WpImages.map(({ mysqlImage }, index) => {
              if (index === 0) return mysqlImage.childImageSharp;
            })
            const props = {
              title: node.title,
              excerpt: node.post_txt.substring(0, 60) + '...',
              slug: node.slug,
              date: node.post_date,
              language: node.language || 'pt',
              tags: node.tags || [],
              img: image[0] || siteDefaultImage
            }

            return <PostsListItem key={props.slug} {...props} />
          })}
        </NavPosts>

      </Wrapper>
    </Layout>
  )

  // }
  //  const _onReady(event) {
  //     // access to player in all event handlers via event.target
  //     console.log(this.mainRef)
  //     event.target.pauseVideo()
  //   }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlugMysql($slug: String!, $postPrevious: String!,  $postNext: String!) {
  post: mysqlWpPosts(post_name: {eq: $slug}) {

          ID
          slug:post_name
          title:post_title
          date:post_date
          body:post_content
          post_txt
          WpMetas {
            meta_key
            meta_value
          }
          post_content
          WpComments {
            comment_author_url
             comment_date_gmt(formatString: "MM/DD")
            comment_content
            comment_txt
            comment_approved
            comment_author
          }
          post_excerpt
          WpImages {
            mysqlImage {
              childImageSharp {
                fluid(maxWidth: 650) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
          }


    }

    postNext: mysqlWpPosts(post_name: {eq: $postNext}, post_status: {eq: "publish"}) {
        ID
          slug:post_name
      title:post_title
      date:post_date
      body:post_content
      post_txt
      post_excerpt
          WpImages {
        mysqlImage {
        childImageSharp {
        fluid(maxWidth: 300) {
        ...GatsbyImageSharpFluid
      }
      }
      }
    }


}
  postPrevious: mysqlWpPosts(post_name: {eq: $postPrevious},  post_status: {eq: "publish"}) {
        ID
          slug:post_name
      title:post_title
      date:post_date
      body:post_content
      post_txt
      post_excerpt
          WpImages {
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
`
