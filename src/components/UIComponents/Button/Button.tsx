import React from 'react'
import './Button.css'

interface PropTypes {
  text: string;
  path?: string;
  handleClick?: any;
}

const Button = ({ text, path, handleClick }: PropTypes) => {
  return (
    <button
      onClick={handleClick}
    >{text}</button>
  )
}

export default Button