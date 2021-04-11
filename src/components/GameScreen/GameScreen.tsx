import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
import { Chess } from 'chess.js'
import Thumbnail from '../UIComponents/Thumbnail/Thumbnail'

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

    // const [currentFen, setCurrentFen] = useState('')
    // const [game, setGame] = useState(null)
    // let chess
    
    // useEffect(() => {
    //     chess = new Chess()
        
    // }, [])

    return (
        <section>
            <Header />
            <Thumbnail imageSource="https://thumbs.dreamstime.com/b/cartoon-lacrosse-player-running-illustration-man-116275009.jpg"/>
            <Gameboard 
                width={500} 
                fen="start"
                draggable={true}/>
            <Thumbnail imageSource="https://cdn11.bigcommerce.com/s-9nmdjwb5ub/images/stencil/1280x1280/products/153/1145/Business_Shark_big__95283.1513045773.jpg?c=2" />

        </section>
    )

}

export default GameScreen