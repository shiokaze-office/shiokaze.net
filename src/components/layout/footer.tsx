import React from 'react'
import { Link } from 'gatsby'
import parse from 'html-react-parser'
import styled from 'styled-components'

type Props = {
  title: string
}

const Footer: React.FC = ({ title }: Props) => {
  return (
    <StyledFooter>
      <Copyright>
        &copy; {new Date().getFullYear()} {<Link to="/">{parse(title)}</Link>}
      </Copyright>
      <License>
        Built with <a href="https://www.gatsbyjs.com">Gatsby</a> and
        {` `}<a href="https://wordpress.org/">WordPress</a> on <a href="https://lolipop.jp/">Lolipop</a>.
        {` `}Some illustrations from <a href="https://www.freepik.com/">pch.vector / Freepik</a>.
      </License>
    </StyledFooter>
  )
}

export default Footer

const StyledFooter = styled.footer`
  padding: var(--spacing-32) var(--spacing-8) var(--spacing-10);
  @media (max-width: 767px) {
    padding-bottom: var(--spacing-20);
    margin-bottom: var(--spacing-20);
  }
`

const Copyright = styled.span`
  font-family: var(--fontFamily-sans);
  font-weight: bold;
  font-size: var(--spacing-5);
  padding-right: var(--spacing-5);
  white-space: nowrap;
  a {
    text-decoration: none;
    color: var(--color-heading);
  }
  /* for safari */
  @media (max-width: 767px) {
    display: block;
  }
`

const License = styled.span`
  font-size: var(--spacing-3);
`
