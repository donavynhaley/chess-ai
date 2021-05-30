import React from 'react'
import './App.css';
import NavBar from './components/common/NavBar'
import LandingPage from './components/pages/LandingPage'
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
