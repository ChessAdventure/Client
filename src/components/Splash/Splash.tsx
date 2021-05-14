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
        {formState === 'Log In' && <button className="button-dk-bg signup-button" onClick={() => setFormState('Sign Up')}>Show Account Creation</button>}
        {formState === 'Sign Up' && <button className="button-dk-bg signup-button" onClick={() => setFormState('Log In')}>Show Login</button>}
      </section>
    </div>
  )
}

export default Splash;