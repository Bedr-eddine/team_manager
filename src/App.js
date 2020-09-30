import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Liste from './components/Liste';
import Equipe from './components/Equipe';

function App() {
  return (
    <div className="App">
      <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/liste' component={Liste} />
                <Route exact path='/equipe/:id' component={Equipe} />
    
            </Switch>
        </Router>
    </div>
  );
}

export default App;
