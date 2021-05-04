import React from 'react'
import './Thumbnail.css'

interface PropTypes {
  text?: string;
  turn?: boolean;
}

const Thumbnail = ({ text, turn }: PropTypes) => {
  return (
    <section className="thumbnail">
      <p style={turn ? {'color': 'green'} : {'color': 'black'}} className="thumbnail-text">{text}</p>
    </section>
  )
}

export default Thumbnail