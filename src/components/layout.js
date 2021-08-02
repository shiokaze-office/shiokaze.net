import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import styled from 'styled-components'
import icon from "./layout/shiokaze-icon.svg"

const Layout = ({ isHomePage, children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
        }
      }
      globalnav: allWpMenu(filter: {slug: {eq: "global-navigation"}}) {
        nodes {
          menuItems {
            nodes {
              label
              url
            }
          }
        }
      }
      infonav: allWpPage(
        sort: { fields: [date], order: DESC }
        filter: {slug: {regex: "/^(about|contact|public-notary)$/"}}
      ) {
        nodes {
          uri
          title
        }
      }
    }
  `)

  const title = data.wp.generalSettings.title
  const globalnav = data.globalnav.nodes[0].menuItems.nodes
  const infonav = data.infonav.nodes

  return (
    <Wrapper data-is-root-path={isHomePage}>
      <header className="global-header clearfix">
        <Logo>
          <img src={icon} alt="shiokaze icon" />
          {isHomePage ? (
            <h1> <Link to="/">{parse(title)}</Link> </h1>
          ) : (
            <p> <Link to="/">{parse(title)}</Link> </p>
          )}
        </Logo>
        <Nav>
          <ul>
            {globalnav.map(nav => {
              return (
                <li key={nav.url}>
                  <Link to={nav.url}>{nav.label}</Link>
                </li>
              )
            })}
          </ul>
        </Nav>
        <InfoNav>
          <ul>
            {infonav.map(nav => {
              return (
                <li key={nav.uri}>
                  <Link to={nav.uri}>{nav.title}</Link>
                </li>
              )
            })}
          </ul>
        </InfoNav>
      </header>

      <main>{children}</main>

      <Footer>
        <Copyright>
          © {new Date().getFullYear()} {<Link to="/">{parse(title)}</Link>}
        </Copyright>
        <License>
          Built with <a href="https://www.gatsbyjs.com">Gatsby</a> and
          {` `}<a href="https://wordpress.org/">WordPress</a> on <a href="https://lolipop.jp/">Lolipop</a>
        </License>
      </Footer>
      <link rel="stylesheet" href="//fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;900&family=Noto+Serif+JP:wght@400;900&display=swap" />
    </Wrapper>
  )
}

export default Layout

const Wrapper = styled.div`
  margin: var(--spacing-5) 0 0;
  padding: var(--spacing-10) 0;
`
const Logo = styled.div`
  margin: 0 0 0 var(--spacing-8);
  float: left;
  padding: var(--spacing-5) 0 0 0;
  white-space: nowrap;
  a {
    text-decoration: none;
    color: var(--color-heading);
  }
  h1, p {
    font-size: var(--fontSize-5);
    font-family: var(--font-heading);
    font-weight: var(--fontWeight-bold);
    margin-top: var(--spacing-12);
    margin-bottom: var(--spacing-6);
    line-height: var(--lineHeight-tight);
    letter-spacing: -0.025em;
    margin: 0;
    display: inline;
  }
  img {
    width: var(--spacing-32);
    display: inline;
    padding: 0 var(--spacing-3) 0 0;
    vertical-align: top;
  }
`

const Nav = styled.nav`
  margin: 0 var(--spacing-8);
  float: right;
  font-size: var(--spacing-6);
  ul {
    list-style-type: none;
  }
  li {
    display: inline;
    padding-right: 1em;
    a {
      text-decoration: none;
    }
  }
`

const InfoNav = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0 var(--spacing-8);
  font-size: var(--spacing-6);
  ul {
    list-style-type: none;
  }
  li {
    display: inline;
    padding-right: 1em;
    a {
      text-decoration: none;
      font-family: var(--fontFamily-sans);
      padding: var(--spacing-2) var(--spacing-4);
      border: 1px solid var(--color-primary);
      font-size: var(--fontSize-0);
      border-radius: 20px;
    }
  }
`

const Footer = styled.footer`
  margin: var(--spacing-32) var(--spacing-8) 0;
`
const Copyright = styled.span`
  font-family: var(--fontFamily-sans);
  font-weight: bold;
  font-size: var(--spacing-5);
  a {
    text-decoration: none;
    color: var(--color-heading);
  }
`
const License = styled.span`
  font-size: var(--spacing-3);
  padding-left: var(--spacing-5);
`
