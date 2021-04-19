import React from 'react'
import { Link, useHistory} from 'react-router-dom'
import './GameOver.css'
import {API_ROOT} from '../../constants/index'

interface PropTypes {
  winner: string;
  playerColor: string;
  extension: string;
  userKey: string;
  setFollowUpGame: any;
}

const GameOver = ({ winner, playerColor, extension, userKey, setFollowUpGame}: PropTypes) => {
  let history = useHistory()

  const handleClick = async () => {
    try {
      const params = { api_key: userKey, extension: extension }
      const promise = await fetch(`${API_ROOT}/api/v1/friendly_games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(params)
      })
      const data = await promise.json()
      console.log('data for followup game', data.data.attributes)
      setFollowUpGame(data.data.attributes)
      setTimeout(() => {
        history.push({
          pathname: `/game/${data.data.attributes.extension}`,
        })
      })
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <section className="game-over-modal">
      {winner === playerColor ? 
        <p>You won! Play again to continue your quest.</p> :
        <p>You've lost. It's not over. Play again for a shot at revenge!</p>
      }
      <button onClick={handleClick}>Continue Quest?</button>
    </section>
  )
}

export default GameOver