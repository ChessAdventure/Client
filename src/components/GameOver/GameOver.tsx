import React from 'react'
import './GameOver.css'

const GameOver = () => {
  return (
    <section className="game-over-modal">
      {/*Eventually this will render from a prop that says if it's a win or a loss based on which player
      is playing*/}
      <p>Game over!</p>
      <button>Continue Quest?</button>
    </section>
  )
}

export default GameOver