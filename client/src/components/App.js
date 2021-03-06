import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Meters from './pages/Meters';
import Data from './pages/Data';
import About from './pages/About';
import Navbar from './Navbar/Navbar';
import './App.css';


// import vega
// var vega = require('vega');
// Documentation at: https://vega.github.io/vega/usage/





function App() {
  return (
    <div className='App'>
      <div className='container'>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} /> {/* "exact" needs to be on root to enable all routes*/}
            <Route path="/meters" component={Meters} />
            <Route path="/data" component={Data} />
            <Route path="/about" component={About} />
          </Switch>
        </Router>        
      </div>
    </div>
  );
}

export default App;
