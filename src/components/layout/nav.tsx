import React from 'react'
import { Link } from 'gatsby'
import parse from 'html-react-parser'
import styled from 'styled-components'

type Props = {
  infonav: object
  globalnav: object
}

const Nav: React.FC = ({ infonav, globalnav }: Props) => {
  return (
    <StyledNav>
      <InfoUl>
        {infonav.map(nav => {
          return (
            <li key={nav.uri}>
              <Link to={nav.uri}>{parse(nav.title)}</Link>
            </li>
          )
        })}
      </InfoUl>
      <GlobalUl>
        {globalnav.map(nav => {
          return (
            <li key={nav.url}>
              <Link to={nav.url}>{parse(nav.label)}</Link>
            </li>
          )
        })}
      </GlobalUl>
    </StyledNav>
  )
}

export default Nav

const StyledNav = styled.nav`
  float: right;
  text-align: right;
  margin: 0 var(--spacing-8);
  font-size: var(--spacing-6);
  ul {
    list-style-type: none;
    margin-bottom: 0;
  }
  li {
    display: inline;
    padding-right: var(--spacing-3);
    a {
      text-decoration: none;
      white-space: nowrap;
    }
  }
  @media (max-width: 767px) {
    float: none;
    text-align: left;
    margin: 0 var(--spacing-10);
  }
`
const GlobalUl = styled.ul`
  margin-top: var(--spacing-3);
  li {
    padding-right: var(--spacing-5);
  }
  @media (max-width: 767px) {
    display: none;
  }
`
const InfoUl = styled.ul`
  li {
    line-height: 2;
    a {
      font-family: var(--fontFamily-sans);
      padding: var(--spacing-2) var(--spacing-4);
      border: 1px solid var(--color-primary);
      font-size: var(--fontSize-0);
      border-radius: 20px;
    }
  }
  @media (max-width: 767px) {
    display: none;
  }
`
