import React,{useState,useEffect, Component } from 'react';
import './shome.css';
import { GoogleLogout } from 'react-google-login';

import SNavbar from './snavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Student(){
  let history = useHistory();
  function viewquizans(theid)
  {
    localStorage.setItem('quizid',JSON.stringify(theid));
    history.push("/student/quizans/");
  }
  function viewmockans(theid)
  {
    localStorage.setItem('mockid',JSON.stringify(theid));
    history.push("/student/mockans/");
  }
  function attemptquiz(theid)
  {
    // localStorage.removeItem(quizid);
    localStorage.setItem('quizid',JSON.stringify(theid));
    history.push("/student/attquiz/");
  }
  function attemptmock(theid,thename)
  {
    // localStorage.removeItem(quizid);
    localStorage.setItem('mockid',JSON.stringify(theid));
    localStorage.setItem('mockname',JSON.stringify(thename));
    history.push("/student/attmock/");
  }

    const logout = ()=>{
        localStorage.clear(); //for localStorage
        sessionStorage.clear(); //for sessionStorage
        // window.location.reload(false);
        return(
            <Redirect to="/"/>
        )
      }
      const userdata = JSON.parse(localStorage.getItem('theuser'));
      var teacher=false
      var student=false
      if(userdata)
      {
          console.log("userdata.is_staff is ",userdata.is_staff)
        if(userdata.is_staff == true)
      {
          teacher=true
          console.log("teacher here")
      }
      if(userdata.is_staff == false){
          student=true
          console.log("student here")
      }
      }
      const [book,setbook] = useState([]);
      const [quiz,setquiz] = useState([]);
      const [attquiz,setattquiz] = useState([]);
      const [mock,setmock] = useState([]);
      const [attmock,setattmock] = useState([]);
      


      var attquizavail=false;
      async function fetchBook(stand) {
        var apiavail=false;
        var booklink=`http://127.0.0.1:8000/sbooks-list/`+userdata.standard+'/';
        const request = await fetch(booklink)
          .then(response => {
            if(response.ok)
          {
            console.log("here")
            apiavail=true;
            return response.json(); 
          }
          else{
            console.log("im not here")
          }
        })
          .then(data => { 
            setbook(data)
            console.log(setbook)
          })
          .catch((error) => {
            console.log("the error ",error)
          });
        }
        async function fetchQuiz(stand) {
            var apiavail=false;
            var quizlink=`http://127.0.0.1:8000/quiz-list/`+userdata.standard+'/'+userdata.email+'/';
            const request = await fetch(quizlink)
              .then(response => {
                if(response.ok)
              {
                console.log("here")
                apiavail=true;
                return response.json(); 
              }
              else{
                console.log("im not here")
              }
            })
              .then(data => {
                setquiz(data)
                console.log(setquiz)
              })
              .catch((error) => {
                console.log("the error ",error)
              });
            }
            async function fetchAttquiz(stand) {
              var attquizlink=`http://127.0.0.1:8000/attquiz-list/`+userdata.email+'/';
              const request = await fetch(attquizlink)
                .then(response => {
                  if(response.ok)
                {
                  console.log("here")
                  return response.json(); 
                }
                else{
                  console.log("im not here")
                }
              })
                .then(data => {
                  setattquiz(data)
                  attquizavail=true
                  console.log("setattquiz: ",setattquiz)
                })
                .catch((error) => {
                  console.log("the error ",error)
                });
              }

              async function fetchMock(stand) {
                var apiavail=false;
                var mocklink=`http://127.0.0.1:8000/mock-list/`+userdata.standard+'/'+userdata.email+'/';
                const request = await fetch(mocklink)
                  .then(response => {
                    if(response.ok)
                  {
                    console.log("here")
                    apiavail=true;
                    return response.json(); 
                  }
                  else{
                    console.log("im not here")
                  }
                })
                  .then(data => { 
                    setmock(data)
                    console.log(setmock)
                  })
                  .catch((error) => {
                    console.log("the error ",error)
                  });
                }

                async function fetchAttMock(stand) {
                  var apiavail=false;
                  var attmocklink=`http://127.0.0.1:8000/attmock-list/`+userdata.standard+'/'+userdata.email+'/';
                  console.log("ASDASDASDASDASDASDASDASDASDASDASDASDASDASDasd",attmocklink)
                  const request = await fetch(attmocklink)
                    .then(response => {
                      if(response.ok)
                    {
                      console.log("here")
                      apiavail=true;
                      return response.json(); 
                    }
                    else{
                      console.log("im not here")
                    }
                  })
                    .then(data => { 
                      setattmock(data)
                      console.log(setattmock)
                    })
                    .catch((error) => {
                      console.log("the error ",error)
                    });
                  }
    
    useEffect(() => {
      fetchBook();
      fetchQuiz();
      fetchAttquiz();
      fetchMock();
      fetchAttMock();
    }, []);

      console.log(userdata)
      
        // let content = {
        //     marginLeft: '220px',
          
        //     backgroundColor: 'yellow',
        //   };
        //   let page = {
           
        //     width: '100%',
        //     height: '100%',
        //     backgroundColor: 'red',
        //   };
          let center={
              marginLeft:'45%',
          };
//           let allcard={
//               width:'20%',
//               display: "flex",
//               flexDirection: "row",
//           };
//           let bookcard={
            
//             width:'500px',
//           };
//           let bookimg={
//             height:'250px',
//             width:'250px',
//           };
//           let quizcard={
//             width:'200px',
//           };
return(
    
    <div className="main">
    <SNavbar/>
    {/* <div style={page}> */}
    {/* {userdata.standard} */}
    <div className="inmain">
    <h1 style={center}><b>|_o_|</b></h1>
    <h1><b>BOOKS</b></h1>
    <div className="sbook">
    {
    book.map(item => (
      <a key={item.id}>
        <div >
        <BookStruct name={item.name} img={item.image} author={item.author} subject={item.subject} file={item.file}/>
        </div>
          {/* <div style={bookcard}>
        <img style={bookimg} src={item.image}/><br/>
        <b>{item.name}</b><br/>
        <b>{item.author}</b><br/>
        <b>{item.subject}</b>
        </div> */}
      </a>
      ))
    }
    </div>
    <br/><br/><br/>
    <h1><b>QUIZ</b></h1>
    <div className="qmain">
    {
    quiz.map(item => (
      <a key={item.id}>
          <div className="qcard">
        <b>{item.cname}</b><br/>
        <b>{item.author}</b><br/>
        <b>{item.cgrade}</b><br/>
        <button onClick={() => attemptquiz(item.cname)}>attempt quiz</button>
        </div>
      </a>
      ))
    }
    </div>
    <br/><br/><br/>
    {/* {attquizavail ? (
      <>
      <h1><b>ATTEMPTED QUIZ</b></h1>
      <div style={allcard}>
      {
      attquiz.map(item => (
        <a key={item.id}>
          <div style={quizcard}>
          <b>{item.stest}</b><br/>
          <b>{item.spoint}</b><br/>
          <button>view answer</button>
          </div>
        </a>
        ))
      }
      </div>
      </>
    ):(
      <>
      <h1>NO QUIZ ATTEMPTED</h1>
      </>
    )} */}
    <h1><b>ATTEMPTED QUIZ</b></h1>
      <div className="qmain">
      {
      attquiz.map(item => (
        <a key={item.id}>
          <div className="qcard">
          <b>{item.stest}</b><br/>
          <b>{item.spoint}</b><br/>
          <button onClick={() => viewquizans(item.stest)}>view answer</button>
          </div>
        </a>
        ))
      }
      </div>
    
      <h1><b>MOCKEXAMS</b></h1>
      <div className="qmain">
      {
      mock.map(item => (
        <a key={item.id}>
          <div className="qcard">
          <b>{item.mockpapername}</b><br/>
          <b>{item.paperdescription}</b><br/>
          <b>{item.totalmarks}</b><br/>
          <button onClick={() => attemptmock(item.id,item.mockpapername)}>ATTEMPT EXAM</button>
          </div>
        </a>
        ))
      }
      </div>

      <h1><b>ATTEMPTED MOCKEXAMS</b></h1>
      <div className="qmain">
      {
      attmock.map(item => (
        <a key={item.id}>
          <div className="qcard">
          <b>{item.testname}</b><br/>
          <b>MARK OBTAINED: {item.markobtained}</b><br/>
          <b>TOTAL MARKS: {item.totalmarks}</b><br/>
          <button onClick={() => viewmockans(item.id)}>VIEW ANSWER SHEET</button>
          </div>
        </a>
        ))
      }
      </div>
  
    </div>
    {/* </div> */}
    {/* <ulsn>
        <lisn>
            <img class="profile" src={userdata.img}/>
        </lisn>
        <lisn>
            <h1>{userdata.username}</h1>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/"><b>HOME</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="#"><b>COLLEGES</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="#"><b>BOOKS</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="#"><b>EXAMS</b></a>
        </lisn>
        <lisn>
            <a class="nav-link"  href="#"><b>NEWS</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="#"><b>COURSES</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="#"><b>QUESTION BANK</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="#"><b>STUD PORTAL</b></a>
        </lisn>
    </ulsn> */}

    {/* <nav className="navbar">
            <ul>
                <li className='nav-item'>
                    <Link to="/" className="navbar-links">
                        HOME
                    </Link>
                    <Link to="/book" className="navbar-links">
                        BOOK
                    </Link>
                    <Link to="/" className="navbar-links">
                        EXAM
                    </Link>
                    <Link to="/" className="navbar-links">
                        QUESTION BANK
                    </Link>
                    <Link to="/" className="navbar-links">
                        RESULTS
                    </Link>
                    <Link to="/news" className="navbar-links">
                        NEWS
                    </Link>
                    <Link to="/" className="navbar-links" onClick={logout}>
                        LOGOUT
                    </Link>
                </li>
            </ul>
    </nav> */}
    </div>
    );
}

export default Student;