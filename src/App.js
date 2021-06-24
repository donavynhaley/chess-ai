import React from 'react'
import { Game } from './components/pages/Game';
import PreviousGames from './components/pages/PreviousGames/PreviousGames'
import {
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
function App() {



  return (
    <>
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={Game} />
          <Route path="/games" component={PreviousGames} />
        </Switch>
      </div>
    </>
  );
}

export default App;
