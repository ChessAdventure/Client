import React, { Dispatch, SetStateAction } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../Header/Header'
import QuestStart from '../QuestStart/QuestStart'
import Rules from '../Rules/Rules'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
import Thumbnail from '../UIComponents/Thumbnail/Thumbnail'
import './Dashboard.css'

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

  return (
    <>
      <Header />
      <section className="container">
        <div className="greeting">
          <p>Welcome, </p>
          <Thumbnail text={user} />
        </div>
          {activeGame?.length > 0 && 
          <>
            <p>You are in an active game.</p>
            <button className="return-to-game" onClick={handleReturn}>Return to game</button>
          </>
          }
        <br></br>
        <Rules />
        <br></br>
        <QuestStart setGameId={setGameId} userKey={userKey} />
        <br></br>
        <section>
          <h3 className="previous-game-header">Previous Game End:</h3>
          <Gameboard 
            width={200} 
            orientation={'white'}
            draggable={false}
            fen={'4R3/1k6/1p2P1p1/p7/4r3/1P1r4/1K6/2R5 w - - 0 0'}
          />
        </section>
      </section>
    </>
  )
}

export default Dashboard