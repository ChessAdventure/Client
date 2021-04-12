import React, { useState } from 'react'
import './SignUp.css'

const SignUp = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  return(
    <section>
      <form>
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
            type="text" 
            value={password} 
            name="password"
            onChange={e => setPassword(e.target.value)} 
            
          >
          </input>
        </label>
        <label>
          Confirm Password:
          <input 
            className="input" 
            type="text" 
            value={confirmPassword} 
            name="confirmPassword"
            onChange={e => setConfirmPassword(e.target.value)}
            >
          </input>
        </label>
      </form>
    </section>
  )
}


export default SignUp