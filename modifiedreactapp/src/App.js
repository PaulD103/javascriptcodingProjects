import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router';

import Home from './pages/home/index.js';
import About from './pages/about/index.js';


function App() {
  return (
    <Router>
      <Route path="/home" component={Home}/>
      <Route path="/about" component={About}/>

      <Route exact path="" render={() => (
        <Redirect to="/home"/>
      )}/>
    </Router>
  );
}

export default App;
