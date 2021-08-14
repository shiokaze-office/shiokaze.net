import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type Props = {
  title: string
  description?: string
  lang?: string
  meta?: string[]
}

const Seo: React.FC = ({ description = ``, lang = ``, meta = [], title }: Props) => {
  const { wp, wpUser } = useStaticQuery<GatsbyTypes.SeoQuery>(
    graphql`
      query Seo {
        wp {
          generalSettings {
            title
            description
          }
        }
        # if there's more than one user this would need to be filtered to the main user
        wpUser {
          twitter: name
        }
      }
    `
  )

  const metaDescription = description || wp.generalSettings?.description
  const defaultTitle = wp.generalSettings?.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: wpUser?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

export default Seo
