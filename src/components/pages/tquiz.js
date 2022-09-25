import React,{useState,useEffect, Component } from 'react';
import './tquiz.css';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';
import TNavbar from './tnavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Tquiz(){
  let history = useHistory();
  const logout = ()=>{
      localStorage.clear(); //for localStorage
      sessionStorage.clear(); //for sessionStorage
      return(
        <Redirect to="/"/>
        )
    }

    const [Qname,setQname] = useState([]);
    const [updquiz,setupdquiz] = useState([]);
    const [updloading,setupdloading] = useState([false]);
    const [updname, setupdname] = useState("");
    const [updgrade, setupdgrade] = useState("");

    const [quiz,setquiz] = useState([]);
    const [delquiz,setdelquiz] = useState([]);
    const [grade, setgrade] = useState("");
    const [loading,setloading] = useState([true]);
    const [delloading,setdelloading] = useState([true]);
    const [bookpresent, setbookpresent] = useState(false);
    const [delbookpresent, setdelbookpresent] = useState(false);
    const [bgrade, setBgrade] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [details, setDetails] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [author, setAuthor] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [selectedimg, setSelectedimg] = useState();
    const [isimgPicked, setIsimgPicked] = useState(false);
    const fileHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);        
      };
    const imageHandler = (event) => {
        setSelectedimg(event.target.files[0]);
        setIsimgPicked(true);        
      };
    
    function createquiz()
    {
        let form_data= new FormData();
        form_data.append('cname',Qname);
        form_data.append('author',userdata.email);
        form_data.append('cgrade',grade);
        const thetrue=true;
        form_data.append('visible',thetrue);
        let resurl=`http://127.0.0.1:8000/Taddquiz-list/`;
        axios.post(resurl, form_data,
        {
          headers:
          {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data);
          alert('QUIZ HAS BEEN ADDED!')
          history.push("/teacher/");
        })
        .catch(err => {
          console.log(err)
          alert('RE-CHECK THE QUIZ DETAILS, FAILED TO ADD QUIZ TO THE GUIDE')
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
    
    async function fetchQuiz(stand) {
        var booklink=`http://127.0.0.1:8000/Tquiz-list/`+userdata.email+'/';
        const request = await fetch(booklink)
          .then(response => {
            if(response.ok)
          {
            // console.log("here trying to fetch")
            return response.json(); 
          }
          else{
            fetchQuiz();
            // console.log("im not here")
          }
        })
          .then(data => { 
            setquiz(data)
            setloading(false);
          })
          .catch((error) => {
            // console.log("the error ",error)
            setloading(false);
          });
          // if(quiz.length>0)
          // {
          //   setbookpresent(true);
          // }
        }

        async function deletequiz(theid){
            alert(theid);
            let resurl=`http://127.0.0.1:8000/Tdelquiz-list/`+userdata.email+'/'+theid+`/`;
            const request = await fetch(resurl)
              .then(response => {
                if(response.ok)
              {
                return response.json(); 
              }
              else{
                fetchQuiz();
              }
            })
              .then(data => { 
                setquiz(data)
                setloading(false);
                history.push('/teacher/');
              })
              .catch((error) => {
                setloading(false);
              });
              // if(book.length>0)
              // {
              //   setbookpresent(true);
              // }
          }

          async function restorequizlist(){
            let resurl=`http://127.0.0.1:8000/Trestorequiz-list/`+userdata.email+`/`;
            const request = await fetch(resurl)
              .then(response => {
                if(response.ok)
              {
                return response.json(); 
              }
              else{
                restorequizlist();
              }
            })
              .then(data => { 
                setdelquiz(data)
                setdelloading(false);
              })
              .catch((error) => {
                setdelloading(false);
              });
              // if(delquiz.length>0)
              // {
              //   setdelbookpresent(true);
              // }
          }

          async function restorequiz(theid){
            alert(theid);
            let resurl=`http://127.0.0.1:8000/Trestorequiz-list/`+userdata.email+'/'+theid+`/`;
            const request = await fetch(resurl)
              .then(response => {
                if(response.ok)
              {
                return response.json(); 
              }
              else{
                restorequiz(theid);
              }
            })
              .then(data => { 
                setquiz(data)
                setloading(false);
                history.push('/teacher/');
              })
              .catch((error) => {
                setloading(false);
              });
              // if(quiz.length>0)
              // {
              //   setbookpresent(true);
              // }
          }

        function selectquiz(theid)
        {
          alert(theid);
          localStorage.setItem('modquiz',JSON.stringify(theid));
          history.push('CRUD');
        }

    // async function fetchBook(stand) {
    //   var booklink=`http://127.0.0.1:8000/tbook-list/`+userdata.email+'/';
    //   const request = await fetch(booklink)
    //     .then(response => {
    //       if(response.ok)
    //     {
    //       console.log("here trying to fetch")
    //       return response.json(); 
    //     }
    //     else{
    //       fetchBook();
    //       console.log("im not here")
    //     }
    //   })
    //     .then(data => { 
    //       setbook(data)
    //       setloading(false);
    //       console.log(setbook)
    //     })
    //     .catch((error) => {
    //       console.log("the error ",error)
    //       setloading(false);
    //     });
    //     if(book.length>0)
    //     {
    //       setbookpresent(true);
    //     }
    //   }

      // async function fetchDelBook(stand) {
      //   var booklink=`http://127.0.0.1:8000/tresbook-list/`+userdata.email+'/';
      //   const request = await fetch(booklink)
      //     .then(response => {
      //       if(response.ok)
      //     {
      //       console.log("here trying to fetch")
      //       return response.json(); 
      //     }
      //     else{
      //       fetchDelBook();
      //       console.log("im not here")
      //     }
      //   })
      //     .then(data => { 
      //       setdelbook(data)
      //       setdelloading(false);
      //       console.log(setdelbook)
      //     })
      //     .catch((error) => {
      //       console.log("the error ",error)
      //       setdelloading(false);
      //     });
      //     if(delbook.length>0)
      //     {
      //       setdelbookpresent(true);
      //     }
      //   }

      async function updatequiz(theid)
      {
        alert(theid);
        let bupdurl=`http://127.0.0.1:8000/Tupdatequizdata/`+theid+`/`;
        const request = await fetch(bupdurl)
        .then(response => { 
          if(response.ok)
          {
            return response.json(); 
          }
        })
        .then(data => { 
          setupdquiz(data)
          setupdloading(true);
        })
        .catch((error) => {
          setupdloading(false);
        });
      }

      function postupdate(theid)
      {
        alert(theid)
        let form_data= new FormData();
        if(updname!="")
        {
          form_data.append('cname',updname);
        }
        if(updgrade!="")
        {
          form_data.append('cgrade',updgrade);
        }
        const thetrue=true;
        form_data.append('visible',thetrue);
        let resurl=`http://127.0.0.1:8000/Tpostupdatedquizdata/`+theid+'/';
        axios.post(resurl, form_data,
        {
          headers:
          {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data);
          alert('QUIZ DETAILS HAS BEEN UPDATED!')
          history.push("/teacher/");
        })
        .catch(err => {
          console.log(err)
          alert('RE-CHECK THE QUIZ DETAILS, FAILED TO UPDATE QUIZ TO THE SHELF')
        })
      }

    useEffect(() => {
      fetchQuiz();
      restorequizlist();
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

        <h1>ADD QUIZ</h1>
        <div className='qh_main'>
          <div className='qh_inner'>
          <label><b>Enter quiz name:</b>
        <input 
          type="text" 
          value={Qname}
          onChange={(e) => setQname(e.target.value)}
        />
        </label>
        <label><b>quiz for grade:</b>
          <select onChange={(e) => setgrade(e.target.value)}>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </label>
          </div>
   
          <button onClick={() => createquiz()}>ADD QUIZ</button>
        </div>
      
        {/* <label><b>Author:</b>{userdata.username}
        </label><br/>
        <label><b>Standard:</b>{userdata.standard}
        </label><br/> */}
       

        {(updloading) && (updquiz.length>0)?
        <>
          <h1>UPDATE QUIZ DETAILS</h1>
          {
            updquiz.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                <div className='qh_main'>
              <div className='qh_inner'>  
                <label><b>change quiz name:</b>
                <input
                  type="text" 
                  value={updname}
                  onChange={(e) => setupdname(e.target.value)}
                />
                </label>
                <label><b>quiz for grade:</b>
                <select onChange={(e) => setupdgrade(e.target.value)}>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
                </label>
                </div>
                  <button onClick={() => postupdate(item.id)}>UPDATE QUIZ DETAILS</button>
                  
                  </div>
                </div>
              </a>
              ))
            }
        </>:<></>}

        <h1>UPDATE QUIZ</h1>
        {(!loading) && (quiz.length>0) ?
          <>
          {
            quiz.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                  <div className='update_quiz_data'>
                  <p>name: {item.cname}</p>
                  <p>grade: {item.cgrade}</p>
                  <a href={item.file}>View Quiz</a>
                  <br/>
                  <button onClick={() => updatequiz(item.id)}>UPDATE QUIZ</button>
                  </div>
                 
                </div>
              </a>
              ))
            }
          </>:<>{loading?<p>Cruising the shelves</p>:<><p>no quiz created by you were found,</p><p>add quiz to update</p></>}</>}

        <h1>REMOVE QUIZ</h1>
          {(!loading) && (quiz.length>0) ?
          <>
          {
            quiz.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                <div className='remove_quiz_data'>
                  <p>name: {item.cname}</p>
                  <p>grade: {item.cgrade}</p>
                  <b><a href={item.file}>View Quiz</a></b>
                  <br/>
                  <button onClick={() => deletequiz(item.id)}>REMOVE QUIZ</button>
                  </div>
                </div>
              </a>
              ))
            }
          </>:<>{loading?<p>Cruising the shelves</p>:<><p>no quiz created by you were found,</p><p>add quiz to delete</p></>}</>}

          <h1>RESTORE DELETED QUIZ</h1>
          {(!delloading) && (delquiz.length>0) ?
          <>
          {
            delquiz.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                <div className='update_quiz_data'>
                  <p>name: {item.cname}</p>
                  <p>grade: {item.cgrade}</p>
                  <a href={item.file}>View Quiz</a>
                  <br/>
                  <button onClick={() => restorequiz(item.id)}>UPDATE QUIZ</button>
                  </div>
                </div>
              </a>
              ))
            }
          </>:<>{delloading?<p>Minning the Bin</p>:<><p>no quiz deleted by you were found,</p><p>delete quiz to restore them</p></>}</>}

          <h1>SELECT QUIZ TO ALTER QUESTIONS IN IT</h1>
          {(!loading) && (quiz.length>0) ?
          <>
          {
            quiz.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                <div className='update_quiz_data'>
                  <p>name: {item.cname}</p>
                  <p>grade: {item.cgrade}</p>
                  <a href={item.file}>View Quiz</a>
                  <br/>
                  <button onClick={() => selectquiz(item.id)}>UPDATE QUES</button>
                  </div>
                </div>
              </a>
              ))
            }
          </>:<>{loading?<p>Cruising the shelves</p>:<><p>no quiz created by you were found,</p><p>create quiz to alter questions</p></>}</>}
    </div>
</div>
    );
}

export default Tquiz;
