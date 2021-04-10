import React from 'react'
import ChessBoard from 'chessboardjsx'
import './Gameboard.css'

interface PropTypes {
  width: number;
  orientation?: 'white' | 'black' | undefined;
  draggable?: boolean;
  fen?: string;
}

const Gameboard: React.FC<PropTypes> = ({ width, orientation, fen, draggable}) => {
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