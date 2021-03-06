import '../../App.css';
import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
// import Dispcards from './display';
import './css/rnotes.css';
import GLogin from './log';
import Navbar from '../navbar';
import { Link, Redirect,useHistory } from 'react-router-dom';

function Rnotes()
{
    let history = useHistory();
  const [notes,setnotes] = useState([]);
  const [api,setapi] = useState([false]);
  const [loading,setloading] = useState(false);
  const [sub,setSub] = useState([])
  const [sname,setsname] = useState('')

  
  
  const locdata = JSON.parse(localStorage.getItem('user'));
  const apilocdata = JSON.parse(localStorage.getItem('apiuser'));
  const userdata = JSON.parse(localStorage.getItem('theuser'));
  var apiavail=false;


  const SortCity = (subn) =>{
    const subs = []
    var csubn = subn.toLowerCase()
    setsname(subn)
    console.log(sub)
    console.log("hello")
    // console.log(cname)
   
    for(var i in notes){
      // console.log(college[i].city)
        if(notes[i].sub === subn){
            console.log(notes[i].sub)
            subs.push(notes[i])
            console.log(typeof(sub))
            
        }
        else if(notes[i].sub === csubn){
          subs.push(notes[i])
        }
       
        
    }
   
    setSub(subs)
   
    

}

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

  function redirectto(id) {
    alert(`hello, ${id}`);
    localStorage.setItem('notesid',JSON.stringify(id));
  //   return(
  //     <Redirect to="/"/>
  // )
    history.push("/revnotes/rnotesdisp/");
    // history.push({
    //   pathname: '/rnotes/rnotesdisp/',
    //   state: papersfetched // your data array of objects
    // })
  }

  async function fetchData() {
    var apiavail=false;
    const request = await fetch(`http://127.0.0.1:8000/rnotes-list/`)
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
        setnotes(data)
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
    <div className="revmain">
    <Navbar />
    <h1>REVISION NOTES</h1>

   
    {apiavail ? (
        <><p>{api}</p>
             <div className="srev">
                  <h4>SEARCH NOTES BY SUBJECT:</h4>
                    <input type="input " id="colle" onChange={ (event) => SortCity(event.target.value) }></input>
                    <h3>Books for {sname}</h3>
                    {/* <button onClick={SortCity}>Search</button> */}
                
                    <div className="revcard">
      {
      
      sub.map(item => (
      <a key={item.id}>
        <div className="inrev">
        <img src={item.thumbnail}/>
        <b>{item.title}</b>
        <b>{item.sub}</b>
        <b>{item.grade}</b>
        <a href={"http://127.0.0.1:8000"+item.file}>READ</a>
        <br></br><br></br>
        </div>
      </a>
      ))
     
  
      }
      </div> 
                    
                </div>
       <div className="revcard">
      {
      notes.map(item => (
      <a key={item.id}>
        <div className="inrev">
        <img src={item.thumbnail}/>
        <b>{item.title}</b>
        <b>{item.sub}</b>
        <b>{item.grade}</b>
        {/* {item.file} */}
        <a href={"http://127.0.0.1:8000"+item.file}>READ</a><br></br><br></br>
        </div>
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

export default Rnotes;