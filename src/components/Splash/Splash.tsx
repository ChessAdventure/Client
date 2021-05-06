import React, { useState } from 'react'
import './Splash.css'
import SignUp from '../SignUp/SignUp'

interface PropTypes {
  setUserName: any;
  setUserKey: any;
}

const Splash = ({ setUserName, setUserKey }: PropTypes) => {

  const [formState, setFormState] = useState<string>('Log In')

  return (
    <div className="splash">
      <section className="login-modal">
        <h1 className="title">ChessPedition</h1>
        <SignUp form={formState} setUserName={setUserName} setUserKey={setUserKey} />
        {formState === 'Log In' && <button className="signup-button" onClick={() => setFormState('Sign Up')}>Sign Up</button>}
        {formState === 'Sign Up' && <button className="signup-button" onClick={() => setFormState('Log In')}>Log In</button>}
      </section>
    </div>
  )
}

export default Splash;