import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './Splash.css'
import chessPieces from '../../chess.svg'
import SignUp from '../SignUp/SignUp'
import Button from '../UIComponents/Button/Button'

const Splash = () => {

  const [formState, setFormState] = useState<string>('Log In')

  return (
    <div className="splash">
      <div className="checkerboard">
      </div>
      <section className="login-modal">
        <h1 className="title">Chess Quest</h1>
        <SignUp form={formState}/>
        <Link to={'/dashboard/1234'}>
          <div className="enter">
           <p>{formState}</p>
          </div>
        </Link>
        {formState === 'Log In' && 
        <div className="button-wrapper">
          <Button text={'Sign Up'} handleClick={() => setFormState('Sign Up')} />
        </div>
        }
      </section>
      <img className="chess-pieces" src={chessPieces} alt="chess pieces" />
    </div>
  )
}



export default Splash;