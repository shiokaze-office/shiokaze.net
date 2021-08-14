import React from 'react'
import { Link, graphql } from 'gatsby'
import parse from 'html-react-parser'
import styled from 'styled-components'
import Layout from '../components/layout'
import Seo from '../components/seo'

export const BlogArchiveTemplateQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD")
        year: date(formatString: "YYYY")
        title
        excerpt
      }
    }
  }
`

const BlogIndex: React.RC<GatsbyTypes.WordPressPostArchiveQuery> = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes

  if (!posts.length) {
    return (
      <Layout isHomePage>
        <Seo title="ブログ一覧" />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
  }

  return (
    <Layout isHomePage>
      <Seo title="ブログ一覧" />
      <BlogHeader>
        <h1>ブログ</h1>
        <p>日常業務でのちょっとした気づきなどを中心に書きます</p>
      </BlogHeader>
      <BlogOl>
        {posts.map(post => {
          return (
            <li key={post.uri}>
              <Article itemScope itemType="http://schema.org/Article">
                <header>
                  <h2>
                    <Link to={post.uri} itemProp="url">
                      <span itemProp="headline">{parse(post.title)}</span>
                    </Link>
                  </h2>
                  <BlogDate>
                    {post.date}, <span>{post.year}</span>
                  </BlogDate>
                </header>
                <section itemProp="description">{parse(post.excerpt)}</section>
              </Article>
            </li>
          )
        })}
      </BlogOl>

      <BlogFooter>
        {previousPagePath && (
          <>
            <Link to={previousPagePath} className="button-light"><span role="img" aria-label="rewind">⏪</span> 前のページ</Link>
            <br />
          </>
        )}
        {nextPagePath && <Link to={nextPagePath} className="button-light">次のページ <span role="img" aria-label="fast_forward">⏩</span></Link>}
      </BlogFooter>
    </Layout>
  )
}

export default BlogIndex

const BlogHeader = styled.header`
  max-width: var(--maxWidth-4xl);
  margin: 0 auto;
  padding: var(--spacing-10) var(--spacing-10) 0;
`
const BlogOl = styled.ol`
  padding-top: var(--spacing-10);
  list-style-type: none;
`
const Article = styled.article`
  max-width: var(--maxWidth-4xl);
  margin: 0 auto;
  padding: 0 var(--spacing-10);
  position: relative;
  section {
    padding-top: 0;
    p {
      font-size: var(--fontSize-3);
    }
  }
  @media (max-width:1024px) {
    h2 {
      margin-bottom: 0;
    }
  }
`
const BlogDate = styled.p`
  position: absolute;
  top: var(--spacing-2);
  left: -6rem;
  font-weight: var(--fontWeight-bold);
  color: var(--color-shiokaze-1);
  span {
    color: var(--color-shiokaze-2);
    font-weight: var(--fontWeight-normal);
  }
  @media (max-width:1024px) {
    position: static;
    padding: 0 0 var(--spacing-2);
  }
`
const BlogFooter = styled.footer`
  max-width: var(--maxWidth-4xl);
  margin: 0 auto;
  padding: 0 var(--spacing-10);
`
