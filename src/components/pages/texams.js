import React,{useState,useEffect, Component } from 'react';
import './texams.css';
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
    const [loading,setloading] = useState([true]);
    const [bookpresent, setbookpresent] = useState(false);
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
    
    function createbook()
    {
      let form_data= new FormData();
      form_data.append('mpgrade',bgrade);
      form_data.append('mockpapername',name);
      form_data.append('paperdescription',subject);
      form_data.append('totalmarks',rating);
      form_data.append('mockpaper',selectedFile);
      form_data.append('addedby',userdata.email);
      let resurl=`http://127.0.0.1:8000/addexam-list/`;
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
          history.push("/teacher/");
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
    
    async function fetchBook(stand) {
      var booklink=`http://127.0.0.1:8000/texam-list/`+userdata.email+'/';
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

    async function deletebook(theid){
      alert(theid);
      let resurl=`http://127.0.0.1:8000/tdelexam-list/`+userdata.email+'/'+theid+`/`;
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
      // axios.post(resurl,
      //   {
      //     headers:
      //     {
      //       'content-type': 'multipart/form-data'
      //     }
      //   })
      //   .then(res => {
      //     console.log(res.data);
      //     alert('BOOK HAS BEEN DELETED!')
      //     history.push("/teacher/");
      //   })
      //   .catch(err => {
      //     console.log(err)
      //     alert('COULDNT DELETE TRY AGAIN LATER!')
      //   })
    }

    useEffect(() => {
      fetchBook();
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

        <h1>ADD EXAM</h1>
        <label>exam for grade:
          <select onChange={(e) => setBgrade(e.target.value)}>
            <option value="2">Grade 10</option>
            <option value="3">Grade 11</option>
            <option value="4">Grade 12</option>
          </select>
        </label><br/>
        <label>Enter exam name:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </label><br/>
        <label>Enter paper description:
        <input
          type="text" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        </label><br/>
        <label>Enter max marks:
        <input
          type='number'
          step="1"
          min='0'
          max='100'
          value={rating}
          onChange= {(e) => setRating(e.target.value)}
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
        <button onClick={() => createbook()}>ADD EXAM</button>



        <h1>UPDATE EXAM</h1>


        <h1>REMOVE EXAM</h1>
          {(!loading) && (book.length>0) ?
          <>
          {
            book.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                  <p>name: {item.mockpapername}</p>
                  <p>paperdescription: {item.paperdescription}</p>
                  <p>marks: {item.totalmarks}</p>
                  <a href={item.file}>View paper</a>
                  <br/>
                  <button onClick={() => deletebook(item.id)}>DELETE BOOK</button>
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
