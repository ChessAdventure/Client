import React from 'react'
import './Header.css'

const Header = () => {

  const handleSignOut = () => {
    localStorage.removeItem('chessAdventureKey')
    localStorage.removeItem('chessAdventureName')
    window.location.reload();
  }

  return (
    <header className="dashboard-header">
      <h1>Chess Quest</h1>
      <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
    </header>
  )
}


export default Header