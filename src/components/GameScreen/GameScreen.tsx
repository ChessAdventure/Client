import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
import { ChessInstance, ShortMove } from 'chess.js'
import Thumbnail from '../UIComponents/Thumbnail/Thumbnail'
import { API_WS_ROOT, API_ROOT } from '../../constants/index'
import GameOver from '../GameOver/GameOver'
const actioncable = require('actioncable');
const Chess = require('chess.js')


// game board should not show up until there are two people signed in
interface PropTypes {
  gameId: string;
  userKey: string;
  userName: string;
  setFollowUpGame: any;
  followUpDetails?: userDetails | undefined;
}
interface userDetails {
  extension: string | undefined;
  current_fen: string | undefined;
  white: string | undefined;
  black: string | undefined;
}
// chess.fen() returns current fen
// chess.game_over() returns true if game is over

const GameScreen = ({ gameId, userKey, userName, setFollowUpGame, followUpDetails }: PropTypes) => {
  const [chess] = useState<any>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  )
  const [fen, setFen] = useState<string>(chess.fen())
  const [checked, setChecked] = useState<boolean>(false)
  const [color, setColor] = useState<string>('')
  const [winner, setWinner] = useState<string>('')

  const handleUser = (userDetails: userDetails) => {
    if (followUpDetails) {
      console.log('followupdetails', followUpDetails)
    }
    userName === userDetails.white ? setColor('white') : setColor('black')
  }

  useEffect(() => {
    const cable = actioncable.createConsumer(`${API_WS_ROOT}`)
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
        console.log('response from server', resp)
        handleUser(resp.data.attributes)
        setFen(resp.data.attributes.current_fen)
        chess.load(resp.data.attributes.current_fen)
        if (chess.game_over()) {
          color === 'white' ? setWinner('black') : setWinner('white')
        }
      }
    })
  }, [])

  const handleToggle = () => {
    setChecked(!checked)
  }

  const handleMove = async (move: object) => {
    if (chess.move(move)) {
      const newFen = chess.fen()
      if (chess.game_over()) {
        try {
          const params = {
            fen: newFen,
            api_key: userKey,
            extension: gameId,
            status: color === 'white' ? 1 : 2,
          }
          const response = await fetch(`${API_ROOT}/api/v1/friendly_games`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(params),
            mode: 'cors'
          })
          const data = await response.json()
          setWinner(color)
        } catch(e) {
          console.log(e)
        }
        // This will send a different patch with the end game fen, result of who won,
        // and kick off the next game with a new fen from the BE. Will redirect to a new extension
      } else {
          try {
          const params = {
            fen: newFen,
            api_key: userKey,
            extension: gameId
          }
          console.log(params)
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
      {winner.length && <GameOver 
        winner={winner} 
        playerColor={color} 
        extension={gameId} 
        userKey={userKey}
        setFollowUpGame={setFollowUpGame}/>}
      <Thumbnail imageSource="https://cdn11.bigcommerce.com/s-9nmdjwb5ub/images/stencil/1280x1280/products/153/1145/Business_Shark_big__95283.1513045773.jpg?c=2" />
    </section>
  )
}

export default GameScreen