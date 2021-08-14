import React from 'react'
import { graphql, PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'
import Seo from '../components/seo'

const NotFoundPage: React.FC<PageProps> = ({ data, location}) => {
  const title = data.site.siteMetadata.title

  return (
    <Layout location={location} title={title}>
      <Seo title="404: Not Found" />
      <Message>
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Message>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Message = styled.div`
`
