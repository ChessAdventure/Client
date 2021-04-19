import React, { useState } from 'react'
import './Splash.css'
import chessPieces from '../../chess.svg'
import SignUp from '../SignUp/SignUp'

interface PropTypes {
  setUserName: any;
  setUserKey: any;
}

const Splash = ({ setUserName, setUserKey }: PropTypes) => {

  const [formState, setFormState] = useState<string>('Log In')

  // const validateLogIn = () => {
  //   console.log('logged')
  // }

  return (
    <div className="splash">
      <div className="checkerboard">
      </div>
      <section className="login-modal">
        <h1 className="title">Chess Quest</h1>
        <SignUp form={formState} setUserName={setUserName} setUserKey={setUserKey} />
        {formState === 'Log In' && <button className="signup-button" onClick={() => setFormState('Sign Up')}>Sign Up</button>}
        {formState === 'Sign Up' && <button className="signup-button" onClick={() => setFormState('Log In')}>Log In</button>}
      </section>
      <img className="chess-pieces" src={chessPieces} alt="chess pieces" />
    </div>
  )
}



export default Splash;