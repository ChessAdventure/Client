import React, { useState } from 'react'
import './SignUp.css'

interface PropTypes {
  form: string;
}

const SignUp = ({ form }: PropTypes) => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleClick = (e: any) => {
    e.preventDefault()
    console.log(username, password, confirmPassword)
  }

  return(
    <section className="form-wrapper">
      <form className="form">
        <label>
          Username:
          <input
            className="input" 
            type="text" 
            value={username}
            name="username" 
            onChange={e => setUsername(e.target.value)}
            >
          </input>
        </label>
        <label>
          Password:
          <input 
            className="input" 
            type="password" 
            value={password} 
            name="password"
            onChange={e => setPassword(e.target.value)} 
          >
          </input>
        </label>
        {form === 'Sign Up' &&
        <label>
          Confirm Password:
          <input 
            className="input" 
            type="password" 
            value={confirmPassword} 
            name="confirmPassword"
            onChange={e => setConfirmPassword(e.target.value)}
            >
          </input>
        </label>}
      </form>
      <button className="log-in" onClick={(e) => handleClick(e)}>Enter</button>
    </section>
  )
}


export default SignUp