import './App.css';
import Navbar from './components/navbar';
import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './components/pages/home';
import Book from './components/pages/books';
import GLogin from './components/pages/log';
import NewHome from './components/pages/newhome';
import News from './components/pages/news';
import Student from './components/pages/shome';
import Teacher from './components/pages/thome';
import College from './components/pages/college';
function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/home/' exact component={Home} />
        <Route path='/colleges/' exact component={College} />
        <Route path='/book' exact component={Book} />
        <Route path='/login' exact component={GLogin} />
        <Route path='/newhome' exact component={NewHome} />
        <Route path='/news' exact component={News} />
        <Route path='/student' exact component={Student} />
        <Route path='/teacher' exact component={Teacher} />
      </Switch>
    </Router>
  </>
  );
}

export default App;
