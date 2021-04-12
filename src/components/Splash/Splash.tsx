import React, {MouseEvent} from 'react'
import {Link} from 'react-router-dom'
import './Splash.css'
import chessPieces from '../../chess.svg'
import SignUp from '../SignUp/SignUp'

const Splash = () => {
  return (
    <div className="splash">
      <div className="checkerboard">
      </div>
      <section className="login-modal">
        <h1 className="title">Chess Quest</h1>
        <SignUp />
        <Link to={'/dashboard/1234'}>
          <div className="enter">
           <p>Sign Up</p>
          </div>
        </Link>
      </section>
      <img className="chess-pieces" src={chessPieces} alt="chess pieces" />
    </div>
  )
}



export default Splash;