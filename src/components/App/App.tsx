import { useEffect, useState } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import Splash from '../Splash/Splash'
import Dashboard from '../Dashboard/Dashboard'
import GameScreen from '../GameScreen/GameScreen'

const App = () => {

  const [userName, setUserName] = useState<string>('')
  const [userKey, setUserKey] = useState<string>('')
  const [gameId, setGameId] = useState<string>('')
  let history = useHistory()

  useEffect(() => {
    const activeUser = localStorage.getItem('chessAdventureName') || ''
    const activeKey = localStorage.getItem('chessAdventureKey') || ''
    setUserName(activeUser)
    setUserKey(activeKey)
  }, [userName])

  // const handleReceivedGame() {
  //   fetch('')
  // }

  useEffect(() => {
    if(gameId !== '') {
      history.push(`/game/${gameId}`)
    }
  }, [gameId])

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => { return <Splash setUserName={setUserName} setUserKey={setUserKey} /> }}
        >
          {userKey.length && <Redirect to={`/dashboard`} />}
        </Route>
        <Route
          exact
          path="/dashboard"
          render={() => {
            return <Dashboard user={userName} setGameId={setGameId} userKey={userKey} />
          }}
        >

          {/* if there's a gameID in localStorage, redirect to the GameScreen
          otherwise if there's a userKey in localStorage, redirect to the dashboard */}
          {gameId.length && <Redirect to={`/game/${gameId}`} /> && !userKey.length && <Redirect to={`/`} />}

        </Route>
        <Route
          path="/game/:id"
          render={({ match }) => {
            return <GameScreen gameId={match.params.id} userKey={userKey} userName={userName}/>
          }}
        ></Route>
        <Route render={() => {
          return <p>404</p>
        }}
        ></Route>

      </Switch>
    </>
  );
}

export default App;
