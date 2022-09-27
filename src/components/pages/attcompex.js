import { Prompt } from 'react-router'
import React,{useState,useEffect, Component } from 'react';
import './css/attcompex.css';
import { GoogleLogout } from 'react-google-login';
import SNavbar from './snavbar';
import axios from 'axios'; 
import { Link, Redirect, useHistory } from 'react-router-dom';
// import Warning from '../structures/Warning';

const Compexamination = () => {

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
      const comepxid=JSON.parse(localStorage.getItem('compexamid'));
      const comepxname=JSON.parse(localStorage.getItem('compexamname'));

      console.log(comepxid)
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
    
      const [questions,setquestions] = useState([]);
      const [att,setatt] = useState([]);
      let tc = 0;
    //   const [ansopt,setansopt] = useState([]);
      var optlist=[]
      var quesid=[]
      var attquizavail=false;

      async function fetchQuestions(stand) {
        var apiavail=false;
        var compexqueslink=`http://127.0.0.1:8000/comexquestion-list/`+comepxid;
        const request = await fetch(compexqueslink)
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
            setquestions(data)
            console.log(setquestions)
          })
          .catch((error) => {
            console.log("the error ",error)
          });
        }

        async function fetchAattended(stand) {
            var points=0
            var crt=0
            var wrong=0
          var attlink=`http://127.0.0.1:8000/Sattendedcompcheck/`+comepxid+'/'+userdata.email;
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
                tc=0;
                history.push("/student");
              }
              else
              {
                let form_data= new FormData();
                form_data.append('sname',userdata.username);
                form_data.append('semail',userdata.email);
                form_data.append('sgrade',userdata.standard);
                form_data.append('stest',comepxid);
                form_data.append('spoint',"tempo");
                let resurl=`http://127.0.0.1:8000/Scompexattresulttempo/`+userdata.username+'/'+comepxid+'/'+userdata.email+'/'+userdata.standard+'/'+comepxname;
                axios.post(resurl, form_data, {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                })
              }
            })
            .catch((error) => {
              console.log("the error ",error)
            });
          }
    
    useEffect(() => {
      fetchAattended();
      fetchQuestions();
    }, []);

    function submit(){
      let form_data= new FormData();
      console.log("size of quesid",quesid.length)
        var q=0
        var points=0
        var crt=0
        var wrong=0
        if(quesid.length==0)
        {
          points=0;
          crt=0;
          wrong=0;
          q=0;
        }
        else{
        for(var i=0;i<(questions.length);i++)
        {
            console.log("OVER HERE 1")
            console.log("checking",questions[i].id)
            console.log("quesid",quesid[q].id)
            if((quesid[q].id)==(questions[i].id))
            {
                console.log("OVER HERE 2")
                console.log("the correct answer",optlist[q].key)
                console.log("the chosen answer",questions[i].canswer)
                if((optlist[q].key)==(questions[i].canswer))
                {
                    console.log("OVER HERE 3")
                    points=points+4
                    crt=crt+1
                    q=q+1
                    console.log("correct")
                }
                else
                {
                    points=points-1
                    wrong=wrong+1
                    console.log("OVER HERE 4")
                    console.log("wrong answer")
                }
            }
        }
      }
        // addresult(points)

        form_data.append('sname',userdata.username);
        form_data.append('semail',userdata.email);
        form_data.append('sgrade',userdata.standard);
        form_data.append('stest',comepxid);
        form_data.append('spoint',points);
        let resurl=`http://127.0.0.1:8000/Scompexattresult/`+userdata.username+'/'+comepxid+'/'+userdata.email+'/'+userdata.standard+'/'+points+'/'+crt+'/'+wrong+'/'+comepxname;
        axios.post(resurl, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => alert("save agala"))

        alert(`YOU SCORED ${points}/${questions.length*4}`);
        alert("COMP EXAM SUBMITTED")
        history.push("/student");
      }
    function answer(id,key){
      console.log("IN OPTIONS SUBMITTED",{id},{key})
      // var i=0
      var flag=0
        if(quesid.length==0)
        {
          console.log("LENGTH 0")
            quesid.push({id})
            optlist.push({key})
        }
        else
        {
          console.log("HERE0 IN QUESID ELSE")
            for(var i=0;i<(quesid.length);i++)
            {
              console.log("LOOPING",i)
              // console.log("HERE1")
                if((quesid[i].id)==id)
                {
                  optlist[i].key=key
                  console.log("TESTING",quesid[i].id,id)
                  console.log("SAME KEY FOUND")
                  flag=1
                }
                
            }
            if(flag==0)
            {
              quesid.push({id})
              optlist.push({key})
            }
        }
    }
      console.log(userdata)


      let center={
          textAlign:"center",
          fontSize:"2em"
      };
   

      //for tab change
const [ts,setts] = useState(0)
var tsc = 0


useEffect(()=>{
  let check = document.querySelector(".aqmain")
  let warn_check = document.querySelector(".warn_model")
  // const ok= ()=>{
  //   let warn_check = document.querySelector(".warn_model")
  //   warn_check.classList.remove("show_warn")
  
  // }
  console.log(check)
  document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
      console.log("hello")
      // warn_check.classList.add("show_warn")
    } else {
     console.log("poda veliya")
     tsc++
     setts(ts+1)
     if(ts===3){
      // alert("You exceed the limit of tab switching..veliya poda ")
      history.push("/student");
     }
     console.log(tsc)
     warn_check.classList.add("show_warn")
     setInterval(() => {
      warn_check.classList.remove("show_warn")
     }, 6000);
    }


  });

// document.addEventListener("visibilitychange",(e)=>{
//   tsc = tsc + 1
//   console.log(tsc)
// })
})
    
     

     

        
      

  
      

return(
  <div className="aqmain">
  <div className="warn_model"><div className='warn_inner'>
    <p>TIMES YOU SWICHED TABS:COUNT {ts} <br></br>switching TABS more than 3 times</p>
  {/* <button Onclick={ok()}>OK</button> */}
  </div></div>
  {/* <SNavbar/> */}
  <div >
  <h1 style={center}><b>|_o_|</b></h1>
  <h1 style={center}><b>{comepxid}</b></h1>
  <form>
  <div className="qus">
  {
  questions.map(item => (
    <div className="qus_item">
        <b>{item.cquestion}</b>
    <a key={item.id}>
        {item.cimgadded?<><div className='ques_potti'><p>{item.cquestion}</p><img src="https://c.ndtvimg.com/2019-11/ask3nj1g_cbse-sample-question-paper_625x300_07_November_19.jpg"/></div><br/>
      </>:<></>}
      {/* <div className='ques_potti'><p>{item.cquestion}</p><img src="https://c.ndtvimg.com/2019-11/ask3nj1g_cbse-sample-question-paper_625x300_07_November_19.jpg"/></div><br/> */}
      <div className='quiz_potti_outer'>
      <div className='quiz_potti'><label className='optionq'><input type="radio" name={item.id} onClick={() => answer(item.id,1)}  />{item.coption1}</label><br /></div>
      <div className='quiz_potti'><label className='optionq'><input type="radio" name={item.id} onClick={() => answer(item.id,2)}  />{item.coption2}</label><br /></div>
      <div className='quiz_potti'><label className='optionq'><input type="radio" name={item.id} onClick={() => answer(item.id,3)}  />{item.coption3}</label><br /></div>
      <div className='quiz_potti'><label className='optionq'><input type="radio" name={item.id} onClick={() => answer(item.id,4)}  />{item.coption4}</label><br /></div>
      </div>
      {/* <p>A.<button className="optionq" onClick={() => answer(item.id,1)}><p>{item.coption1}</p></button></p>
      <p>B.<button className="optionq" onClick={() => answer(item.id,2)}><p>{item.coption2}</p></button></p>
      <p>C.<button className="optionq" onClick={() => answer(item.id,3)}><p>{item.coption3}</p></button></p>
      <p>D.<button className="optionq" onClick={() => answer(item.id,4)}><p>{item.coption4}</p></button></p> */}
      {/* <b>CORRECT ANSWER: OPTION {item.canswer}</b> */}
    </a>
    </div>
    ))
  }

  <div className="subbut">
  <button className="quiz_submit" onClick={() => submit()}>SUBMIT</button>
  <input type="reset" value="RESET"></input>
  </div>
 
  <br/><br/><br/>
  </div>
  </form>
  </div>
  </div>
  );
}

export default Compexamination;