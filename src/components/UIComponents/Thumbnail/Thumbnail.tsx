import React from 'react'
import './Thumbnail.css'

interface PropTypes {
  text?: string;
}

const Thumbnail = ({ text }: PropTypes) => {
  return (
    <section className="thumbnail">
      <p className="thumbnail-text">{text}</p>
    </section>
  )
}

export default Thumbnail