import React from 'react'
import './GameOver.css'
import {API_ROOT} from '../../constants/index'

interface PropTypes {
  userName: string;
  winner: string;
  playerColor: string;
  curExtension: string;
  userKey: string;
  setGameId: any;
  setWinner: any;
  setFen: any;
  setColor: any;
}

interface dataAttributes {
  extension: string | undefined;
  current_fen: string | undefined;
  white: string | undefined;
  black: string | undefined;
}

const GameOver = ({ winner, playerColor, curExtension, userKey, setGameId, setWinner, setFen, setColor, userName}: PropTypes) => {

  const resetGame = ({extension, current_fen, white}: dataAttributes) => {
    setFen(current_fen)
    setGameId(extension)
    setWinner('')
    console.log('white player', white, 'userName', userName)
    setColor(white === userName ? 'white' : 'black')
  }

  const handleClick = async () => {
    try {
      const params = { api_key: userKey, extension: curExtension }
      console.log(params)
      const promise = await fetch(`${API_ROOT}/api/v1/friendly_games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(params)
      })
      const data = await promise.json()
      console.log('data from next game response', data.data.attributes.current_fen)
      resetGame(data.data.attributes)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <section className="game-over-modal">
      {winner === playerColor ? 
        <p>You won! Play again to continue your quest.</p> :
        <p>You've lost. It's not over. Have your friend send you a new url for a shot at revenge!</p>
      }
      <button onClick={handleClick}>Continue Quest?</button>
    </section>
  )
}

export default GameOver