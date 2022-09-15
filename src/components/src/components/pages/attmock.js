import React,{useState,useEffect, Component } from 'react';
import './shome.css';
import { GoogleLogout } from 'react-google-login';
import SNavbar from './snavbar';
import axios from 'axios';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Mock(){

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
      const quizid=JSON.parse(localStorage.getItem('quizid'));
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
    
      const [quiz,setquiz] = useState([]);
      const [att,setatt] = useState([]);
    //   const [ansopt,setansopt] = useState([]);
      var optlist=[]
      var quesid=[]
      var attquizavail=false;

      async function fetchQuiz(stand) {
        var apiavail=false;
        var booklink=`http://127.0.0.1:8000/quizans-list/`+quizid+'/';
        const request = await fetch(booklink)
          .then(response => {
            if(response.ok)
          {
            console.log("here")
            attquizavail=true;
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

        async function fetchAattended(stand) {
          var attlink=`http://127.0.0.1:8000/quizansatt-list/`+quizid+'/'+userdata.email+'/';
          const request = await fetch(attlink)
            .then(response => {
              if(response.ok)
            {
              attquizavail=true;
              return response.json(); 
            }
            else{
              console.log("im not here")
            }
          })
            .then(data => {
              setatt(data)
              if(data.length!=0)
              {
                alert("U CHEAT RELOAD PANRIYA DA BODYSODA");
                history.push("/student");
              }
            })
            .catch((error) => {
              console.log("the error ",error)
            });
          }

            function addresult(points) {
            var reslink=`http://127.0.0.1:8000/quizresult-list/`+userdata.username+'/'+userdata.email+'/'+userdata.standard+'/'+quizid+'/'+points+'/';
            const request = fetch(reslink)
              .then(response => {
                if(response.ok)
              {
                attquizavail=true;
                return response.json(); 
              }
              else{
                console.log("im not here")
              }
            })
            // .then(data => {
            //   alert("lo al");
            // })
            // .catch((error) => {
            //   console.log("the error ",error)
            // });


              // .then(data => {
              //   setatt(data)
              //   if(data.length!=0)
              //   {
              //     alert("U CHEAT RELOAD PANRIYA DA BODYSODA");
              //     history.push("/student");
              //   }
              // })
              // .catch((error) => {
              //   console.log("the error ",error)
              // });
            }
    
    useEffect(() => {
      fetchAattended();
      fetchQuiz();
    }, []);

    function submit(){
      let form_data= new FormData();
        var q=0
        var points=0
        for(var i=0;i<(quiz.length);i++)
        {
            console.log("OVER HERE 1")
            if(quesid[q].id==quiz[i].id)
            {
                console.log("OVER HERE 2")
                if(optlist[q].key==quiz[i].canswer)
                {
                    console.log("OVER HERE 3")
                    points=points+1
                    q=q+1
                    console.log("correct")
                }
                else
                {
                    console.log("OVER HERE 4")
                    console.log("wrong answer")
                }
            }
        }
        // addresult(points)
        form_data.append('sname',userdata.username);
        form_data.append('semail',userdata.email);
        form_data.append('sgrade',userdata.standard);
        form_data.append('stest',quizid);
        form_data.append('spoint',points);
        let resurl=`http://127.0.0.1:8000/quizrresult-list/`;
        axios.post(resurl, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
            .then(res => {
              console.log(res.data);
            })
            .catch(err => console.log(err))
      
        alert(`YOU SCORED ${points}/${quiz.length}`);
        alert("QUIZ SUBMITTED")
        history.push("/student");
      }
    function answer(id,key){
      console.log("IN OPTIONS SUBMITTED",{id},{key})
      var i=0
      // quesid.push({id})
      // optlist.push({key})
        if(quesid.length==0)
        {
            quesid.push({id})
            optlist.push({key})
        }
        else
        {
          // console.log("HERE0")
            for(i=0;i<(quesid.length);i++)
            {
              // console.log("HERE1")
                if(quesid[i].id==id)
                {
                  optlist[i].key=key
                  // console.log("SAME KEY FOUND",key,optlist[i].key)
                }
                // else
                // {
                //   quesid.push({id})
                //   optlist.push({key})
                // }
            }
        }
        // for(var i=0;i<(quesid.length);i++)
        // {
        //     if(quesid[i]==id)
        //     {
        //         optlist[i]=key
        //     }
        //     else
        //     {
        //         quesid.push({id})
        //         optlist.push({key})
        //     }
        // }
        // quesid.push({id})
        // optlist.push({key})
        // alert(`id and key is : ${id} = ${key}`);

        // console.log("QUES ID: ",quesid,"OPTIONS",optlist)
    }
      console.log(userdata)
      
        let content = {
            marginLeft: '220px',
            paddingBottom:'100px',
            // width: '250px',
            // height: '250px',
            backgroundColor: 'yellow',
          };
          let page = {
            // marginLeft: '220px',
            width: '100%',
            height: '100%',
            backgroundColor: 'red',
          };
          let center={
              marginLeft:'45%',
          };
          let allcard={
              width:'20%',
              display: "flex",
              flexDirection: "row",
          };
return(
    
    <>
    <SNavbar/>
    <div style={content}>
    <h1 style={center}><b>|_o_|</b></h1>
    <h1 style={center}><b>{quizid}</b></h1>
    
    {
    quiz.map(item => (
      <a key={item.id}>
        <b>{item.cquestion}</b><br/>
        <p>A.<button onClick={() => answer(item.id,1)}><b>{item.coption1}</b></button></p>
        <p>B.<button onClick={() => answer(item.id,2)}><b>{item.coption2}</b></button></p>
        <p>C.<button onClick={() => answer(item.id,3)}><b>{item.coption3}</b></button></p>
        <p>D.<button onClick={() => answer(item.id,4)}><b>{item.coption4}</b></button></p>
        <b>CORRECT ANSWER: OPTION {item.canswer}</b>
      </a>
      ))
    }
    <p><button onClick={() => submit()}>SUBMIT</button></p>
    <br/><br/><br/>
    
    </div>
    </>
    );
}

export default Mock;