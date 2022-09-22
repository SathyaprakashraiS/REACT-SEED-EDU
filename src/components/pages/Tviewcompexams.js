import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
import TNavbar from './tnavbar';
import './css/Tviewcompexams.css';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Tviewcompexam(){
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
      
    function gotocompex(theid){
        localStorage.setItem('compexansid',JSON.stringify(theid));
        history.push("/teacher/compexans/");
    }

    const [compexamlist,setcompexamlist] = useState([]);

    async function getallcompexams(){
        var apiavail=false;
        var allexamlinks=`http://127.0.0.1:8000/Tallcompexam-list/`;
        const request = await fetch(allexamlinks)
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
            setcompexamlist(data)
          })
          .catch((error) => {
            console.log("the error ",error)
          });
        }

    useEffect(() => {
        getallcompexams();
    }, []);
  
    console.log(userdata)
    let center=
    {
        marginLeft:'45%',
    };
    
  return(
      
      <div className="main">
      <TNavbar/>
      
      <div className="inmain">
      <h1 style={center}><b>|_o_|</b></h1>
      <p><b>COMPETITIVE EXAMS AVAILABLE FOR GRADE 10</b></p>
      {
      compexamlist.map(item => (
      <a key={item.id}>
        {item.cgrade=="10"?<>
        <p><b>NAME:{item.cname}</b></p>
        <p><b>TOTAL MARKS:{item.totalmarks}</b></p>
        {
        item.negativemarkings?<>
        <p><b>WRONGS ANSWERS ARE AWARDED WITH -1 POINTS</b></p>
        </>:<>
        <p><b>NO NEGATIVE MARKING</b></p>
        </>
        }
        <button onClick={() => gotocompex(item.id)}>VIEW EXAM</button>
        <br></br></>:<></>
        }
        </a>
        ))    
        }
        <br/>
      <p><b>COMPETITIVE EXAMS AVAILABLE FOR GRADE 11</b></p>
      {
      compexamlist.map(item => (
      <a key={item.id}>
        {item.cgrade=="11"?<>
        <p><b>NAME:{item.cname}</b></p>
        <p><b>TOTAL MARKS:{item.totalmarks}</b></p>
        {
        item.negativemarkings?<>
        <p><b>WRONG ANSWERS ARE AWARDED -1 POINTS</b></p>
        </>:<>
        <p><b>NO NEGATIVE MARKING</b></p>
        </>
        }
        <button onClick={() => gotocompex(item.id)}>VIEW EXAM</button>
        <br></br></>:<></>
        }
        </a>
        ))    
        }
        <br/>
      <p><b>COMPETITIVE EXAMS AVAILABLE FOR GRADE 12</b></p>
      {
      compexamlist.map(item => (
      <a key={item.id}>
        {item.cgrade=="12"?<>
        <p><b>NAME:{item.cname}</b></p>
        <p><b>TOTAL MARKS:{item.totalmarks}</b></p>
        {
        item.negativemarkings?<>
        <p><b>WRONGS ANSWERS ARE AWARDED WITH -1 POINTS</b></p>
        </>:<>
        <p><b>NO NEGATIVE MARKING</b></p>
        </>
        }
        <button onClick={() => gotocompex(item.id)}>VIEW EXAM</button>
        </>:<></>
        }
        </a>
        ))    
        }
        <br/>
      <p><b>SUGGESTION FOR ADDING COMPETITIVE EXAMS</b></p>
      <label><p>ENTER THE EXAM NAME THAT YOU WOULD WANT US TO ADD:
                <input
                  type="text" 
                //   value={updclink}
                //   onChange={(e) => setupdclink(e.target.value)}
                /></p>
                </label>
                <label><p>ENTER THE GRADE FOR WHICH THAT EXAM IS CONDUCTED FOR:
                <input
                  type="text" 
                //   value={updclink}
                //   onChange={(e) => setupdclink(e.target.value)}
                /></p>
                </label>
      </div>
      </div>
      );
  }

export default Tviewcompexam;