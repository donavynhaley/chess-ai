import React, { useState } from 'react'
import { Game } from './components/pages/Game';
import PreviousGames from './components/pages/PreviousGames/PreviousGames'
import {
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
      <div className="app-container">
        <Switch>
          <Route exact path="/" ><Game isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /></Route>
          <Route path="/games" ><PreviousGames isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /></Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
