import React, { useState, useEffect, useRef } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import styled from 'styled-components'
import Burger from '../components/burger'
import Menu from '../components/menu'

const Layout = ({ isHomePage, children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      file(relativePath: { eq: "shiokaze-icon.svg" }) {
        publicURL
      }
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
  const icon = data.file.publicURL
  const mobnav = [
    { uri: "/", label: "house", emoji: "🏠", title: "ホーム" },
    { uri: "/about/", label: "round_pushpin", emoji: "📍", title: "事務所案内" },
    { uri: "/public-notary/", label: "information_desk_person", emoji: "💁‍♀️", title: "行政書士紹介" },
    { uri: "/contact/", label: "postbox", emoji: "📮", title: "お問い合わせ" },
  ]
  const [open, setOpen] = useState(false)
  const menuId = "main-menu"
  const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }
        handler(event);
      }
      document.addEventListener('mousedown', listener)
      return () => {
        document.removeEventListener('mousedown', listener)
      }
    },
    [ref, handler],
    )
  }
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))

  return (
    <Wrapper data-is-root-path={isHomePage}>
      <header className="clearfix">
        <Logo>
          <img src={icon} width="237" height="97" alt="shiokaze icon" />
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
        <MobileNav>
          <ul>
            {mobnav.map(nav => {
              return (
                <li key={nav.uri}>
                  <Link to={nav.uri}>
                    <span role="img" aria-label={nav.lable}>{nav.emoji}</span>
                    {nav.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </MobileNav>
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
          <Menu open={open} setOpen={setOpen} id={menuId} />
        </div>
      </header>

      <main>{children}</main>

      <Footer>
        <Copyright>
          &copy; {new Date().getFullYear()} {<Link to="/">{parse(title)}</Link>}
        </Copyright>
        <License>
          Built with <a href="https://www.gatsbyjs.com">Gatsby</a> and
          {` `}<a href="https://wordpress.org/">WordPress</a> on <a href="https://lolipop.jp/">Lolipop</a>.
          {` `}Some illustrations from <a href="https://www.freepik.com/">pch.vector / Freepik</a>.
        </License>
      </Footer>
    </Wrapper>
  )
}

export default Layout

const Wrapper = styled.div`
  border-top: var(--spacing-4) #E6E0ED solid;
  margin: 0;
  padding: 0;
  background-color: #fff;
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
    width: 130px;
    height: auto;
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
const Footer = styled.footer`
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
const MobileNav = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #000;
    z-index: 999;
    margin: 0 auto;
    padding: var(--spacing-1) 0 var(--spacing-3);
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      color: #fff;
      font-size: var(--fontSize-0);
    }
    li {
      line-height: 1.3;
      margin: 0;
    }
    a {
      display: block;
      text-align: center;
      color: #fff;
      font-family: var(--fontFamily-sans);
      font-weight: var(--fontWeight-bold);
      text-decoration: none;
    }
    span {
      display: block;
      text-align: center;
      font-size: var(--fontSize-6);
    }
  }
`
