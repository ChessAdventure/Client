import React from 'react'
import ChessBoard from 'chessboardjsx'
import './Gameboard.css'

interface PropTypes {
  width: number;
  orientation?: 'white' | 'black' | undefined;
  draggable?: boolean;
  fen?: string;
}

const Gameboard = ({ width, orientation, fen, draggable}: PropTypes) => {
  return (
    <div className="gameboard-wrapper">
      <ChessBoard 
        position={fen}
        width={width}
        orientation={orientation}
      />
    </div>
  )
}

export default Gameboard