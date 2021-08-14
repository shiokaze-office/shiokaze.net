import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Bio: React.FC = () => {
  const { author } = useStaticQuery<GatsbyTypes.BioQuery>(graphql`
    query Bio {
      # if there was more than one user, this would need to be filtered
      author: wpUser {
        firstName
        twitter: name
        description
        avatar {
          url
        }
      }
    }
  `)

  const avatarUrl = author?.avatar?.url

  return (
    <div className="bio">
      {avatarUrl && (
        <img
          alt={author?.firstName || ``}
          className="bio-avatar"
          src={avatarUrl}
        />
      )}
      {author?.firstName && (
        <p>
          この記事を書いた人 <strong>{author.firstName}</strong>
          {` `}
          {author?.description || null}
          {` `}
          {author?.twitter && (
            <a href={`https://twitter.com/${author?.twitter || ``}`}>
              You should follow them on Twitter
            </a>
          )}
        </p>
      )}
    </div>
  )
}

export default Bio
