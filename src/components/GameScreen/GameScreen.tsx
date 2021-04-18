import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
import { ChessInstance, ShortMove } from 'chess.js'
import Thumbnail from '../UIComponents/Thumbnail/Thumbnail'
import { API_WS_ROOT, API_ROOT } from '../../constants/index'
import GameOver from '../GameOver/GameOver'
import './GameScreen.css'
const actioncable = require('actioncable');
const Chess = require('chess.js')


// game board should not show up until there are two people signed in
interface PropTypes {
  gameId: string;
  userKey: string;
  userName: string;
}

// chess.fen() returns current fen
// chess.game_over() returns true if game is over
// chess.move(move, [options]) Attempts to make a move on the board, returning a move object if the move was legal, otherwise null. 
// chess.moves([options]) Returns a list of legal moves from the current position.
// chess.put(piece, square) Place a piece on the square where piece is an object with the form { type: ..., color: ... }. 
// chess.reset() Resets board
// chess.turn() Returns current side to move (w, b)

const GameScreen = ({ gameId, userKey, userName }: PropTypes) => {
  const [chess] = useState<any>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  )
  const [fen, setFen] = useState<string>(chess.fen())
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false)

  useEffect(() => {
    const cable = actioncable.createConsumer(`${API_WS_ROOT}`)
    console.log('API_KEY', userKey)
    cable.subscriptions.create({
      channel: 'FriendlyGamesChannel',
      api_key: userKey, 
      extension: gameId
    },{
      connected: ()=> {
        console.log('connected!')
      },
      disconnected: () => {
        console.log('disconnected')
      },
      received: (resp: any) => {
        setFen(resp.data.attributes.current_fen)
        chess.load(resp.data.attributes.current_fen)
        if (chess.game_over()) {
          setGameOver(true);
        }
      }
    })
  }, [])

  const handleToggle = () => {
    setChecked(!checked)
  }

  const handleMove = async (move: any) => {
    if (chess.move(move)) {
      const newFen = chess.fen()
      if (chess.game_over()) {
        console.log('game over from FE')
      }
      try {
        const params = {
          fen: newFen,
          api_key: userKey,
          extension: gameId
        }
        const response = await fetch(`${API_ROOT}/api/v1/friendly_games`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(params),
          mode: 'cors'
        })
        const data = await response.json()
        console.log('DATA from PATCH', data)
      } catch(e) {
        console.log(e)
      }
    }
  }

  return (
    <section>
      <Header />

      <Thumbnail imageSource="https://thumbs.dreamstime.com/b/cartoon-lacrosse-player-running-illustration-man-116275009.jpg" />
      <Gameboard
        width={500}
        fen={fen}
        orientation={checked ? 'black' : 'white'}
        onDrop={(move: any) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })
        }
      />
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleToggle}/>
        <span className="slider round"></span>
      </label>
      {gameOver && <GameOver />}
      <Thumbnail imageSource="https://cdn11.bigcommerce.com/s-9nmdjwb5ub/images/stencil/1280x1280/products/153/1145/Business_Shark_big__95283.1513045773.jpg?c=2" />

    </section>
  )

}

export default GameScreen