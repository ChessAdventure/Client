import React from 'react'
import './Thumbnail.css'

interface PropTypes {
  imageSource?: string;
  text?: string;
}

const Thumbnail = ({ imageSource, text }: PropTypes) => {
  return (
    <section className="thumbnail">
      <div className="thumbnail-image" style={{backgroundImage: `url(${imageSource})`}} aria-label="Player thumbnail"></div>
      <p className="thumbnail-text">{text}</p>
    </section>
  )
}

export default Thumbnail