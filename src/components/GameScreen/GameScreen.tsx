import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
import { ChessInstance, ShortMove } from 'chess.js'
import Thumbnail from '../UIComponents/Thumbnail/Thumbnail'
const Chess = require('chess.js')

interface PropTypes {
  id: string;
}

// chess.fen() returns current fen
// chess.game_over() returns true if game is over
// chess.move(move, [options]) Attempts to make a move on the board, returning a move object if the move was legal, otherwise null. 
// chess.moves([options]) Returns a list of legal moves from the current position.
// chess.put(piece, square) Place a piece on the square where piece is an object with the form { type: ..., color: ... }. 
// chess.reset() Resets board
// chess.turn() Returns current side to move (w, b)

const GameScreen = ({ id }: PropTypes) => {

    const [chess] = useState<ChessInstance>(
      new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    )
    const [fen, setFen] = useState(chess.fen())
    console.log('fen', fen)

    const handleMove = (move: ShortMove) => {
      console.log(move)
      if (chess.move(move)) {
        setTimeout(() => {
          const moves = chess.moves();
  
          if (moves.length > 0) {
            const computerMove = moves[Math.floor(Math.random() * moves.length)];
            chess.move(computerMove);
            setFen(chess.fen());
          }
        }, 300);
  
        setFen(chess.fen());
      }
    }

    return (
      <section>
          <Header />
          <Thumbnail imageSource="https://thumbs.dreamstime.com/b/cartoon-lacrosse-player-running-illustration-man-116275009.jpg"/>
          <Gameboard 
            width={500} 
            fen={fen}
            onDrop={(move: any) => 
              handleMove({
                from: move.sourceSquare,
                to: move.targetSquare,
                promotion: "q",
              })
            }
          />
          <Thumbnail imageSource="https://cdn11.bigcommerce.com/s-9nmdjwb5ub/images/stencil/1280x1280/products/153/1145/Business_Shark_big__95283.1513045773.jpg?c=2" />

      </section>
    )

}

export default GameScreen