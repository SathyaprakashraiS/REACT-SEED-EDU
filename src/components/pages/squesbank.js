import React,{useState,useEffect, Component } from 'react';
import './shome.css';
import { GoogleLogout } from 'react-google-login';
import SNavbar from './snavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function SQB(){
  let history = useHistory();
  

    const logout = ()=>{
        localStorage.clear(); //for localStorage
        sessionStorage.clear(); //for sessionStorage
        // window.location.reload(false);
        return(
            <Redirect to="/"/>
        )
      }
      const locdata = JSON.parse(localStorage.getItem('user'));
  const apilocdata = JSON.parse(localStorage.getItem('apiuser'));
  const userdata = JSON.parse(localStorage.getItem('theuser'));
  var apiavail=false;
      var bpress=false;
      

  // const { state } = this.props.location
  var authenticated=false;
  var papersfetched=false;


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
      const [qtype,setqtype] = useState([]);
  const [api,setapi] = useState([false]);
  const [loading,setloading] = useState(false);
      


      var attquizavail=false;
      async function fetchData() {
    var apiavail=false;
    let bankurl=`http://127.0.0.1:8000/qptypes-list/`+userdata.standard+`/`;
    const request = await fetch(bankurl)
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
        setqtype(data)
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

//   function viewbank(id) {
//     // alert(`hello, ${id}`);

//     // papersfetched=true
//     // localStorage.setItem('paperid',JSON.stringify(id));
//     // history.push("/questionbank/quespapers/");


//   }
let [bpapers,setbpapers] = useState([]);

async function viewbank(id) {
    if(bpapers.length==0){
    let bankurl=`http://127.0.0.1:8000/bpapers-list/`+id+`/`;
    const request = await fetch(bankurl)
      .then(response => {
        if(response.ok)
      {
        return response.json(); 
      }
      else{
        console.log(apiavail)
      }
    })
      .then(data => {
        localStorage.setItem('bankpaper',JSON.stringify(data));
        setbpapers(data)
      })
      .catch((error) => {
        console.log("the error ",error)
      });
    }

else{
    alert("asdasdasd")
    window.location.reload(false);
}
}

    

    


  let center={
    marginLeft:'50%',
};
    
      
    
return(
    
    <div className="main">
    <SNavbar/>
    {/* <div style={page}> */}
    {/* {userdata.standard} */}
    <div className="qbhome">
    <h1 style={center}><b>QUESTION BANK</b></h1>
    <div className="qbouter">
    {apiavail ? (
        <div className='qptype'>
      {
      qtype.map(item => (
      <a key={item.id}>
        <div className="qbcard">
        {/* <b>{item.id}</b> */}
        <b>{item.parentpaperfile}</b>
        <b>{item.description}</b>
        <button onClick={() => viewbank(item.parentpaperfile)}>VIEW</button><br></br><br></br>
        </div>
      </a>
      ))
  
      }
    
        </div>
      ) : (
        <><p>{api}</p>
        <p>no api to fetch from :(</p> </>
      )}
    </div>

    {(bpapers.length!=0) ? (
        <>
        <h1 style={center}><b>PAPERS FOR PREPARATION</b></h1>
        <div className="thecard">
      {
      bpapers.map(item => (
      <a key={item.id}>
        <div className="qbcard">
        {/* <b>{item.id}</b> */}
        <b>{item.name}</b>
        <b>{item.forgrade}</b>
        <b>{item.papertype}</b>
        <b>{item.key}</b>
        <b>{item.year}</b>
        <a href={item.paper}>VIEW</a>
        </div>
      </a>
      ))
  
      }

    </div>
    </>
    ):(
        <p></p>
    )
    
    }

    </div>
    </div>
    );
}

export default SQB;