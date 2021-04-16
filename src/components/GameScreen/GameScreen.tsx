import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
import { ChessInstance, ShortMove } from 'chess.js'
import Thumbnail from '../UIComponents/Thumbnail/Thumbnail'
import { ActionCableConsumer } from 'react-actioncable-provider'
import Cable from 'actioncable'
import { API_WS_ROOT } from '../../constants/index'

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gameData, setGameData] = useState<string[]>([])
  // const [cable, setCable] = useState<any>()

  // useEffect(() => {
  //   let connection = Cable.createConsumer(`${API_WS_ROOT}/${userKey}`)
  //   setCable(connection.subscriptions.create(
  //     {channel: 'FriendlyGamesChannel'},
  //     {
  //       connected: () => console.log('connected'),
  //       disconnected: () => console.log('disconnected'),
  //       rejected: () => console.log('rejected'),
  //       sendMove: cable.perform('')
  //     }
  //   ))
  // }, [])

  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  )
  const [fen, setFen] = useState(chess.fen())
  console.log('fen', fen)

  const handleMove = async (move: ShortMove) => {
    console.log(move)
    if (chess.move(move)) {
      const newFen = chess.fen()
      console.log(newFen)
      try {
        const params = {
          fen: newFen,
          api_key: userKey,
          extension: gameId
        }
        const response = await fetch('http://localhost:3001/api/v1/friendly_games', {
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
      // after every move, if the game is over and there's a win
      // send that info to BE
    }
  }
  const handleReceived = (data: any) => {
    console.log('RECEIVED')
    setFen(data.data.attributes.current_fen)
    chess.load(data.data.attributes.current_fen)
  }

  return (
    <section>
      <ActionCableConsumer
        channel={{ channel: 'FriendlyGamesChannel', api_key: userKey, extension: gameId }}
        onReceived={handleReceived}
        onDisconnected={console.log('FUUUUUUUUUCK')}
        onConnected={(data: any) => {console.log('CONNECTED')}}
      // pass apiKey when handleRecievedGame is called
      // redirect to game component *done
      />
      <Header />
      <Thumbnail imageSource="https://thumbs.dreamstime.com/b/cartoon-lacrosse-player-running-illustration-man-116275009.jpg" />
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