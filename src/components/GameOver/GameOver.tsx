import React, { Dispatch, SetStateAction} from 'react'
import './GameOver.css'
import {API_ROOT} from '../../constants/index'

interface PropTypes {
  userName: string;
  winner: string;
  playerColor: string;
  curExtension: string;
  userKey: string;
  setGameId: any;
  setWinner: Dispatch<SetStateAction<string>>;
  setFen: any;
  setColor: Dispatch<SetStateAction<string>>;
}

interface dataAttributes {
  extension: string | undefined;
  current_fen: string | undefined;
  white: string | undefined;
  black: string | undefined;
}

const GameOver = ({ winner, playerColor, curExtension, userKey, setGameId, setWinner, setFen, setColor, userName}: PropTypes) => {

  console.log(winner, playerColor, userName)
  const resetGame = ({extension, current_fen, white}: dataAttributes) => {
    setFen(current_fen)
    setGameId(extension)
    setWinner('')
    console.log(white)
    setColor(white === userName ? 'white' : 'black')
  }

  const handleClick = async () => {
    try {
      const params = { api_key: userKey, extension: curExtension }
      const promise = await fetch(`${API_ROOT}/api/v1/friendly_games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(params)
      })
      const data = await promise.json()
      console.log(data)
      resetGame(data.data.attributes)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <section className="game-over-modal">
      {winner === playerColor ? 
        <p className="winner-text">You won! Continue your quest and play again!</p> :
        <p className="winner-text">You lost but it's not over!<br></br>Play again for a shot at revenge!</p>
      }
      <button className="play-again-button" onClick={handleClick}>Play Again</button>
    </section>
  )
}

export default GameOver