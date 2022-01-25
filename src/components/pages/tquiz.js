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

    const [book,setbook] = useState([]);
    const [delbook,setdelbook] = useState([]);
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
        form_data.append('cgrade',userdata.standard);
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
    function createbook()
    {
      console.log('Bgrade:',bgrade);
      console.log('Name:',name);
      console.log('Subject:',subject);
      console.log('Details:',details);
      console.log('Review:',review);
      console.log('Rating:',rating);
      console.log('Image',selectedimg);    
      console.log('Author:',author);
      console.log('File',selectedFile);
      console.log('addedby:',userdata.username);
      let form_data= new FormData();
      form_data.append('bgrade',bgrade);
      form_data.append('name',name);
      form_data.append('subject',subject);
      form_data.append('details',details);
      form_data.append('review',review);
      form_data.append('rating',rating);
      form_data.append('image',selectedimg);
      form_data.append('author',author);
      form_data.append('file',selectedFile);
      form_data.append('addby',userdata.email);
      let resurl=`http://127.0.0.1:8000/addbook-list/`;
      axios.post(resurl, form_data,
        {
          headers:
          {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data);
          alert('BOOK HAS BEEN ADDED!')
          history.push("/teacher/");
        })
        .catch(err => {
          console.log(err)
          alert('RE-CHECK THE BOOK DETAILS, FAILED TO ADD BOOK TO THE SHELF')
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
            console.log("here trying to fetch")
            return response.json(); 
          }
          else{
            fetchQuiz();
            console.log("im not here")
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
          if(book.length>0)
          {
            setbookpresent(true);
          }
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
                setbook(data)
                setloading(false);
                history.push('/teacher/');
              })
              .catch((error) => {
                setloading(false);
              });
              if(book.length>0)
              {
                setbookpresent(true);
              }
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
                setdelbook(data)
                setdelloading(false);
              })
              .catch((error) => {
                setdelloading(false);
              });
              if(delbook.length>0)
              {
                setdelbookpresent(true);
              }
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
                setbook(data)
                setloading(false);
                history.push('/teacher/');
              })
              .catch((error) => {
                setloading(false);
              });
              if(book.length>0)
              {
                setbookpresent(true);
              }
          }

        function selectquiz(theid)
        {
          alert(theid);
          localStorage.setItem('modquiz',JSON.stringify(theid));
          history.push('CRUD');
        }

    async function fetchBook(stand) {
      var booklink=`http://127.0.0.1:8000/tbook-list/`+userdata.email+'/';
      const request = await fetch(booklink)
        .then(response => {
          if(response.ok)
        {
          console.log("here trying to fetch")
          return response.json(); 
        }
        else{
          fetchBook();
          console.log("im not here")
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
        if(book.length>0)
        {
          setbookpresent(true);
        }
      }

      async function fetchDelBook(stand) {
        var booklink=`http://127.0.0.1:8000/tresbook-list/`+userdata.email+'/';
        const request = await fetch(booklink)
          .then(response => {
            if(response.ok)
          {
            console.log("here trying to fetch")
            return response.json(); 
          }
          else{
            fetchDelBook();
            console.log("im not here")
          }
        })
          .then(data => { 
            setdelbook(data)
            setdelloading(false);
            console.log(setdelbook)
          })
          .catch((error) => {
            console.log("the error ",error)
            setdelloading(false);
          });
          if(delbook.length>0)
          {
            setdelbookpresent(true);
          }
        }

    async function deletebook(theid){
      alert(theid);
      let resurl=`http://127.0.0.1:8000/tdelbook-list/`+userdata.email+'/'+theid+`/`;
      const request = await fetch(resurl)
        .then(response => {
          if(response.ok)
        {
          return response.json(); 
        }
        else{
          fetchBook();
        }
      })
        .then(data => { 
          setbook(data)
          setloading(false);
        })
        .catch((error) => {
          setloading(false);
        });
        if(book.length>0)
        {
          setbookpresent(true);
        }
    }

    async function restorebook(theid){
      alert(theid);
      let resurl=`http://127.0.0.1:8000/tdelbook-list/`+userdata.email+'/'+theid+`/`;
      const request = await fetch(resurl)
        .then(response => {
          if(response.ok)
        {
          return response.json(); 
        }
        else{
          fetchDelBook();
        }
      })
        .then(data => { 
          setdelbook(data)
          setdelloading(false);
        })
        .catch((error) => {
          setdelloading(false);
        });
        if(delbook.length>0)
        {
          setdelbookpresent(true);
        }
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
        <label><b>Enter quiz name:</b>
        <input
          type="text" 
          value={Qname}
          onChange={(e) => setQname(e.target.value)}
        />
        </label><br/>
        <label><b>Author:</b>{userdata.username}
        </label><br/>
        <label><b>Standard:</b>{userdata.standard}
        </label><br/>
        <button onClick={() => createquiz()}>ADD QUIZ</button>



        <h1>UPDATE QUIZ</h1>


        <h1>REMOVE QUIZ</h1>
          {(!loading) && (book.length>0) ?
          <>
          {
            book.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                  <p>name: {item.cname}</p>
                  <p>grade: {item.cgrade}</p>
                  <a href={item.file}>View Quiz</a>
                  <br/>
                  <button onClick={() => deletequiz(item.id)}>DELETE QUIZ</button>
                </div>
              </a>
              ))
            }
          </>:<>{loading?<p>Cruising the shelves</p>:<p>no quiz available add quiz to delete</p>}</>}

          <h1>RESTORE DELETED QUIZ</h1>
          {(!delloading) && (delbook.length>0) ?
          <>
          {
            delbook.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                  <p>name: {item.cname}</p>
                  <p>grade: {item.cgrade}</p>
                  <a href={item.file}>View Quiz</a>
                  <br/>
                  <button onClick={() => restorequiz(item.id)}>RESTORE QUIZ</button>
                </div>
              </a>
              ))
            }
          </>:<>{delloading?<p>Minning the Bin</p>:<p>no quiz deleted previously</p>}</>}

          <h1>SELECT QUIZ TO ALTER QUESTIONS IN IT</h1>
          {(!loading) && (book.length>0) ?
          <>
          {
            book.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                  <p>name: {item.cname}</p>
                  <p>grade: {item.cgrade}</p>
                  <a href={item.file}>View Quiz</a>
                  <br/>
                  <button onClick={() => selectquiz(item.id)}>VIEW QUIZ</button>
                </div>
              </a>
              ))
            }
          </>:<>{loading?<p>Cruising the shelves</p>:<p>no quiz available add quiz to alter question</p>}</>}
    </div>
</div>
    );
}

export default Tquiz;
