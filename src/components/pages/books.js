
import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
// import Dispcards from './display';
import './css/books.css';
import GLogin from './log';
import Navbar from '../navbar';
import BookStruct from '../structures/BookStruct';

function Disp()
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
        <p>Login panra dei</p>
      )}
    </div>
    <div className="centertext">
    <h1>BOOKS</h1>
    </div>
    {apiavail ? (
        <><p>{api}</p>
        
      <div className="libmain">
      {
      book.map(item => (
      <a key={item.id}>
        {/* <libStruct img={item.img} name={item.name} /> */}
        <BookStruct img={item.image} subject = {item.bgrade}name={item.name} author={item.author} file={item.file}/>
        {/* <img src={item.image}/>
        <b>{item.name}</b>
        <b>{item.author}</b>
        <b>{item.bgrade}</b><br></br> */}
      </a>
      ))
  
      }
      </div>
    
        </>
      ) : (
        <p>no api to fetch from :(</p>
      )}
    </div>
    
  );
}

export default Disp;