import { Switch, Route } from 'react-router-dom';
import './App.css';
import Splash from '../Splash/Splash'

const App: React.FC = () => {
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
            return <p>Welcome {match.params.user}</p>
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
