import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const MobileNav: React.FC = () => {
  const mobnav = [
    { uri: "/", label: "house", emoji: "🏠", title: "ホーム" },
    { uri: "/about/", label: "round_pushpin", emoji: "📍", title: "事務所案内" },
    { uri: "/public-notary/", label: "information_desk_person", emoji: "💁‍♀️", title: "行政書士紹介" },
    { uri: "/contact/", label: "postbox", emoji: "📮", title: "お問い合わせ" },
  ]

  return (
    <StyledDiv>
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
    </StyledDiv>
  )
}

export default MobileNav

const StyledDiv = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 999;
    margin: 0 auto;
    padding: var(--spacing-3) 0 var(--spacing-6);
    border-top: 1px solid #eee;
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
      font-family: var(--fontFamily-sans);
      font-weight: var(--fontWeight-bold);
      color: var(--color-text-light);
      text-decoration: none;
    }
    span {
      display: block;
      text-align: center;
      font-size: var(--fontSize-5);
    }
  }
`
