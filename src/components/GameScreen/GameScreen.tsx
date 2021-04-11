import React, { useState } from 'react'
import Header from '../Header/Header'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
import { Chess } from 'chess.js'

interface PropTypes {
    id: string;
}

const GameScreen = ({ id }: PropTypes) => {



    return (
        <section>game screen {id}
            <Header />
            <Gameboard 
                width={500} 
                fen="start"
                draggable={true}/>
        </section>
    )

}

export default GameScreen