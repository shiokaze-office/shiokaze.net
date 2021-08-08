import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from 'styled-components'

const HomePage = ({ data }) => {
  const title = data.wp.generalSettings.title
  const description = data.wp.generalSettings.description
  const proposals = data.proposals.nodes
  const guide = data.guide.nodes
  const blogs = data.blogs.nodes
  const covid19 = data.covid19.nodes
  const heroImage = data.hero.publicURL
  const maskPeopleImage = data.maskPeople.publicURL

  if (!guide.length && !proposals.length && !blogs.length) {
    return (
      <Layout isHomePage>
        <Seo title={title} />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
  }

  return (
    <Layout isHomePage>
      <Seo title={title} description={description} />

      <Hero>
        <img src={heroImage} width="500" height="228" alt="Happy Life" />
        <p>{description}</p>
      </Hero>

      <Guide className="clearfix">
        <ol>
          {guide.map(post => {
            const title = post.title

            return (
              <li key={post.uri}>
                <article
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h3>
                      <Link to={post.uri} itemProp="url">
                        <span itemProp="headline">{parse(title)}</span>
                      </Link>
                    </h3>
                  </header>
                  <section itemProp="description">
                    <p>
                      {parse(post.content.replace(/<[^>]*>?/gm, '').replace(/\r?\n/g, '').substr(0, 75))} …
                      {` `} <Link to={post.uri} itemProp="url">続きを読む</Link>
                    </p>
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
      </Guide>

      <Covid19 className="clearfix">
        <Covid19Header>
          <h2>新型コロナ対応支援</h2>
          <p>新型コロナウイルスによって影響を受けている方々に向けて、各省庁や地方自治体が行っている支援を まとめました。</p>
        </Covid19Header>
        <ol style={{ listStyle: `none` }}>
          {covid19.map(post => {
            const title = post.title

            return (
              <li key={post.uri}>
                <article
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h3>
                      <Link to={post.uri} itemProp="url">
                        <span itemProp="headline">{parse(title)}</span>
                      </Link>
                    </h3>
                    <small>{post.date}</small>
                  </header>
                  <section itemProp="description">
                    <p>{parse(post.excerpt.replace(/<[^>]*>?/gm, '').replace(/\r?\n/g, '').substr(0, 60))} …
                    {` `} <Link to={post.uri} itemProp="url">続きを読む</Link></p>
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
        <Covid19Image>
          <img src={maskPeopleImage} width="500" height="360" alt="Covid-19 Mask People" />
        </Covid19Image>
      </Covid19>

      <Proposals className="clearfix">
        <ProposalHeader>
          <h2>ご提案</h2>
          <p>老後の生活に不安や不便を感じるすべての方へ、お客様にあったご提案をします。</p>
        </ProposalHeader>
        <ol style={{ listStyle: `none` }}>
          {proposals.map(post => {
            const title = post.title

            return (
              <li key={post.uri}>
                <article
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h3>
                      <Link to={post.uri} itemProp="url">
                        <span itemProp="headline">{parse(title)}</span>
                      </Link>
                    </h3>
                  </header>
                  <section itemProp="description">
                    <p>
                      {parse(post.content.replace(/<[^>]*>?/gm, '').replace(/\r?\n/g, '').substr(0, 120))} …
                      {` `} <Link to={post.uri} itemProp="url">続きを読む</Link>
                    </p>
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
      </Proposals>

      <Blog className="clearfix">
        <BlogHeader>
          <h2>ブログ</h2>
          <p>日常業務でのちょっとした気づきなどを中心に書きます</p>
        </BlogHeader>
        <ul style={{ listStyle: `none` }}>
          {blogs.map(post => {
            const title = post.title
            const limit = 50 - title.length

            return (
              <li key={post.uri}>
                <article
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <Link to={post.uri} itemProp="url">
                    <DateSpan>{post.date}</DateSpan>
                    <TitleSpan itemProp="headline">{parse(title)}</TitleSpan>
                    <ExcerptSpan itemProp="description">
                      {parse(post.excerpt.replace(/<[^>]*>?/gm, '').replace(/\r?\n/g, '').substr(0, limit))} …
                    </ExcerptSpan>
                  </Link>
                </article>
              </li>
            )
          })}
        </ul>
        <BlogFooter>
          <Link to="/blog/">ブログ一覧へ</Link>
        </BlogFooter>
      </Blog>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query IndexPage {
    hero: file(name: { eq: "happy-life" }) {
      publicURL
    }
    maskPeople: file(name: { eq: "mask-people" }) {
      publicURL
    }
    wp {
      generalSettings {
        title
        description
      }
    }
    guide: allWpPage(
      sort: { fields: [date], order: DESC }
      filter: {slug: {regex: "/^(?!proposals-.*|about|contact|public-notary|privacy-policy)/"}}
    ) {
      nodes {
        uri
        date(formatString: "YYYY年MM月DD日")
        title
        content
      }
    }
    proposals: allWpPage(
      sort: { fields: [date], order: DESC }
      filter: {slug: {regex: "/proposals-/"}}
    ) {
      nodes {
        uri
        date(formatString: "YYYY年MM月DD日")
        title
        content
      }
    }
    covid19: allWpPost(
      sort: { fields: [date], order: DESC }
      filter: {categories: {nodes: {elemMatch: {slug: {eq: "support-for-covid-19"}}}}}
    ) {
      nodes {
        uri
        date(formatString: "YYYY年MM月DD日")
        title
        excerpt
      }
    }
    blogs: allWpPost(
      sort: { fields: [date], order: DESC }
      filter: {categories: {nodes: {elemMatch: {slug: {eq: "blog"}}}}}
      limit: 5
    ) {
      nodes {
        uri
        date(formatString: "YYYY年MM月DD日")
        title
        excerpt
      }
    }
  }
`
const StyledHeader = styled.header`
  padding: var(--spacing-10) var(--spacing-10) 0;
`
const StyledBox = styled.div`
  padding-top: var(--spacing-32);
  li {
    list-style-type: none;
  }
  article {
    width: 26rem;
    float: left;
    padding: var(--spacing-10);
    padding-bottom: 0;
    header {
      margin-bottom: var(--spacing-4);
    }
    h3 {
      font-size: var(--fontSize-4);
      color: var(--color-primary);
      margin: 0 0 var(--spacing-2);
    }
    font-size: var(--fontSize-2);
  }
  @media (max-width:768px) {
    article {
      width: auto;
    }
  }
`

const Guide = styled(StyledBox)`
  padding-top: 0;
`
const Proposals = styled(StyledBox)`
  article {
    width: 40rem;
  }
  @media (max-width:768px) {
    article {
      width: auto;
    }
  }
`
const ProposalHeader = styled(StyledHeader)`
`
const Covid19 = styled(StyledBox)`
  position: relative;
`
const Covid19Header = styled(StyledHeader)`
`
const Blog = styled.div`
  padding-top: var(--spacing-32);
  li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  ul {
    border-bottom: 1px solid var(--color-accent);
    margin: 0 var(--spacing-10);
  }
  article {
    width: auto;
    padding: 0;
    a {
      display: block;
      font-size: var(--fontSize-2);
      text-decoration: none;
      border-top: 1px solid var(--color-accent);
      padding: var(--spacing-5);
      margin: 0;
    }
    a:hover {
      background-color: var(--color-accent);
    }
    span {
      padding: 0 var(--spacing-5) 0 0;
    }
  }
  @media (max-width:768px) {
    article {
      a {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
`
const BlogHeader = styled(StyledHeader)`
`
const BlogFooter = styled.footer`
  padding: var(--spacing-5) var(--spacing-10) 0;
  text-align: center;
  font-size: var(--fontSize-2);
`
const DateSpan = styled.span`
  @media (max-width:768px) {
    display: block;
  }
`
const TitleSpan = styled.span`
  font-family: var(--fontFamily-sans);
  font-weight: var(--fontWeight-black);
`
const ExcerptSpan = styled.span`
  @media (max-width:768px) {
    display: none;
  }
`
const Hero = styled.div`
  margin: var(--spacing-16) auto 0;
  padding: var(--spacing-20) 0 0;
  width: var(--maxWidth-4xl);
  font-size: var(--fontSize-4);
  position: relative;
  p {
    width: var(--maxWidth-xl);
    font-feature-settings: "palt";
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
  }
  img {
    padding-left: var(--spacing-24);
    width: 100%;
    height: auto;
    @media (max-width: 768px) {
      padding-top: var(--spacing-24);
      padding-left: 0;
    }
  }
  @media (max-width:768px) {
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: var(--fontSize-2);
    p {
      width: 100%;
      padding: var(--spacing-10);
    }
  }
`
const Covid19Image = styled.div`
  position: absolute;
  top: var(--spacing-32);
  right: 0;
  z-index: -1;
  opacity: 0.15;
  @media (max-width:768px) {
    top: var(--spacing-16);
    width: 70%;
    text-align: right;
    img {
      width: 100%;
    }
  }
`
