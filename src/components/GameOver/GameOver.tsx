import React from 'react'
import './GameOver.css'

interface PropTypes {
  winner: string;
  playerColor: string;
}

const GameOver = ({ winner, playerColor}: PropTypes) => {
  return (
    <section className="game-over-modal">
      {winner === playerColor ? 
        <p>You won! Play again to continue your quest.</p> :
        <p>You've lost. It's not over. Play again for a shot at revenge!</p>
      }
      <button>Continue Quest?</button>
    </section>
  )
}

export default GameOver