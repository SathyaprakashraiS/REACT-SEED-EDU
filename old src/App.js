import './App.css';
import Navbar from './components/navbar';
import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './components/pages/home';
import Book from './components/pages/books';
import GLogin from './components/pages/log';
import NewHome from './components/pages/newhome';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/book' exact component={Book} />
        <Route path='/login' exact component={GLogin} />
        <Route path='/newhome' exact component={NewHome} />
      </Switch>
    </Router>
  );
}

export default App;
