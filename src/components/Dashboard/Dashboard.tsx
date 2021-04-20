import React, { Dispatch, SetStateAction } from 'react'
import Header from '../Header/Header'
import QuestStart from '../QuestStart/QuestStart'
import Thumbnail from '../UIComponents/Thumbnail/Thumbnail'
import PastGames from '../PastGames/PastGames'

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
      <section className="grid">
        <QuestStart setGameId={setGameId} userKey={userKey} />
        <Thumbnail
          imageSource="https://cdn11.bigcommerce.com/s-9nmdjwb5ub/images/stencil/1280x1280/products/153/1145/Business_Shark_big__95283.1513045773.jpg?c=2"
          text={user}
        />
        <div className="pastgame-header">
          <h2>
            Recent games
          </h2>
          <button className="see-all-button">All Match History</button>
        </div>
        <PastGames gameFens={['8/8/5p2/1P1K1k2/8/2r5/8/7R w - - 0 0', '8/8/5p2/1P1K1k2/8/2r5/8/7R w - - 0 0', '8/8/5p2/1P1K1k2/8/2r5/8/7R w - - 0 0']} />

      </section>
    </>
  )
}

export default Dashboard