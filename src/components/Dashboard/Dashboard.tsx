import React, { Dispatch, SetStateAction } from 'react'
import Header from '../Header/Header'
import QuestStart from '../QuestStart/QuestStart'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
import Thumbnail from '../UIComponents/Thumbnail/Thumbnail'
import './Dashboard.css'

interface PropTypes {
  user: string;
  setGameId: Dispatch<SetStateAction<string>>;
  userKey: string;
}

const Dashboard = ({ user, setGameId, userKey }: PropTypes) => {
  return (
    <>
      <Header />
      <section className="container">
        <br></br>
        <Thumbnail
          imageSource="https://cdn11.bigcommerce.com/s-9nmdjwb5ub/images/stencil/1280x1280/products/153/1145/Business_Shark_big__95283.1513045773.jpg?c=2"
          text={user}
        />
        <br></br>
        <QuestStart setGameId={setGameId} userKey={userKey} />
        <br></br>
        <div>
          <h3 className="previous-game-header">Previous Game End:</h3>
          <Gameboard 
            width={200} 
            orientation={'white'}
            draggable={false}
            fen={'4R3/1k6/1p2P1p1/p7/4r3/1P1r4/1K6/2R5 w - - 0 0'}
          />
        </div>
      </section>
    </>
  )
}

export default Dashboard