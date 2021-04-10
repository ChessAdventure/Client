import React from 'react'
import Header from '../Header/Header'
import QuestStart from '../QuestStart/QuestStart'
import Thumbnail from '../UIComponents/Thumbnail/Thumbnail'
import './Dashboard.css'

interface PropTypes {
  user: string;
}

const Dashboard: React.FC<PropTypes> = ({ user }) => {
  return (
    <>
      <Header />
      <section className="grid">
        <QuestStart />
        <Thumbnail 
          imageSource="https://cdn11.bigcommerce.com/s-9nmdjwb5ub/images/stencil/1280x1280/products/153/1145/Business_Shark_big__95283.1513045773.jpg?c=2"
          text="Player name"
        />
        {/* <PastGames /> */}
      </section>
    </>
  )
}

export default Dashboard