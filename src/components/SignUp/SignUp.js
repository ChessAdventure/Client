import React, { useState } from 'react'
import './SignUp.css'

// interface PropTypes {
//   form: string;
// }

const SignUp = ({ form }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleClick = async (e) => {
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
          
          const params = {
            "user": {
              username: username,
              password: password,
              password_confirmation: confirmPassword
            }
          }
          
          const response = await fetch(`http://localhost:3001/api/v1/users`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify(params)
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