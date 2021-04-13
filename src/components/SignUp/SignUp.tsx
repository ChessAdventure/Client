import React, { useState, useEffect } from 'react'
import './SignUp.css'

interface PropTypes {
  form: string;
}

const SignUp = ({ form }: PropTypes) => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setError('')
  }, [form])

  const handleClick = async (e: any) => {
    e.preventDefault()
    switch (form) {
      case 'Log In':
        //code
      break
      case 'Sign Up':
        if (username.length >= 4 && password.length && confirmPassword.length && password === confirmPassword) {
          // console.log({
          //   un: username,
          //   pw: password,
          //   cpw: confirmPassword,
          // })
          console.log(JSON.stringify({user: {
            username,
            password,
            password_confirmation: confirmPassword
          }}))
          const response = await fetch('http://localhost:3001/api/v1/users?user', {
            method: 'POST',
            headers: {'CONTENT_TYPE': 'application/json'},
            body: JSON.stringify({user: {
              username,
              password,
              password_confirmation: confirmPassword
            }})
          })
          const data = await response.json();
          console.log(data)
        } else {
          setError('Something went wrong, please try again')
        }
      break
      default:
        return
    }
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
      {error && <p className="error">{error}</p>}
    </section>
  )
}


export default SignUp