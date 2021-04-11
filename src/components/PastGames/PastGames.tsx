import React, { ReactElement } from 'react'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
import moves from '../../king.png'
import pieces from '../../strategy.png'
import './PastGames.css'

interface PropTypes {
  gameFens?: string[];
}

const PastGames = ({ gameFens }: PropTypes) => {
  const gameboards = gameFens?.map((fen: string, index: number) => {
    return (
      <section className="past-game-wrapper" key={index}>
        <Gameboard width={250} fen={fen} />
        <section className="past-game-icons-wrapper">
          <div className="moves">
            <h3 className="counter">15</h3>
            <img src={moves} alt="moves taken" className="past-game-icon"/>
          </div>
          <div className="pieces-lost">
            <img src={pieces} alt="pieces lost" className="past-game-icon"/>
            <h3 className="counter">8</h3>
          </div>
        </section>
      </section>
    )
  })
  return (
    <>
      <section className="past-games">
        {gameboards}
      </section>

    </>
  )
}

export default PastGames