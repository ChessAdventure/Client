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
  const [opponent, setOpponent] = useState<string>('none')
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
        resp.data.attributes.white === userName ?
          setOpponent(resp.data.attributes.black || 'none') :
          setOpponent(resp.data.attributes.white)
        handleUser(resp.data.attributes)
        setFen(resp.data.attributes.current_fen)
        if (chess.game_over()) {
          color === 'white' ? setWinner('black') : setWinner('white')
        }
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId])

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
      } else {
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
          setMoveError('')
        } catch(e) {
          console.log(e)
        }
      }
    } else {
      setMoveError('Not a valid move')
    }
  }

  return (
    <section>
      <Header />
      {opponent !== 'none' && <Thumbnail text={`Playing: ${opponent}`}/>}
      {opponent !== 'none' && <Gameboard
        width={500}
        fen={fen}
        orientation={color === 'white' ? 'white' : 'black'}
        onDrop={(move: any) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })
        }
      />}
      {opponent === 'none' && <p>Send this link to a friend to start playing! <br></br> 
        http://localhost:3000/game/{gameId}</p>}
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