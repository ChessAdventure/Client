import React from 'react'
import './Header.css'

const Header = () => {

  const handleSignOut = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('chessAdventureName')
    window.location.replace('/');
  }

  return (
    <header className="dashboard-header">
      <h1>ChessPedition</h1>
      <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
    </header>
  )
}


export default Header