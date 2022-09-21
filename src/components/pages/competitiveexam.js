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

    function attendexam(theid){
        localStorage.setItem('compexamid',JSON.stringify(theid));
        history.push("/student/compwarn/");
    } 

    async function fetchexamname(){
        var apiavail=false;
        const request = await fetch(`http://127.0.0.1:8000/Scompexamlist/`+userdata.standard)
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
    var attquizavail=false;
      
    useEffect(() => {
        fetchexamname();
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
        <button onClick={() => attendexam(item.id)}>take test</button>
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
      
      </div>
      </div>
      );
  }

export default CompetitiveElilst;