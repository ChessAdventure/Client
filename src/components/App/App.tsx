import { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Splash from '../Splash/Splash'
import Dashboard from '../Dashboard/Dashboard'
import GameScreen from '../GameScreen/GameScreen'
import { ActionCableConsumer } from 'react-actioncable-provider'

const App = () => {

  const [userName, setUserName] = useState<string>('')
  const [userKey, setUserKey] = useState<string>('')
  const [gameData, handleReceivedGame] = useState<string[]>([])

  useEffect(() => {
    const activeUser = localStorage.getItem('chessAdventureName') || ''
    const activeKey = localStorage.getItem('chessAdventureKey') || ''
    setUserName(activeUser)
    setUserKey(activeKey)

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
    
  }, [userName])


  return (
    <>
      <ActionCableConsumer
        channel={{ channel: 'friendlyGamesChannel' }}
        onRecieved={handleReceivedGame}
        // pass apiKey when handleRecievedGame is called
        // move to game component
      />
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
            return <Dashboard user={userName} />
          }}
        >
          {!userKey.length && <Redirect to={`/`} />}
        </Route>
        <Route
          path="/game/:id"
          render={({ match }) => {
            return <GameScreen id={match.params.id} />
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
