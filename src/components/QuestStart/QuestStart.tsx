import React from 'react'
import './QuestStart.css'
import { Link } from 'react-router-dom'

const QuestStart = () => {
  return (
    <section className="quest-start" id="quest-start">
      <p>Start Quest</p>
      <Link 
        to='/game/7'
      >
        <button className="start-button">Start a quest</button>
      </Link>
    </section>
  )
}

export default QuestStart