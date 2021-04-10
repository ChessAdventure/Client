import React from 'react'
import './QuestStart.css'
import Button from '../UIComponents/Button/Button'

const QuestStart: React.FC<any> = () => {
  return (
    <section className="quest-start" id="quest-start">
      <p>Start Quest</p>
      <Button text="Start a quest"></Button>
    </section>
  )
}

export default QuestStart