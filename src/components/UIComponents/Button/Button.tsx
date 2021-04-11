import React from 'react'
import './Button.css'

interface PropTypes {
  text: string;
  path?: string;
}

const Button = ({ text, path }: PropTypes) => {
  return (
    <button>{text}</button>
  )
}

export default Button