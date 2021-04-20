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
  const [activeGame, setActiveGame] = useState<string>('')
  let history = useHistory()

  useEffect(() => {
    const activeUser = localStorage.getItem('chessAdventureName') || ''
    const activeKey = localStorage.getItem('chessAdventureKey') || ''
    setUserName(activeUser)
    setUserKey(activeKey)
  }, [])

  useEffect(() => {
    if (gameId !== '') {
      history.push(`/game/${gameId}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId])

  const goToLogin = () => {
    history.push(`/`)
  }

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
            return <Dashboard
              user={userName}
              setGameId={setGameId}
              userKey={userKey}
              activeGame={activeGame}
            />
          }}
        >
          {gameId.length && <Redirect to={`/game/${gameId}`} /> && !userKey.length && <Redirect to={`/`} />}
        </Route>
        <Route
          path="/game/:id"
          render={({ match }: any) => {
            return userKey.length > 0 ?
              <GameScreen
                setActiveGame={setActiveGame}
                setGameId={setGameId}
                gameId={match.params.id}
                userKey={userKey}
                userName={userName}
              /> :
              <div className="game-loading-screen-container">
                <p>Hang on, we're setting up the game board!</p>
                <p>If you see this screen for more than a few seconds,
                  <br></br>
                  please <button onClick={goToLogin} className="go-to-login">click here to log in</button> or refresh the page.</p>
              </div>

          }}
        >
        </Route>
        <Route render={() => {
          return <p>404</p>
        }}
        ></Route>
      </Switch>
    </>
  );
}

export default App;
