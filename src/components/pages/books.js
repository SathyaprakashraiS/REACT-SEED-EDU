import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
// import Dispcards from './display';
import './css/books.css';
import GLogin from './log';
import Navbar from '../navbar';
import BookStruct from '../structures/BookStruct';
import { FaArrowLeft } from 'react-icons/fa';

function Book()
{
  const [book,setbook] = useState([]);
  const [api,setapi] = useState([false]);
  const [loading,setloading] = useState(false);
  
  const locdata = JSON.parse(localStorage.getItem('user'));
  const apilocdata = JSON.parse(localStorage.getItem('apiuser'));
  const userdata = JSON.parse(localStorage.getItem('theuser'));
  var apiavail=false;

  const { state } = ([])
  var authenticated=false;

  // try{
  //   state = this.props.location
  //   authenticated=true
  // }
  // catch{

  // }

  if(locdata!=null)
  {
    console.log("Authenticated")
    authenticated=true;
    console.log("api fetched userdata",apilocdata)
    //console.log("the signed in userdata is ",userdata)
    console.log("the signed in user is ",userdata.username)
  }
  else
  {
    console.log("Not Authenticated")
  }

  async function fetchData() {
    var apiavail=false;
    const request = await fetch(`http://127.0.0.1:8000/books-list/`)
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
        setbook(data)
        setloading(false)
        setapi(true)
      })
      .catch((error) => {
        console.log("the error ",error)
        setapi(false)
      });
    }

useEffect(() => {
  fetchData();
}, []);
if(api)
  {
    console.log("fetched from api")
    apiavail=true;
    console.log(apiavail)
  }
  else
  {
    console.log("treid fetching api not available")
    apiavail=false;
    console.log(apiavail)
  }

  let tog  = 0
  const closeWin = ()=>{
    let win = document.querySelector(".libmain")
    let reader = document.querySelector(".lib_reader")
    let but = document.querySelector(".libtog")
    if(tog===0){
      win.classList.add("moveout")
      reader.classList.add("fullmode")
      but.classList.add("turn")
      tog+=1
    }
    else{
      win.classList.remove("moveout")
      reader.classList.remove("fullmode")
      but.classList.remove("turn")
      tog = 0
    }
   
  }

  const readNow = (file)=>{
    let frame = document.querySelector(".lib_frame")
    frame.src = file
  }

  return(
    <div className="bhome">
    <Navbar />
    <div>
      {authenticated ? (
        <>
        {/* <p>username is {userdata.username}</p>
        <p>username is {userdata.standard}</p>
        <img src={userdata.img} alt="not found"/> */}
        </>
      ) : (
        <p></p>
      )}
    </div>
    
    {apiavail ? (
        <div className='lib_outer'>
      
      <div className="libmain">
      <div className="libhead">
        <h1>LIBRARY</h1>
        <button className="libtog" onClick={(e)=>closeWin()}><FaArrowLeft/></button>
    </div>
       
      {
      book.map(item => (
      <a key={item.id}>
        {/* <BookStruct img={item.image} subject={item.bgrade} name={item.name} author={item.author} file={item.file}/> */}
        <div className='lib_inner'>
          <div className='lib_image'>
            <img src={item.image}></img>
          </div>
          <div className='lib_info'>
            <p>{item.name}</p>
            <p>{item.author}</p>
            <button className='bt_read' onClick={(e)=>readNow(item.file)}> READ NOW</button>
          </div>
        </div>
      </a>
      ))
  
      }
      </div>
      <div className='lib_reader'>
        <iframe src="" className='lib_frame'></iframe>
      </div>
    
        </div>
      ) : (
        <p>no api to fetch from :(</p>
      )}
    </div>
    
  );
}

export default Book;