import React, { ReactElement } from 'react'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
import './PastGames.css'

interface PropTypes {
  gameFens?: string[];
}

const PastGames: React.FC<PropTypes> = ({ gameFens }) => {
  const gameboards = gameFens?.map((fen: string, index: number) => {
   return <Gameboard fen={fen} key={index} />
  }) 
  return (
    <section className="past-games">
      {gameboards}
    </section>
  )
}

export default PastGames