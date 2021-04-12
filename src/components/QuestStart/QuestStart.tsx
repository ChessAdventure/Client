import React from 'react'
import './QuestStart.css'
import { Link } from 'react-router-dom'
import Button from '../UIComponents/Button/Button'

const QuestStart = () => {
  return (
    <section className="quest-start" id="quest-start">
      <p>Start Quest</p>
      <Link 
        to='/game/7'
      >
        <Button text="Start a quest"></Button>
      </Link>
    </section>
  )
}

export default QuestStart