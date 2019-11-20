import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LandingPage from './components/LandingPage';
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
            <Route path="/result/:name">
              <ResultPage />
            </Route>

            <Route path="/">
              <LandingPage />
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
