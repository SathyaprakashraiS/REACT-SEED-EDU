import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
import './css/competitiveexam.css';
import SNavbar from './snavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function CompetitiveElilst(){
    let history = useHistory();

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
    
    const [exams,setexams] = useState([]);
    const [attexams,setattexams] = useState([]);

    function attendexam(theid,thename){
        localStorage.setItem('compexamid',JSON.stringify(theid));
        localStorage.setItem('compexamname',JSON.stringify(thename));
        history.push("/student/compwarn/");
    } 
    function viewans(theid){
      localStorage.setItem('compexansid',JSON.stringify(theid));
        history.push("/student/compexans/");
    }

    async function fetchexamname(){
        var apiavail=false;
        const request = await fetch(`http://127.0.0.1:8000/Scompexamlist/`+userdata.standard+'/'+userdata.email)
          .then(response => {
            if(response.ok)
          {
            console.log("here")
            console.log(apiavail)
            apiavail=true;
            return response.json(); 
          }
          else{
            console.log("im not here")
            console.log(apiavail)
          }
        })
          .then(data => {
            setexams(data)
            //setloading(false)
            //setapi(true)
          })
          .catch((error) => {
            console.log("the error ",error)
            //setapi(false)
          });
        }

        async function fetchattendexams(){
          var apiavail=false;
          const request = await fetch(`http://127.0.0.1:8000/Sattcompexamlist/`+userdata.email)
            .then(response => {
              if(response.ok)
            {
              console.log("here")
              console.log(apiavail)
              apiavail=true;
              return response.json(); 
            }
            else{
              console.log("im not here")
              console.log(apiavail)
            }
          })
            .then(data => {
              setattexams(data)
            })
            .catch((error) => {
              console.log("the error ",error)
            });
          }

    var attquizavail=false;
      
    useEffect(() => {
        fetchexamname();
        fetchattendexams();
    }, []);
  
    console.log(userdata)
    let center=
    {
        marginLeft:'45%',
    };
    
  return(
      
      <div className="main">
      <SNavbar/>
      
      <div className="inmain">
      <h1 style={center}><b>|_o_|</b></h1>
      <b>EXAMS TO ATTEND</b>
      {exams.length>0 ? 
    <div className="cmain">
    {
    exams.map(item => (
    <a key={item.id}>
        <b>exam name:{item.cname}</b><br/>
        <p>totalmarks:{item.totalmarks}</p>
        {item.negativemarkings?<>
        <p>marks are deducted for wrong answer</p>
        </>:<>
        <p>no marks are deducted for wrong answer</p>
        </>
        }
        <p>total examination time:{item.time}</p>
        <button onClick={() => attendexam(item.id,item.cname)}>take test</button>
        {/* <button onClick={() => gotochat(item.id)}>view group</button>
        <button onClick={() => deletechat(item.id)}>delete group</button> */}
        <br></br>
    </a>
    ))
    }
    </div>
    :
    <p>No exam available to attend</p>
    }
      <b>ATTENDED COMPETITEV EXAMS</b>
      {attexams.length>0 ? 
    <div className="cmain">
    {
    attexams.map(item => (
    <a key={item.id}>
        <b>exam name:{item.stestname}</b><br/>
        <p>scoredmarks:{item.spoint}</p>
        <button onClick={() => viewans(item.stest)}>VIEW ANS</button>
        {/* <button onClick={() => gotochat(item.id)}>view group</button>
        <button onClick={() => deletechat(item.id)}>delete group</button> */}
        <br></br>
    </a>
    ))
    }
    </div>
    :
    <p>No exam attended to view</p>
    }
      </div>
      </div>
      );
  }

export default CompetitiveElilst;