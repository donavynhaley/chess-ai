import React from 'react'
import NavBar from './components/common/NavBar'
import { Game } from './components/pages/Game';
import {
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
function App() {
  <Switch>
    <Route path="/play" component={App} />
  </Switch>


  return (
    <>
      <NavBar />
      <div className="app-container">
        <Game />
      </div>
    </>
  );
}

export default App;
