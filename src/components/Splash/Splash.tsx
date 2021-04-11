import React, {MouseEvent} from 'react'
import {Link} from 'react-router-dom'
import './Splash.css'
import chessPieces from '../../chess.svg'
const Splash = () => {

  return (
    <div className="splash">
      <div className="checkerboard">
      </div>
      <section className="login-modal">
        <h1 className="title">Chess Quest</h1>
        <div className="enter">
          <Link to={'/dashboard/1234'}>BEGIN</Link>
        </div>
      </section>
      <img className="chess-pieces" src={chessPieces} alt="chess pieces" />
    </div>
  )
}



export default Splash;