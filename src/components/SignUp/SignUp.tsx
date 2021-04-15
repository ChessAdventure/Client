import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './SignUp.css'

interface PropTypes {
  form: string;
  setUserName: any;
  setUserKey: any;
}

const SignUp = ({ form, setUserName, setUserKey }: PropTypes) => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  let history = useHistory()

  useEffect(() => {
    setError('')
  }, [form])

  const handleClick = async (e: any) => {
    e.preventDefault()
    switch (form) {
      case 'Log In':
        try {
          const params = {
            "user": {
              username: username,
              password: password
            }
          }
          const response = await fetch(`http://localhost:3001/api/v1/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(params)
          })
          const data = await response.json();
          console.log('hit that');

          const apiKey = data.data.attributes.api_key
          const userName = data.data.attributes.username
          localStorage.setItem('chessAdventureKey', apiKey)
          localStorage.setItem('chessAdventureName', userName)
          setUserName(userName)
          setUserKey(apiKey)
          
          history.push(`/dashboard`)

        } catch (e) {
          setError('User not found')
          console.log(e);
        }
        break
      case 'Sign Up':
        const params = {
          "user": {
            username: username,
            password: password,
            password_confirmation: confirmPassword
          }
        }
        try {
          const response = await fetch(`http://localhost:3001/api/v1/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(params)
          })
          const data = await response.json();

          const apiKey = data.data.attributes.api_key
          const userName = data.data.attributes.username
          localStorage.setItem('chessAdventureKey', apiKey)
          localStorage.setItem('chessAdventureName', userName)
          setUserName(userName)
          setUserKey(apiKey)
          history.push(`/dashboard`)

        } catch (e: any) {
          setError('Passwords must match. Username must be at least 4 characters.')
          console.log(e)
          // eventually display a custom error message depending on what you borked
        }
        break
      default:
        return
    }
  }

  return (
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
          <label className="confirm-label">
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