import React from 'react'
import './Gameboard.css'

interface PropTypes {
  width?: number;
  height?: number;
  orientation?: string;
  draggable?: boolean;
  fen?: string;
}

const Gameboard: React.FC<PropTypes> = ({ width, height, orientation, fen, draggable}) => {
  return (
    <>
      <h1>GAMEBOARD</h1>
      <p>{fen}</p>
    </>
  )
}

export default Gameboard