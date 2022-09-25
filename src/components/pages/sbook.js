import React,{useState,useEffect, Component } from 'react';
import './shome.css';
import { GoogleLogout } from 'react-google-login';
import SNavbar from './snavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Sbook(){
  let history = useHistory();
  

    const logout = ()=>{
        localStorage.clear(); //for localStorage
        sessionStorage.clear(); //for sessionStorage
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
      const [book,setbook] = useState([]);
      var apiavail=false;
      
      async function fetchBook(stand) {
        var apiavail=false;
    var burl=`http://127.0.0.1:8000/sbook-list/`+userdata.standard+'/';
    const request = await fetch(burl)
      .then(response => {
        if(response.ok)
      {
        console.log("here")
        apiavail=true;
        console.log(apiavail)
        return response.json(); 
      }
      else{
        console.log("im not here")
        apiavail=false;
        console.log(apiavail)
      }
    })
      .then(data => {
        setbook(data)
        apiavail=true;
      })
      .catch((error) => {
        console.log("the error ",error)
        apiavail=false;
      });
        }

    useEffect(() => {
      fetchBook();
    }, []);

    if(book){
      apiavail=true
    }
    else{
      apiavail=false
    }
      console.log(userdata)
          let center={
              marginLeft:'45%',
          };
return(
    
    <div className="main">
    <SNavbar/>
    <div className="inmain">
    <h1 style={center}><b>|_o_|</b></h1>
    <h1><b>GRADED BOOKS</b></h1>
    {apiavail ? (
        <div  style={{
          marginLeft:"100px"
        }} >
        <div className="sbook">
        {
        book.map(item => (
          <a key={item.id}>
            <div >
            <BookStruct name={item.name} img={item.image} author={item.author} subject={item.subject} file={item.file}/>
            </div>
          </a>
          ))
        }
        </div>
        <br/><br/><br/>
        </div>
    ):(
        <>
        <h1>RACKS ARE EMPTY, LIBRARY MAY BE CLOSED VISIT US LATER...</h1>
        </>
    )}
    
    </div>
    </div>
    );
}
export default Sbook;