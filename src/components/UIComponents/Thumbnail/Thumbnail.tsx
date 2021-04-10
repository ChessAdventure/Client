import React from 'react'
import './Thumbnail.css'

interface PropTypes {
  imageSource?: string;
  text?: string;
}

const Thumbnail: React.FC<PropTypes> = ({ imageSource, text}) => {
  return (
    <section className="thumbnail">
      <div className="thumbnail-image" style={{backgroundImage: `url(${imageSource})`}} ARIA-label="Player thumbnail"></div>
      <p className="thumbnail-text">{text}</p>
    </section>
  )
}

export default Thumbnail