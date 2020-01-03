import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LandingPage from './components/LandingPage';
import MePage from './components/MePage';
import ResultPage from './components/ResultPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Instagreen</h1>
        </header>

        <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>

            <Route path="/me">
              <MePage />
            </Route>
            
            <Route path="/result/:name">
              <ResultPage />
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
