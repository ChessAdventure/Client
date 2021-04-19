import React, { Dispatch, SetStateAction } from 'react'
import { API_ROOT } from '../../constants/index'
import './QuestStart.css'


interface PropTypes {
  setGameId: Dispatch<SetStateAction<string>>;
  userKey: string;
}

const QuestStart = ({ setGameId, userKey }: PropTypes) => {
  //remove Link
  //start button fetches backend for game id
  //create state in App for gameId
  //dashboard can redirect to gameScren once that exists

  const handleClick = async () => {
    //const currentGameId = fetch(gameId, userKey)
    try {
      const params = { api_key: userKey }
      const promise = await fetch(`${API_ROOT}/api/v1/friendly_games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(params)
      })

      const currentGameId = await promise.json()
      setGameId(currentGameId.data.attributes.extension)
      console.log(currentGameId.data.attributes.extension)
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <section className="quest-start" id="quest-start">
      <button className="start-button" onClick={handleClick}>Start A ChessPedition</button>
    </section>
  )
}

export default QuestStart