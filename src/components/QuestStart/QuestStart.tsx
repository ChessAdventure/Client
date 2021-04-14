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

      // const getGameData = async (userKey: string) => {
    //   // will be the game endpoint, not the users
    //   return fetch(`http://localhost:3001/api/v1/users/${userKey}`, {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    //     mode: 'cors'
    //   })
    //   .then(response => response.json())
    //   .then(data => console.log('response', data)
    //   )
    // }
    // console.log(getGameData);

  const handleClick = () => {
    //const currentGameId = fetch(gameId, userKey)
    const currentGameID = fetch(`http://localhost:3001/api/v1/friendly_games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      mode: 'cors',
      body: JSON.stringify(userKey)
    })
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