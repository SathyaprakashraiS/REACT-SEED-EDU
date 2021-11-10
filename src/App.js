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
import Acollege from './components/pages/Acollege';
import Tcollege from './components/pages/Tcollege';
import Dcollege from './components/pages/Dcollege';
import Scollege from './components/pages/Scollege';
import Ccollege from './components/pages/Ccollege';
import Coursecollege from './components/pages/Coursecollege';
import Course from './components/pages/course';
import Arts from './components/pages/arts';
import Science from './components/pages/science';
import Engineering from './components/pages/engineering';
import Commerce from './components/pages/commerce';
import Procourse from './components/pages/procourse';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/home/' exact component={Home} />
        <Route path='/colleges/' exact component={College} />
        <Route path='/colleges/allcolleges' exact component={Acollege} />
        <Route path='/colleges/topcolleges' exact component={Tcollege} />
        <Route path='/colleges/degreecolleges' exact component={Dcollege} />
        <Route path='/colleges/statecolleges' exact component={Scollege} />
        <Route path='/colleges/citycolleges' exact component={Ccollege} />
        <Route path='/colleges/coursecolleges' exact component={Coursecollege} />
        <Route path='/courses' exact component={Course} />
        <Route path='/courses/arts' exact component={Arts} />
        <Route path='/courses/science' exact component={Science} />
        <Route path='/courses/engineering' exact component={Engineering} />
        <Route path='/courses/commerce' exact component={Commerce} />
        <Route path='/courses/procourse' exact component={Procourse} />
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
