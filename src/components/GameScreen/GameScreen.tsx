/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
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
  setGameId: any;
}
interface userDetails {
  extension: string | undefined;
  current_fen: string | undefined;
  white: string | undefined;
  black: string | undefined;
}

const GameScreen = ({ gameId, userKey, userName, setGameId }: PropTypes) => {
  const [chess] = useState<any>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  )
  const [fen, setFen] = useState<string>(chess.fen())
  const [checked, setChecked] = useState<boolean>(false)
  const [color, setColor] = useState<string>('')
  const [opponent, setOpponent] = useState(false)
  const [winner, setWinner] = useState<string>('')
  const [moveError, setMoveError] = useState<string>('')

  const handleUser = (userDetails: userDetails) => {
    userName === userDetails.white ? setColor('white') : setColor('black')
  }

  useEffect(() => {
    setGameId(gameId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('changed fen', fen)
    chess.load(fen)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen])

  useEffect(() => {
    const cable = actioncable.createConsumer(`${API_WS_ROOT}`)
    cable.subscriptions.create({
      channel: 'FriendlyGamesChannel',
      api_key: userKey,
      extension: gameId
    }, {
      connected: () => {
        console.log('connected!')
      },
      disconnected: () => {
        console.log('disconnected')
      },
      received: (resp: any) => {
        if (resp.data.attributes.black) {
          setOpponent(true)
        }
        handleUser(resp.data.attributes)
        setFen(resp.data.attributes.current_fen)
        if (chess.game_over()) {
          color === 'white' ? setWinner('black') : setWinner('white')
        }
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId])

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
          console.log(typeof params.status)
          console.log(params.status)
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
          if (data.errors) {
            setMoveError(data.errors[0])
          } else {
            setMoveError('')
          }
        } catch(e) {
          console.log(e)
        }
      }
    }
  }

  return (
    <section>
      <Header />
      <Thumbnail />
      {opponent && <Gameboard
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
      />}
      {!opponent && <p>Send this link to a friend to start playing! <br></br> 
        http://localhost:3000/game/{gameId}</p>}
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleToggle}/>
        <span className="slider round"></span>
      </label>
      {winner.length > 0 && <GameOver 
        userName={userName}
        setGameId={setGameId}
        winner={winner} 
        setFen={setFen}
        setWinner={setWinner}
        playerColor={color} 
        curExtension={gameId} 
        userKey={userKey}
        setColor={setColor}
      />}
      <Thumbnail />
    </section>
  )
}

export default GameScreen