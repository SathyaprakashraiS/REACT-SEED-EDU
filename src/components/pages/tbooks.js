import React,{useState,useEffect, Component } from 'react';
import './tbooks.css';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';
import TNavbar from './tnavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Tbooks(){
  let history = useHistory();
  const logout = ()=>{
      localStorage.clear(); //for localStorage
      sessionStorage.clear(); //for sessionStorage
      return(
        <Redirect to="/"/>
        )
    }

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
      fetchBook();
      fetchDelBook();
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

        <h1>ADD BOOK</h1>
        <label>book for grade:
          <select onChange={(e) => setBgrade(e.target.value)}>
            <option value="2">Grade 10</option>
            <option value="3">Grade 11</option>
            <option value="4">Grade 12</option>
          </select>
        </label><br/>
        <label>Enter book name:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </label><br/>
        <label>Enter subject name:
        <input
          type="text" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        </label><br/>
        <label>Enter book details:
        <input
          type="text" 
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        </label><br/>
        <label>Enter book review:
        <input
          type="text" 
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        </label><br/>
        <label>Enter book rating:
        <input
          type='number'
          step="0.1"
          min='0'
          max='5'
          value={rating}
          onChange= {(e) => setRating(e.target.value)}
        />
        </label><br/>
        <label>Add book image:
        <input type="file" name="image" accept="image/png, image/jpeg" onChange={imageHandler} />
			{isimgPicked ? (
				<div>
					<p>Image name: {selectedimg.name}</p>
					<p>Image type: {selectedimg.type}</p>
					<p>Size in bytes: {selectedimg.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedimg.lastModifiedDate.toLocaleDateString()}
					</p>
          <p><a href={selectedimg}>VIEW IMAGE</a></p>
				</div>
			) : (
				<p>Select a image to show details</p>
			)}
        </label><br/>
        <label>Enter book author:
        <input
          type="text" 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        </label><br/>
        <label>Enter book pdf:
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
          <p><a href={selectedFile}>READ FILE</a></p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
        </label><br/>
        <button onClick={() => createbook()}>ADD BOOK</button>



        <h1>UPDATE BOOK</h1>


        <h1>REMOVE BOOK</h1>
          {/* {loading?<p>Cruising the shelves</p>:<></>} */}
          {(!loading) && (book.length>0) ?
          <>
          {
            book.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                <img classname="bimg" src={item.image} />
                  <p>name: {item.name}</p>
                  <p>author: {item.author}</p>
                  <p>subject: {item.subject}</p>
                  <a href={item.file}>Read Book</a>
                  <br/>
                  <button onClick={() => deletebook(item.id)}>DELETE BOOK</button>
                </div>
              </a>
              ))
            }
          </>:<>{loading?<p>Cruising the shelves</p>:<p>no book available add books to delete</p>}</>}

          <h1>Previously removed books</h1>
          {(!delloading) && (delbook.length>0) ?
          <>
          {
            delbook.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                <img classname="bimg" src={item.image} />
                  <p>name: {item.name}</p>
                  <p>author: {item.author}</p>
                  <p>subject: {item.subject}</p>
                  <a href={item.file}>Read Book</a>
                  <br/>
                  <button onClick={() => restorebook(item.id)}>RESTORE BOOK</button>
                </div>
              </a>
              ))
            }
          </>:<>{delloading?<p>Minning the Bin</p>:<p>no book deleted previously</p>}</>}
    </div>
</div>
    );
}

export default Tbooks;
