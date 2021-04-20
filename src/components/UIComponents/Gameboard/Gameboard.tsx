import React from 'react'
import ChessBoard from 'chessboardjsx'
import './Gameboard.css'

interface PropTypes {
  width: number;
  orientation?: 'white' | 'black' | undefined;
  draggable?: boolean;
  fen?: string;
  onDrop?: any;
  position?: any;
}

const Gameboard = ({ width, orientation, fen, draggable, onDrop}: PropTypes) => {
  return (
    <section className="gameboard-wrapper">
      <ChessBoard 
          width={width}
          orientation={orientation}
          draggable={draggable}
          onDrop={onDrop}
          position={fen}
      />
    </section>
  )
}

export default Gameboard