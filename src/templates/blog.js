import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"
import styled from 'styled-components'

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

//import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post.featuredImage?.node?.alt || ``,
  }

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />

      <Article
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{parse(post.title)}</h1>

          <p>{post.date}</p>

          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.fluid && (
            <Image
              fluid={featuredImage.fluid}
              alt={featuredImage.alt}
              style={{ marginBottom: 50 }}
            />
          )}
        </header>

        {!!post.content && (
          <section itemProp="articleBody">{parse(post.content)}</section>
        )}

        {/*<hr />
        <footer>
          <Bio />
        </footer>*/}
      </Article>

      <PageNav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.uri} rel="prev">
                ← {parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.uri} rel="next">
                {parse(next.title)} →
              </Link>
            )}
          </li>
        </ul>
      </PageNav>
    </Layout>
  )
}

export default BlogTemplate

export const pageQuery = graphql`
  query BlogById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "YYYY年MM月DD日")

      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`

const Article = styled.article`
  padding-top: var(--spacing-10);
  font-size: var(--fontSize-3);

  h1, h2, h3, h4, h5, ul, ol, p, hr, form {
    max-width: var(--maxWidth-4xl);
    margin: 0 auto;
    padding: 0 var(--spacing-10);
  }
  h1, h2, h3, h4, h5 {
    padding-top: var(--spacing-12);
  }
  ul, ol, p {
    padding-top: var(--spacing-5);
  }
  ul, ol {
    padding-left: var(--spacing-16);
    li {
      padding-left: var(--spacing-13);
    }
  }
  hr {
    margin-top: var(--spacing-10);
  }
  section {
    img {
      width: 80%;
      height: auto;
      margin: var(--spacing-16) auto 0;
      padding: 0;
      display: block;
    }
    iframe {
      margin: var(--spacing-16) auto 0;
      padding: 0;
      display: block;
    }
  }
  header {
    max-width: var(--maxWidth-4xl);
    margin: 0 auto;
  }
  footer {
    max-width: var(--maxWidth-4xl);
    margin: 0 auto;
    padding: var(--spacing-10) var(--spacing-10) 0;
  }
`

const PageNav = styled.nav`
  max-width: var(--maxWidth-4xl);
  margin: var(--spacing-20) auto 0;
  padding: 0 var(--spacing-10);
`
