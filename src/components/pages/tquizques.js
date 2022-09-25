import React,{useState,useEffect, Component } from 'react';
import './tquizques.css';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';
import TNavbar from './tnavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function TMquiz(){
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
    const [quizques,setquizques] = useState([]);
    const [delbook,setdelbook] = useState([]);
    const [loading,setloading] = useState([true]);
    const [question,setquestion] = useState([""]);
    const [option1,setoption1] = useState([""]);
    const [option2,setoption2] = useState([""]);
    const [option3,setoption3] = useState([""]);
    const [option4,setoption4] = useState([""]);
    const [answer,setanswer] = useState([""]);

    const [updquizques,setupdquizques] = useState([]);
    const [updloading,setupdloading] = useState([true]);
    const [updquestion,setupdquestion] = useState([""]);
    const [updoption1,setupdoption1] = useState([""]);
    const [updoption2,setupdoption2] = useState([""]);
    const [updoption3,setupdoption3] = useState([""]);
    const [updoption4,setupdoption4] = useState([""]);
    const [updanswer,setupdanswer] = useState([""]);
    
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
            setquizques(data)
            setloading(false);
          })
          .catch((error) => {
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
                setquizques(data)
                setloading(false);
                localStorage.removeItem('modquiz');
                history.push('/teacher/');
              })
              .catch((error) => {
                setloading(false);
              });
          }

        async function updatequizques(theid)
        {
          alert(theid)
          let updquiz=`http://127.0.0.1:8000/Tupdatequizquesdata/`+theid+`/`;
          const request = await fetch(updquiz)
          .then(response => {
          if(response.ok)
          {
            return response.json(); 
          }
        })
        .then(data => { 
          setupdquizques(data)
          setupdloading(true);
        })
        .catch((error) => {
          setupdloading(false);
        });
        }

        async function postupdate(theid,thegrade)
        {
          alert(theid)
          let form_data= new FormData();
          form_data.append('testgrade',thegrade);
          if(updquestion!="")
          {
            form_data.append('cquestion',updquestion);
          }
          if(updoption1!="")
          {
            form_data.append('coption1',updoption1);
          }
          if(updoption2!="")
          {
            form_data.append('coption2',updoption2);
          }
          if(updoption3!="")
          {
            form_data.append('coption3',updoption3);
          }
          if(updoption4!="")
          {
            form_data.append('coption4',updoption4);
          }
          if(updanswer!="")
          {
            form_data.append('canswer',updanswer);
          }
          let resurl=`http://127.0.0.1:8000/Tpostupdatedquizquesdata/`+theid+'/';
          axios.post(resurl, form_data,
          {
            headers:
            {
              'content-type': 'multipart/form-data'
            }
          })
          .then(res => {
            console.log(res.data);
            alert('QUESTION HAS BEEN UPDATED!')
            history.push("/teacher/");
          })
          .catch(err => {
            console.log(err)
            alert('RE-CHECK THE ENTERED QUESTION DETAILS, FAILED TO UPDATE QUESTION TO THE QUIZ')
          })
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
        <h1 style={center}><b>TEACHER PORTAL</b></h1>

        <h1>ADD QUESTION TO QUIZ</h1>
        <div className='quiz_qadd'>
          <div className='quiz_question'>
          <label><b>Enter question:</b>
        <input
          type="text"  
          value={question}
          onChange={(e) => setquestion(e.target.value)}
        />
        </label>
          </div>
          <div className='quiz_options'><label><b>Enter option1:</b>
        <input
          type="text" 
          value={option1}
          onChange={(e) => setoption1(e.target.value)}
        />
        </label></div>
          <div className='quiz_options'>
          <label><b>Enter option2:</b>
        <input
          type="text" 
          value={option2}
          onChange={(e) => setoption2(e.target.value)}
        />
        </label>
          </div>
          <div className='quiz_options'>
          <label><b>Enter option3:</b>
        <input
          type="text" 
          value={option3}
          onChange={(e) => setoption3(e.target.value)}
        />
        </label>
          </div>
          <div className='quiz_options'>
          <label><b>Enter option4:</b>
        <input
          type="text" 
          value={option4}
          onChange={(e) => setoption4(e.target.value)}
        />
        </label>
          </div>
       
        <div className='quiz_optans'> <label>Enter answer option:
        <input
          type='number'
          step="1"
          min='1'
          max='4'
          value={answer}
          onChange= {(e) => setanswer(e.target.value)}
        />
        </label></div>
       <br/>
        <button onClick={() => addquestion()}>ADD QUESTION</button>
        </div>
        {(updloading) && (updquizques.length>0) ? <>
        <h1>DETAILS TO UPDATE QUESTION</h1>
        {
          updquizques.map(item => (
          <a key={item.id}>
            <div classname="dispbook">
            <label><b>Enter question:</b>
        <input
          type="text" 
          value={updquestion}
          onChange={(e) => setupdquestion(e.target.value)}
        />
        </label><br/>
        <label><b>Enter option1:</b>
        <input
          type="text" 
          value={updoption1}
          onChange={(e) => setupdoption1(e.target.value)}
        />
        </label><br/>
        <label><b>Enter option2:</b>
        <input
          type="text" 
          value={updoption2}
          onChange={(e) => setupdoption2(e.target.value)}
        />
        </label><br/>
        <label><b>Enter option3:</b>
        <input
          type="text" 
          value={updoption3}
          onChange={(e) => setupdoption3(e.target.value)}
        />
        </label><br/>
        <label><b>Enter option4:</b>
        <input
          type="text" 
          value={updoption4}
          onChange={(e) => setupdoption4(e.target.value)}
        />
        </label><br/>
        <label>Enter answer option:
        <input
          type='number'
          step="1"
          min='1'
          max='4'
          value={updanswer}
          onChange= {(e) => setupdanswer(e.target.value)}
        />
        </label><br/>
              <button onClick={() => postupdate(item.id,item.testgrade)}>UPDATE QUESTION</button>
            </div>
          </a>
          ))
        }
        </>:<></>}

        <h1>SELECT QUESTION TO UPDATE IT</h1>
        {(!loading) && (quizques.length>0) ?
          <>
          {
            quizques.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                  <p>question: {item.cquestion}</p>
                  <p>option1: {item.coption1}</p>
                  <p>option2: {item.coption2}</p>
                  <p>option3: {item.coption3}</p>
                  <p>option4: {item.coption4}</p>
                  <p>answer: {item.canswer}</p>
                  <button onClick={() => updatequizques(item.id)}>UPDATE QUESTION</button>
                </div>
              </a>
              ))
            }
          </>:<>{loading?<p>Cruising the shelves</p>:<p>no quiz available add quiz to delete</p>}</>}

        <h1>REMOVE QUESTION FROM QUIZ</h1>
          {(!loading) && (quizques.length>0) ?
          <>
          {
            quizques.map(item => (
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

export default TMquiz;
