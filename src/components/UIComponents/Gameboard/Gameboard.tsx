import React from 'react'
// import ChessBoard from 'chessboardjsx'
import Chessground from 'react-chessground'
import "react-chessground/dist/styles/chessground.css"
import './Gameboard.css'

interface PropTypes {
  width: number;
  orientation?: 'white' | 'black' | undefined;
  movable?: any;
  fen?: string;
  onDrop?: any;
  position?: any;
  boardStyle?: object;
}

const Gameboard = ({ width, orientation, fen, movable, onDrop, boardStyle }: PropTypes) => {
  return (
    <section className="gameboard-wrapper">

      <Chessground
        width={width}
        height={width}
        turnColor={orientation}
        movable={movable}
        fen={fen}
        onMove={onDrop}
        style={boardStyle}
      />

      {/* <ChessBoard
        width={width}
        orientation={orientation}
        draggable={draggable}
        onDrop={onDrop}
        position={fen}
        boardStyle={boardStyle}
      /> */}

    </section >
  )
}

export default Gameboard