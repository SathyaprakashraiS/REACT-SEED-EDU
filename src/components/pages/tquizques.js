import React,{useState,useEffect, Component } from 'react';
import './tquiz.css';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';
import TNavbar from './tnavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Tquiz(){
  let history = useHistory();
  const quizid = JSON.parse(localStorage.getItem('modquiz'));
  const logout = ()=>{
      localStorage.clear(); //for localStorage
      sessionStorage.clear(); //for sessionStorage
      return(
        <Redirect to="/"/>
        )
    }

    const [Qname,setQname] = useState([]);
    //const [quizid,setquizid] = useState([]);
    const [book,setbook] = useState([]);
    const [delbook,setdelbook] = useState([]);
    const [loading,setloading] = useState([true]);
    const [question,setquestion] = useState([""]);
    const [option1,setoption1] = useState([""]);
    const [option2,setoption2] = useState([""]);
    const [option3,setoption3] = useState([""]);
    const [option4,setoption4] = useState([""]);
    const [answer,setanswer] = useState([]);
    
    function addquestion()
    {
        let form_data= new FormData();
        form_data.append('testgrade',quizid);
        form_data.append('cquestion',question);
        form_data.append('coption1',option1);
        form_data.append('coption2',option2);
        form_data.append('coption3',option3);
        form_data.append('coption4',option4);
        form_data.append('canswer',answer);
        let resurl=`http://127.0.0.1:8000/Taddquizques-list/`+userdata.email+'/'+quizid+'/';
        axios.post(resurl, form_data,
        {
          headers:
          {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data);
          alert('QUESTION ADDED SUCCESSFULLY!')
          fetchQuizques();
          localStorage.removeItem('modquiz');
          history.push('/teacher/quiz/')
        })
        .catch(err => {
          console.log(err)
          alert('RE-CHECK THE QUESTION DATA, FAILED TO ADD QUESTION TO THE QUIZ')
        })
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
        if(userdata.is_staff == false)
        {
            student=true
            console.log("student here")
        }
    }
    
    async function fetchQuizques(stand) {
        var booklink=`http://127.0.0.1:8000/Tquizques-list/`+userdata.email+'/'+quizid+'/';
        const request = await fetch(booklink)
          .then(response => {
            if(response.ok)
          {
            console.log("here trying to fetch")
            return response.json(); 
          }
          else{
            fetchQuizques();
          }
        })
          .then(data => { 
            setbook(data)
            setloading(false);
            console.log(setbook)
          })
          .catch((error) => {
            console.log("the error ",error)
            setloading(false);
          });
        }

        async function deletequizques(theid){
            alert(theid);
            let resurl=`http://127.0.0.1:8000/Tdelquizques-list/`+userdata.email+'/'+quizid+'/'+theid+`/`;
            const request = await fetch(resurl)
              .then(response => {
                if(response.ok)
              {
                return response.json(); 
              }
              else{
                fetchQuizques();
              }
            })
              .then(data => { 
                setbook(data)
                setloading(false);
                localStorage.removeItem('modquiz');
                history.push('/teacher/');
              })
              .catch((error) => {
                setloading(false);
              });
          }

        
    useEffect(() => {
        fetchQuizques();
    }, []);
    console.log(userdata)
    
    let center={
        marginLeft:'38%',
    };
    let centerlol={
        marginLeft:'45%',
    };

return(

<div className="main">
    <TNavbar/>
    <div className="inmain">
        <h1 style={centerlol}><b>|_o_|</b></h1>
        <h1 style={center}><b>TEACHER PORTAL</b></h1>
        <br/><br/><br/>

        <h1>ADD QUESTION TO QUIZ</h1>
        <label><b>Enter question:</b>
        <input
          type="text" 
          value={question}
          onChange={(e) => setquestion(e.target.value)}
        />
        </label><br/>
        <label><b>Enter option1:</b>
        <input
          type="text" 
          value={option1}
          onChange={(e) => setoption1(e.target.value)}
        />
        </label><br/>
        <label><b>Enter option2:</b>
        <input
          type="text" 
          value={option2}
          onChange={(e) => setoption2(e.target.value)}
        />
        </label><br/>
        <label><b>Enter option3:</b>
        <input
          type="text" 
          value={option3}
          onChange={(e) => setoption3(e.target.value)}
        />
        </label><br/>
        <label><b>Enter option4:</b>
        <input
          type="text" 
          value={option4}
          onChange={(e) => setoption4(e.target.value)}
        />
        </label><br/>
        <label>Enter asnwer option:
        <input
          type='number'
          step="1"
          min='1'
          max='4'
          value={answer}
          onChange= {(e) => setanswer(e.target.value)}
        />
        </label><br/>
        <button onClick={() => addquestion()}>ADD QUESTION</button>



        <h1>REMOVE QUESTION FROM QUIZ</h1>
          {(!loading) && (book.length>0) ?
          <>
          {
            book.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                  <p>question: {item.cquestion}</p>
                  <p>option1: {item.coption1}</p>
                  <p>option2: {item.coption2}</p>
                  <p>option3: {item.coption3}</p>
                  <p>option4: {item.coption4}</p>
                  <p>answer: {item.canswer}</p>
                  <button onClick={() => deletequizques(item.id)}>DELETE QUESTION</button>
                </div>
              </a>
              ))
            }
          </>:<>{loading?<p>Cruising the shelves</p>:<p>no quiz available add quiz to delete</p>}</>}
    </div>
</div>
    );
}

export default Tquiz;
