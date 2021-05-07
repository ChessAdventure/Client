import React from 'react'
import './Header.css'

const Header = () => {

  const handleSignOut = () => {
    localStorage.removeItem('chessAdventureKey')
    localStorage.removeItem('chessAdventureName')
    window.location.replace('/');
  }

  return (
    <header className="dashboard-header">
      <h1>ChessPedition</h1>
      <button className="sign-out button-dk-bg" onClick={handleSignOut}>Sign Out</button>
    </header>
  )
}


export default Header