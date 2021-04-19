import React, { Dispatch, SetStateAction} from 'react'
import Header from '../Header/Header'
import QuestStart from '../QuestStart/QuestStart'
import Thumbnail from '../UIComponents/Thumbnail/Thumbnail'
import PastGames from '../PastGames/PastGames'

import './Dashboard.css'
import OldGameBoard from '../OldGameBoard/OldGameBoard'

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
        <QuestStart setGameId={setGameId} userKey={userKey}/>
        <Thumbnail 
          imageSource="https://cdn11.bigcommerce.com/s-9nmdjwb5ub/images/stencil/1280x1280/products/153/1145/Business_Shark_big__95283.1513045773.jpg?c=2"
          text={user}
        />
        <br></br>
        <div>
          <h3 className="previous-game-header">Previous Game End:</h3>
          <OldGameBoard width={200}/>    
        </div>
      </section>
    </>
  )
}

export default Dashboard