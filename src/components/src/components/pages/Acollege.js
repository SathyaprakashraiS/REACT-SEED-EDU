
import React,{useState,useEffect, Component, } from 'react';
import axios from 'axios';
// import Dispcards from './display';
import './css/Acollege.css';
import GLogin from './log';
import Navbar from '../navbar';
import AllCollege from '../structures/AllCollege';
import ReactDOM from 'react-dom';
import { Input } from 'reactstrap';
import loadimage from './images/ROCKET.gif'


function Acollege()
{
  const [college,setcollege] = useState([]);
  const [api,setapi] = useState([false]);
  const [loading,setloading] = useState(true);
  const [city,setCity] = useState([])
  const [cname,setcname] = useState('')
  const cools = []


  
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
  

  const SortCity = (vcity) =>{
    setcname(vcity)
    console.log(city)
    console.log("hello")
    // console.log(cname)
   
    for(var i in college){
      // console.log(college[i].city)
        if(college[i].city === vcity){
            console.log(college[i].name)
            cools.push(college[i].name)
            console.log(typeof(city))
            
        }
        else if(college[i].state === vcity){
          cools.push(college[i].name)
        }
        else if(college[i].name === vcity){
          cools.push(college[i].name)
        }
        
    }
    setCity(cools)
    console.log(cools)
}


  async function fetchData() {
    var apiavail=false;
    const request = await fetch(`http://127.0.0.1:8000/acollege-list/`)
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
        setcollege(data)
        setTimeout(function() {
          setloading(false);
       }, 1000); 
        
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
    <>
    {
      loading ?(
        // <img src="https://i.pinimg.com/originals/92/96/f7/9296f70fce1ae3f298e0d085c17f6a3f.gif" alt="Not found" />
        <img className="loadImage" src={loadimage} alt="Not found" />
      ) :(
        <>
        <Navbar />
        <div>
          {authenticated ? (
            <>
    
            </>
          ) : (
            <p></p>
          )}
        </div>
        <div className="centertext">
        <a href="/colleges/" >Go back</a>
        <h1>ALL COLLEGES IN INDIA</h1>
        </div>
        {apiavail ? (
            <><p>{api}</p>
                
                <div>
                  <h4>SEARCH COLLEGE BY ENTERING CITY OR STATE:</h4>
                    <input type="input " id="colle" onChange={ (event) => SortCity(event.target.value) }></input>
                    <h3>Colleges in {cname}</h3>
                    {/* <button onClick={SortCity}>Search</button> */}
                    <div>
                      
                    {
                      city.map(item=>(
                        <a>
                          <p>{item}</p>
                        </a>
                      ))
                    }
                      
                      
                    </div>
                    
                </div>
            <div className="header">
           <p>Name</p>
           <p>City</p>
           <p>State</p>
           <p>Rating</p>
           </div>
          {
          college.map(item => (
          <a key={item.id}>
              
              <AllCollege data={item} name={item.name} city={item.city} state={item.state} rating={item.rating}/>
          {/* {item.name}
          {item.city}
          {item.state}
          {item.rating}  */}
          </a>
          ))
    }
    
            </>
          ) : (
            <p>no api to fetch from :(</p>
          )}
        </>
      )
    }
    </>
   
    
  );
}

export default Acollege;