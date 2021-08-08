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
      <header className="clearfix">
        <Logo>
          <img src={icon} alt="shiokaze icon" />
          {isHomePage ? (
            <h1> <Link to="/">{parse(title)}</Link> </h1>
          ) : (
            <p> <Link to="/">{parse(title)}</Link> </p>
          )}
        </Logo>
        <Nav>
          <InfoUl>
            {infonav.map(nav => {
              return (
                <li key={nav.uri}>
                  <Link to={nav.uri}>{nav.title}</Link>
                </li>
              )
            })}
          </InfoUl>
          <GlobalUl>
            {globalnav.map(nav => {
              return (
                <li key={nav.url}>
                  <Link to={nav.url}>{nav.label}</Link>
                </li>
              )
            })}
          </GlobalUl>
        </Nav>
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
  border-top: var(--spacing-4) #E6E0ED solid;
  margin: 0;
  padding: 0;
`
const Logo = styled.div`
  margin: 0 0 0 var(--spacing-8);
  float: left;
  padding: var(--spacing-20) 0 0 0;
  a {
    text-decoration: none;
    color: var(--color-heading);
    white-space: nowrap;
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
    padding: 0 var(--spacing-3) var(--spacing-3) 0;
    vertical-align: top;
  }
  @media (max-width: 767px) {
    float: none;
  }
`
const Nav = styled.nav`
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
    margin-top: var(--spacing-5);
    /* for safari */
    overflow-x: scroll;
    overflow-y: visible;
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
  /* for safari */
  @media (max-width: 767px) {
    padding-bottom: var(--spacing-2);
    overflow-x: scroll;
    overflow-y: visible;
  }
`
const Footer = styled.footer`
  margin: var(--spacing-32) var(--spacing-8) 0;
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
  white-space: nowrap;
`
