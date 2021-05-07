/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { API_ROOT } from '../../constants/index'
import Expand from 'react-expand-animated'
import './Dashboard.css'
import Header from '../Header/Header'
import QuestStart from '../QuestStart/QuestStart'
import Rules from '../Rules/Rules'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
import Thumbnail from '../UIComponents/Thumbnail/Thumbnail'

interface PropTypes {
  user: string;
  setGameId: Dispatch<SetStateAction<string>>;
  userKey: string;
  activeGame: string;
}

const Dashboard = ({ user, setGameId, userKey, activeGame }: PropTypes) => {
  const history = useHistory();
  const handleReturn = () => {
    history.push(`/game/${activeGame}`)
  }
  const [lastGame, setLastGame] = useState<string>('')
  const [lastWinner, setLastWinner] = useState<string>('')
  const [streak, setStreak] = useState<string>('')
  const [previousGames, hasPreviousGames] = useState<boolean>(false)
  const [toggle, setToggle] = useState<boolean>(false)
  const [showStats, toggleShowStats] = useState<boolean>(false)

  const handleClick = async (e: any) => {
    try {
      const response = await fetch(`${API_ROOT}/api/v1/stats/${user}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      })
      const data = await response.json()

      if (!data.error) {
        setLastGame(data.data.meta.last_game.fen)
        setLastWinner(data.data.meta.last_game.status)
        setStreak(data.data.meta.streak)
        hasPreviousGames(true)
      }
    } catch (e) {
      console.log(e);
    }
    toggleShowStats(!showStats)
  }

  const handleComputer = () => {
    history.push('/gofishing')
  }

  return (
    <>
      <Header />
      <section className="container">
        <div className="greeting">
          <p>Welcome, </p>
          <Thumbnail text={user} />
        </div>
        <button className="show-rules button-lt-bg" onClick={() => setToggle(!toggle)}>What's ChessPedition?</button>
        <Expand open={toggle}>
          <Rules />
        </Expand>
        {activeGame?.length > 0 &&
          <>
            <button className="button-lt-bg" onClick={handleReturn}>Return to friendly game</button>
          </>
        }
        <QuestStart setGameId={setGameId} userKey={userKey} />

        <button className="button-lt-bg CPU-start" onClick={handleComputer}>Play the computer</button>
        <section className='computer'>
          <button className="show-stats button-lt-bg" onClick={(e) => handleClick(e)}>Show Stats</button>
          <Expand open={showStats}>
            {!previousGames ? <h3 className="previous-game-header">When you finish a game, its end board will show here.</h3> :
              <h3 className="previous-game-header">Last time you played,
            <span>
                  {lastWinner === 'won' ? <span> white was the winner!</span> : <span> black was the winner!</span>}
                </span>
                <span>
                  <br></br>
                  {streak === "No wins yet" ? streak : <span>Your longest streak is {streak}!</span>}
                </span>
              </h3>}
          </Expand>

          <Gameboard
            width={300}
            orientation={'white'}
            draggable={false}
            fen={lastGame}
            boardStyle={{
              'width': '300px', 'height': '300px', 'cursor': 'default', 'borderRadius': '5px', 'boxShadow': 'rgba(0, 0, 0, 0.5) 0px 5px 15px'
            }}
          />
        </section>
        <div className="footer">
        </div>
      </section>
    </>
  )
}

export default Dashboard
