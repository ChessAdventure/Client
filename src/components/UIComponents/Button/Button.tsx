import React from 'react'
import './Button.css'

interface PropTypes {
  text: string;
  path?: string;
}

const Button: React.FC<PropTypes> = ({ text, path }) => {
  return (
    <button>{text}</button>
  )
}

export default Button