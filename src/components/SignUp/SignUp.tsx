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

          const params = {
            "user": {
              username: username,
              password: password,
              password_confirmation: confirmPassword
            }
          }
          try {
            // /login, include username and password in a POST
            const response = await fetch(`http://localhost:3001/api/v1/users`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              mode: 'cors',
              body: JSON.stringify(params)
            })
            const data = await response.json();
            const apiKey = data.data.attributes.api_key
            const userName = data.data.attributes.username
            localStorage.setItem('chessAdventureKey', apiKey)
            localStorage.setItem('chessAdventureName', userName)
            // catch error and display it, as long as it's a 500+ (it's an array)
            // otherwise display error below
          } catch(e: any) {
            setError('Something went wrong, please try again')
            // eventually display a custom error message depending on what you borked
          }
          // data: attributes {api_key, username}, id, type
          // if apikey is included and response is 200, go to dashboard and save it in localstorage
        }
      break
      default:
        return
    }
  }

  return(
    <section className="form-wrapper">
      <form className="form">
        <label className="label">
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
        <label className="label">
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