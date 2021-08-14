import React from 'react'
import styled from 'styled-components'

type Props = {
  open: boolean
  setOpen: React.Dispatch
}

const Burger: React.FC = ({ open, setOpen, ...props }: Props) => {
  const isExpanded = open ? true : false
  return (
    <Button aria-label="Toggle menu" aria-expanded={isExpanded} open={open} onClick={() => setOpen(!open)} {...props}>
      <span />
      <span />
      <span />
    </Button>
  )
}

export default Burger

const Button = styled.button`
  display: none;
  @media (max-width: 767px) {
    display: flex;
    position: fixed;
    top: var(--spacing-10);
    right: var(--spacing-8);
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
      background: var(--color-text-light);
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
