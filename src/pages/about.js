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

import YouTube from 'react-youtube';

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
class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.post
        const { previous, next } = this.props.pageContext
        const comments = post.WpComments

        const re = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/g
        const ytLinks = post.body.match(re)
        if (ytLinks) {

            ytLinks.forEach(element => {
                post.body = post.body.replace(element, '')
            });
            post.body = post.body.replace(/&amp;feature=player_embedded#!/g, '')
            post.body = post.body.replace(/&amp;feature=related/g, '')
        }
        post.body = post.body.replace(/http:\/\/www.opass/g, 'https://www.opass')
        post.body = post.body.replace(/http:\/\/passoapasso.amaneira/g, 'https://www.passoapasso')
        const txtwords = post.post_txt.split(' ')
        let seoDescrition = ''
        txtwords.map((value) => {
            if (seoDescrition.length < 240) seoDescrition = seoDescrition.concat(value, ' ')
        })

        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        }
        return (
            <Layout location={this.props.location}>
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
                                <div dangerouslySetInnerHTML={{ __html: post.body }} />
                                {
                                    ytLinks && ytLinks.map((link, index) => {
                                        return <YouTube
                                            key={index}
                                            videoId={link.replace('http://www.youtube.com/watch?v=', '')}
                                            opts={opts}
                                            onReady={this._onReady}
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
                    <Disqus slug={post.slug} title={post.title} />
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

                </Wrapper>
            </Layout>
        )

        // _onReady(event){
        //   // access to player in all event handlers via event.target
        //   event.target.pauseVideo()
        // }
    }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query  {
  post: mysqlWpPosts(post_name: {eq:"cookies"}) {

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
            src
          }


    }
  }
`
