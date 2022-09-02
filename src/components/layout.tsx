import React, { useState, useEffect, useRef } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import parse from 'html-react-parser'
import styled from 'styled-components'
import Burger from './layout/burger'
import Menu from './layout/menu'
import Nav from './layout/nav'
import MobileNav from './layout/mobile-nav'
import Footer from './layout/footer'

const Layout: React.FC = ({ isHomePage, children }) => {
  const data = useStaticQuery<GatsbyTypes.LayoutQuery>(graphql`
    query Layout {
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
        filter: {slug: {regex: "/^(about|contact|public-notary|fee)$/"}}
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
        <Nav infonav={infonav} globalnav={globalnav} />
        <MobileNav />
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
          <Menu nav={globalnav} icon={icon} open={open} setOpen={setOpen} id={menuId} />
        </div>
      </header>

      <main>{children}</main>

      <Footer title={title} />
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
