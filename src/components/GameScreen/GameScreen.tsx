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

  const handleUser = (userDetails: userDetails) => {
    userName === userDetails.white ? setColor('white') : setColor('black')
  }

  useEffect(() => {
    setGameId(gameId)
  }, [])

  useEffect(() => {
    console.log('changed fen', fen)
    chess.load(fen)
  }, [fen])

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
            status: color === 'white' ? 2 : 1,
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
      <Thumbnail imageSource="https://cdn11.bigcommerce.com/s-9nmdjwb5ub/images/stencil/1280x1280/products/153/1145/Business_Shark_big__95283.1513045773.jpg?c=2" />
    </section>
  )
}

export default GameScreen