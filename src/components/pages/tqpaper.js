import React,{useState,useEffect, Component } from 'react';
import './tqpaper.css';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';
import TNavbar from './tnavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Texams(){
  let history = useHistory();
  const logout = ()=>{
      localStorage.clear(); //for localStorage
      sessionStorage.clear(); //for sessionStorage
      return(
        <Redirect to="/"/>
        )
    }

    const [book,setbook] = useState([]);
    const [respaper,setrespaper] = useState([]);
    const [papertypes,setpapertypes] = useState([]);
    const [delpaper,setdelpaper] = useState([]);
    const [papertypespresent,setpapertypespresent] = useState(false);
    const [description, setdescription] = useState("");
    const [loading,setloading] = useState([true]);
    const [delloading,setdelloading] = useState([true]);
    const [resloading,setresloading] = useState([true]);
    const [bookpresent, setbookpresent] = useState(false);
    const [delpaperpresent, setdelpaperpresent] = useState(false);
    const [respaperpresent, setrespaperpresent] = useState(false);
    const [pgrade, setpgrade] = useState("");
    const [child, setchild] = useState("");
    const [ptype, setptype] = useState("");
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
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
    
    function addquestionpaper()
    {
        let form_data= new FormData();
        form_data.append('childpaperfile',child);
        form_data.append('name',name);
        form_data.append('forgrade',pgrade);
        form_data.append('papertypes',ptype);
        form_data.append('key',"View");
        form_data.append('year',year);
        form_data.append('paper',selectedFile);
        form_data.append('addedby',userdata.email);
        let resurl=`http://127.0.0.1:8000/addpaper-list/`;
        axios.post(resurl, form_data,
        {
          headers:
          {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data);
          alert('EXAM HAS BEEN ADDED!')
        //   history.push("/teacher/");
        })
        .catch(err => {
          console.log(err)
          alert('RE-CHECK THE EXAM DETAILS, FAILED TO ADD EXAM TO THE VAULT')
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
    
    async function fetchQpapertypes(stand) {
      var booklink=`http://127.0.0.1:8000/tqptypes-list/`;
      const request = await fetch(booklink)
        .then(response => {
          if(response.ok)
        {
          console.log("here trying to fetch")
          return response.json(); 
        }
        else{
          fetchQpapertypes();
          console.log("im not here")
        }
      })
        .then(data => { 
          setpapertypes(data)
          setloading(false);
          console.log(setpapertypes)
        })
        .catch((error) => {
          console.log("the error ",error)
          setloading(false);
        });
        if(papertypes.length>0)
        {
          setpapertypespresent(true);
        }
      }

      async function fetchtodelpaper(stand) {
        var paperlink=`http://127.0.0.1:8000/Authpaper-list/`+userdata.email+'/';
        const request = await fetch(paperlink)
          .then(response => {
            if(response.ok)
          {
            console.log("here trying to fetch")
            return response.json(); 
          }
          else{
            fetchtodelpaper();
            console.log("im not here")
          }
        })
          .then(data => { 
            setdelpaper(data)
            setdelloading(false);
          })
          .catch((error) => {
            console.log("the error ",error)
            setdelloading(false);
          });
          if(delpaper.length>0)
          {
            setdelpaperpresent(true);
          }
        }

    async function delquestionpaper(theid){
      alert(theid);
      let resurl=`http://127.0.0.1:8000/delpaper-list/`+userdata.email+'/'+theid+`/`;
      const request = await fetch(resurl)
        .then(response => {
          if(response.ok)
        {
          return response.json(); 
        }
        else{
          fetchtodelpaper();
        }
      })
        .then(data => { 
          setdelpaper(data)
          setdelloading(false);
        })
        .catch((error) => {
          setdelloading(false);
        });
        if(delpaper.length>0)
        {
          setdelpaperpresent(true);
        }
    }

    async function fetchdeletedpapers(stand){
      let resurl=`http://127.0.0.1:8000/respaper-list/`+userdata.email+'/';
      const request = await fetch(resurl)
        .then(response => {
          if(response.ok)
        {
          return response.json(); 
        }
        else{
          fetchdeletedpapers();
        }
      })
        .then(data => { 
          setrespaper(data)
          setresloading(false);
        })
        .catch((error) => {
          setresloading(false);
        });
        if(respaper.length>0)
        {
          setrespaperpresent(true);
        }
    }

    async function restorepaper(theid){
      alert(theid);
      let resurl=`http://127.0.0.1:8000/recoverpaper-list/`+userdata.email+'/'+theid+`/`;
      const request = await fetch(resurl)
        .then(response => {
          if(response.ok)
        {
          return response.json(); 
        }
        else{
          fetchtodelpaper();
        }
      })
        .then(data => { 
          setdelpaper(data)
          setdelloading(false);
          history.push("/teacher/");
        })
        .catch((error) => {
          setdelloading(false);
        });
        if(delpaper.length>0)
        {
          setdelpaperpresent(true);
        }
    }


    useEffect(() => {
      fetchQpapertypes();
      fetchtodelpaper();
      fetchdeletedpapers();
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

        <h1>ADD QUESTION PAPER</h1>
        <label>paper name:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </label><br/>
        <label>paper for grade:
          <select onChange={(e) => setpgrade(e.target.value)}>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </label><br/>
        <label>paper class:
          <select onChange={(e) => setchild(e.target.value)}>
            <option value="2">CBSE 10</option>
            <option value="3">CBSE 11</option>
            <option value="4">CBSE 12</option>
            <option value="5">ACLAT</option>
            <option value="6">AIEED</option>
            <option value="7">AIIMS</option>
          </select>
        </label><br/>
        <label>paper type:
          <select onChange={(e) => setptype(e.target.value)}>
            <option value="practise paper">practise paper</option>
            <option value="solution paper">solution paper</option>
            <option value="session paper">session paper</option>
            <option value="session paper key">session paper key</option>
          </select>
        </label><br/>
        <label>paper year:
        <input
          type="text" 
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        </label><br/>
        <label>attach question paper:
        <input type="file" name="file" onChange={fileHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
          <p><a href={selectedFile}>VIEW FILE</a></p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
        </label><br/>
        <button onClick={() => addquestionpaper()}>ADD QUESTION PAPER</button>



        <h1>UPDATE QUESTION PAPER</h1>

        <h1>REMOVE QUESTION PAPER</h1>
        {(!delloading) && (delpaper.length>0) ?
          <>
          {
            delpaper.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                  <p>name: {item.name}</p>
                  <p>type: {item.childpaperfile}</p>
                  <p>for grade: {item.forgrade}</p>
                  <p>paper type: {item.papertype}</p>
                  <p>year: {item.year}</p>
                  <a href='/'>View paper</a>                                                                                
                  <br/>
                  <button onClick={() => delquestionpaper(item.id)}>DELETE QUESTION PAPER</button>
                </div>
              </a>
              ))
            }
          </>:<>{delloading?<p>Opening the Vault</p>:<p>no papers available add papers to delete</p>}</>}
        
        <h1>DELETED QUESTION PAPER</h1>
        {(!resloading) && (respaper.length>0) ?
          <>
          {
            respaper.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                  <p>name: {item.name}</p>
                  <p>type: {item.childpaperfile}</p>
                  <p>for grade: {item.forgrade}</p>
                  <p>paper type: {item.papertype}</p>
                  <p>year: {item.year}</p>
                  <a href='/'>View paper</a>                                                                                
                  <br/>
                  <button onClick={() => restorepaper(item.id)}>RESTORE QUESTION PAPER</button>
                </div>
              </a>
              ))
            }
          </>:<>{delloading?<p>Opening the Vault</p>:<p>no papers available delete papers to restore</p>}</>}

        <h1>AVAILABLE QUESTION PAPER TYPES</h1>
          {(!loading) && (papertypes.length>0) ?
          <>
          {
            papertypes.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                  <p>name: {item.parentpaperfile}</p>
                  <p>paperdescription: {item.description}</p>
                  <p>marks: {item.forgrade}</p>
                  <a href='/'>View papers</a>                                                                                    
                  <br/>
                </div>
              </a>
              ))
            }
          </>:<>{loading?<p>Opening the Vault</p>:<p>no papers available add papers to delete</p>}</>}
    </div>
</div>
    );
}

export default Texams;
