import { Switch, Route } from 'react-router-dom';
import './App.css';
import Splash from '../Splash/Splash'
import Dashboard from '../Dashboard/Dashboard'
import GameScreen from '../GameScreen/GameScreen'


const App = () => {
  return ( 
    <>
      <Switch>
        <Route 
          exact
          path="/"
          component={Splash}
        ></Route>
        <Route
          exact
          path="/dashboard/:user"
          render={({match}) => {
            return <Dashboard user={match.params.user}/>
          }}
        ></Route>
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
