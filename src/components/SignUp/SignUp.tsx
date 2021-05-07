import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { API_ROOT } from '../../constants/index'
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
            "auth": { 
              username: username,
              password: password
            }
          }
          
          const response = await fetch(`${API_ROOT}/api/v1/user_token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(params)
          })
          const data = await response.json()
          
          const apiKey = data.jwt
          localStorage.setItem('jwt', apiKey)
          setUserKey(apiKey)
          setUserName(params.auth.username)
          
          history.push(`/dashboard`)

        } catch (e) {
          setError('User not found.')
          console.log(e);
        }
        break

      case 'Sign Up':
        const params = {
          "user": { // used to be user
            username: username,
            password: password,
            password_confirmation: confirmPassword
          }
        }
        try {
          const response = await fetch(`${API_ROOT}/api/v1/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(params)
          })
          const data = await response.json();      
          
          const userName = data.data.attributes.username
          localStorage.setItem('chessAdventureName', userName)
          setUserName(userName)

          history.push(`/dashboard`)

        } catch (e: any) {
          setError('Passwords must match. Username must be at least 4 characters and cannot include spaces.')
          console.log(e)
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
          <br></br>
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
          <br></br>
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
          <br></br>
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
      <div className='log-in-wrapper'>
        <button className="button-dk-bg enter-button" onClick={(e) => handleClick(e)}>ENTER</button>
      </div>
      {error && <p className="signup-error">{error}</p>}
    </section>
  )
}

export default SignUp