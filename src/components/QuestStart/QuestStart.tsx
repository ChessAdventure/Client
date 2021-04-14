import React, { Dispatch, SetStateAction } from 'react'
import './QuestStart.css'
import { Link } from 'react-router-dom'

interface PropTypes {
  setGameId: Dispatch<SetStateAction<string>>;
  userKey: string;
}

const QuestStart = ({ setGameId, userKey }: PropTypes) => {
  //remove Link
  //start button fetches backend for game id
  //create state in App for gameId
  //dashboard can redirect to gameScren once that exists

  const handleClick = () => {
    //const currentGameId = fetch(gameId, userKey)
    setGameId('currentGameId')
  }

  return (
    <section className="quest-start" id="quest-start">
      <p>Start Quest</p>
        <button className="start-button" onClick={handleClick}>Start a quest</button>
    </section>
  )
}

export default QuestStart