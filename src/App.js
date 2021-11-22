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
import Date from './components/pages/dates';
import Quesbank from './components/pages/quesbank';
import Quesbankdisp from './components/pages/quesbankdisp';
import FAQ from './components/pages/FAQ';
import Rnotes from './components/pages/rnotes';
import Rnotesdisp from './components/pages/rnotesdisp';
import Tips from './components/pages/tips';
import Ocourses from './components/pages/onlinecourse';
import Video from './components/pages/video';
import Qans from './components/pages/quizans';
import Quiz from './components/pages/attquiz';
import Mockans from './components/pages/mockans';
import Mock from './components/pages/mock';
import Qwarn from './components/pages/quizwarner';
import Mwarn from './components/pages/mockwarner';

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
        <Route path='/dates' exact component={Date} />
        <Route path='/student' exact component={Student} />
        <Route path='/teacher' exact component={Teacher} />
        <Route path='/questionbank' exact component={Quesbank} />
        <Route path='/questionbank/quespapers' exact component={Quesbankdisp} />
        <Route path='/FAQ' exact component={FAQ} />
        <Route path='/revnotes' exact component={Rnotes} />
        <Route path='/revnotes/rnotesdisp' exact component={Rnotesdisp} />
        <Route path='/tips' exact component={Tips} />
        <Route path='/ocourses' exact component={Ocourses} />
        <Route path='/video' exact component={Video} />
        <Route path='/student/quizans' exact component={Qans} />
        <Route path='/student/attquiz' exact component={Quiz} />
        <Route path='/student/qwarn' exact component={Qwarn} />
        <Route path='/student/mockans' exact component={Mockans} />
        <Route path='/student/mwarn' exact component={Mwarn} />
        <Route path='/student/attmock' exact component={Mock} />
      </Switch>
    </Router>
  </>
  );
}

export default App;
