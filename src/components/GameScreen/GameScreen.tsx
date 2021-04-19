import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
import Thumbnail from '../UIComponents/Thumbnail/Thumbnail'
import { API_WS_ROOT, API_ROOT } from '../../constants/index'
import './GameScreen.css'
const actioncable = require('actioncable');
const Chess = require('chess.js')

// game board should not show up until there are two people signed in
interface PropTypes {
  gameId: string;
  userKey: string;
  userName: string;
}

const GameScreen = ({ gameId, userKey, userName }: PropTypes) => {
  const [chess] = useState<any>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  )
  const [fen, setFen] = useState(chess.fen())
  const [checked, setChecked] = useState<boolean>(false)
  
  const handleToggle = () => {
    setChecked(!checked)
  }
  
  useEffect(() => {
    console.log(gameId)
    const cable = actioncable.createConsumer(`${API_WS_ROOT}`)
    console.log('API_KEY', userKey)
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
        console.log('received')
        console.log('fen', resp.data.attributes.current_fen)
        setFen(resp.data.attributes.current_fen)
        chess.load(resp.data.attributes.current_fen)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMove = async (move: any) => {
    console.log('user credentials', gameId, userKey, fen)
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
        const response = await fetch(`${API_ROOT}/api/v1/friendly_games`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
          mode: 'cors'
        })
        const data = await response.json()
        console.log('DATA from PATCH', data)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <section>
      <Header />
      <Thumbnail text="your opponent" />
      <div className="gameboard-wrapper">
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
      </div>
      <Thumbnail text={userName} />
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
    </section>
  )
}

export default GameScreen