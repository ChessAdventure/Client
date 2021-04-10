import React from 'react'
import Header from '../Header/Header'
import QuestStart from '../QuestStart/QuestStart'
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
        {/* <Thumbnail />
        <PastGames /> */}
      </section>
    </>
  )
}

export default Dashboard