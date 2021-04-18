import React from 'react'
import './GameOver.css'

const GameOver = () => {
  return (
    <section className="game-over-modal">
      {/*Eventually this will render from a prop that says if it's a win or a loss*/}
      <p>Game over!</p>
      <button>Play again?</button>
    </section>
  )
}

export default GameOver