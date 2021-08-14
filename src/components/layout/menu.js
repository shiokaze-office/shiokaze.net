import React from 'react'
import { Link } from "gatsby"
import { bool } from 'prop-types'
import styled from 'styled-components'

const Menu = ({ nav, icon, open, ...props }) => {
  const isHidden = open ? true : false
  const tabIndex = isHidden ? 0 : -1

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <img src={icon} width="237" height="97" alt="shiokaze icon" />
      <ul>
        {nav.map(nav => {
          return (
            <li key={nav.url}>
              <Link to={nav.url} tabIndex={tabIndex}>
                {nav.label}
              </Link>
            </li>
          )
        })}
        <li key="/blog/">
          <Link to="/blog/">
            ブログ
          </Link>
        </li>
      </ul>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu

const StyledMenu = styled.nav`
  display: none;
  @media (max-width: 767px) {
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: var(--color-shiokaze-3);
    height: 100vh;
    text-align: left;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    transition: transform 0.3s ease-in-out;
    a {
      display: block;
      font-size: var(--fontSize-3);
      border-top: 1px solid var(--color-primary);
      font-family: var(--fontFamily-sans);
      font-weight: bold;
      text-decoration: none;
      padding: var(--spacing-4) var(--spacing-8);
      margin: 0;
      transition: color 0.3s linear;
      background: #fff;
    }
    ul {
      list-style-type: none;
      border-bottom: 1px solid var(--color-primary);
      margin-bottom: 70px;
    }
    li {
      margin: 0;
    }
    img {
      display: block;
      padding: 0 0 var(--spacing-3) var(--spacing-3);
      width: 130px;
      height: auto;
    }
  }
`
