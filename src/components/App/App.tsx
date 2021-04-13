import { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Splash from '../Splash/Splash'
import Dashboard from '../Dashboard/Dashboard'
import GameScreen from '../GameScreen/GameScreen'


const App = () => {

  const [userName, setUserName] = useState<string>('')
  const [userKey, setUserKey] = useState<string>('')

useEffect(() => {
  const activeUser = localStorage.getItem('chessAdventureName') || ''
  const activeKey = localStorage.getItem('chessAdventureKey') || ''
  setUserName(activeUser)
  setUserKey(activeKey)
}, [])

  return ( 
    <>
      <Switch>
        <Route 
          exact
          path="/"
          render={() => { return <Splash setUserName={setUserName} setUserKey={setUserKey} />}}
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
