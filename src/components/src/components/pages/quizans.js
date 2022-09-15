import React,{useState,useEffect, Component } from 'react';
import './quizans.css';
import { GoogleLogout } from 'react-google-login';
import SNavbar from './snavbar';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Qans(){
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
      const quizid = JSON.parse(localStorage.getItem('quizid'));
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
      const [ans,setans] = useState([]);
      


      var attquizavail=false;
      async function fetchQuizans(stand) {
        var apiavail=false;
        var booklink=`http://127.0.0.1:8000/quizans-list/`+quizid+'/';
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
            setans(data)
            console.log(setans)
          })
          .catch((error) => {
            console.log("the error ",error)
          });
        }
        
            

              

                
    
    useEffect(() => {
      fetchQuizans();
    }, []);

      console.log(userdata)

          let center={
              marginLeft:'45%',
          };
          let crtans={
            color:'#00FF00',
          };
          let green={
            color:'#FFFFFF',
          };
          let question={
            color:'#000000',
          };

return(
    
    <div className="main">
    <SNavbar/>
    <div className="inmain">
    <h1 style={center}><b>|_o_|</b></h1>
    <button onClick={() => history.goBack()}>Go Back</button>
    <h1><b>{quizid} ANSWERS</b></h1>
    <div className="squiz">
    {
    ans.map(item => (
      <a key={item.id}>
        <p><b>QUESTION: </b><b style={question}>{item.cquestion}</b></p>
        {item.canswer==1 ? <b style={green}>A. <b style={crtans}>{item.coption1}</b></b>:<p><b>A. </b>{item.coption1}</p>}
        {item.canswer==2 ? <b style={green}>B. <b style={crtans}>{item.coption2}</b></b>:<p><b>B. </b>{item.coption2}</p>}
        {item.canswer==3 ? <b style={green}>C. <b style={crtans}>{item.coption3}</b></b>:<p><b>C. </b>{item.coption3}</p>}
        {item.canswer==4 ? <b style={green}>D. <b style={crtans}>{item.coption4}</b></b>:<p><b>D. </b>{item.coption4}</p>}
        {/* <p><b>A. </b>{item.coption1}</p>
        <p><b>B. </b>{item.coption2}</p>
        <p><b>C. </b>{item.coption3}</p>
        <p><b>D. </b>{item.coption4}</p> */}
        {/* <p><b>CORRECT OPTION: </b>{item.canswer}</p> */}
        
      </a>
      ))
    }
    </div>
    <br/><br/><br/>
    

    </div>
   
    </div>
    );
}

export default Qans;