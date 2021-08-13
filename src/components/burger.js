import React from 'react'
import styled from 'styled-components'
import { bool, func } from 'prop-types'

const Burger = ({ open, setOpen, ...props }) => {
  const isExpanded = open ? true : false
  console.log(open, setOpen, props)
  return (
    <Button aria-label="Toggle menu" aria-expanded={isExpanded} open={open} onClick={() => setOpen(!open)} {...props}>
      <span />
      <span />
      <span />
    </Button>
  )
}

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
}

export default Burger

const Button = styled.button`
  display: none;
  @media (max-width: 767px) {
    position: fixed;
    top: var(--spacing-8);
    right: var(--spacing-8);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: var(--spacing-8);
    height: var(--spacing-8);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
    span {
      width: var(--spacing-8);
      height: var(--spacing-1);
      background: #000;
      border-radius: 10px;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: 1px;
      :first-child {
        transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
      }
      :nth-child(2) {
        opacity: ${({ open }) => open ? '0' : '1'};
        transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
      }
      :nth-child(3) {
        transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
      }
    }
  }
`
