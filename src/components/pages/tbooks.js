import React,{useState,useEffect, Component } from 'react';
import './tbooks.css';
import axios from 'axios';
// import { GoogleLogout } from 'react-google-login';
import TNavbar from './tnavbar';
// import BookStruct from '../structures/BookStruct';
import { Redirect, useHistory } from 'react-router-dom';
import { FaFolderPlus } from 'react-icons/fa';

function Tbooks(){
  let history = useHistory();
  const logout = ()=>{
      localStorage.clear(); //for localStorage
      sessionStorage.clear(); //for sessionStorage
      return(
        <Redirect to="/"/>
        )
    }
    const [updatingbook,setupdatingbook] = useState([false]);
    const [updbdata,setupdbdata] = useState([]);
    const [updbgrade, setupdBgrade] = useState("");
    const [updname, setupdName] = useState("");
    const [updsubject, setupdSubject] = useState("");
    const [upddetails, setupdDetails] = useState("");
    const [updreview, setupdReview] = useState("");
    const [updrating, setupdRating] = useState("");
    const [updauthor, setupdAuthor] = useState("");
    const [updselectedFile, setupdSelectedFile] = useState();
    const [updisFilePicked, setupdIsFilePicked] = useState(false);
    const [updselectedimg, setupdSelectedimg] = useState();
    const [updisimgPicked, setupdIsimgPicked] = useState(false);
    const updfileHandler = (event) => {
        setupdSelectedFile(event.target.files[0]);
        setupdIsFilePicked(true);        
      };
    const updimageHandler = (event) => {
        setupdSelectedimg(event.target.files[0]);
        setupdIsimgPicked(true);        
      };

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
    }

    async function updatebook(theid){
      alert(theid);
      let bupdurl=`http://127.0.0.1:8000/Tupdatebookdata/`+theid+`/`;
      const request = await fetch(bupdurl)
        .then(response => { 
          if(response.ok)
        {
          return response.json(); 
        }
      })
        .then(data => { 
          setupdbdata(data)
          setupdatingbook(true);
        })
        .catch((error) => {
          setupdatingbook(false);
        });
    }

    function postupdate(theid)
    {
      let form_data= new FormData();
      if(updbgrade!="")
      {
        form_data.append('bgrade',updbgrade);
      }
      if(updname!="")
      {
        form_data.append('name',updname);
      }
      if(updsubject!="")
      {
        form_data.append('subject',updsubject);
      }
      if(upddetails!="")
      {
        form_data.append('details',upddetails);
      }
      if(updreview!="")
      {
        form_data.append('review',updreview);
      }
      if(updrating!="")
      {
        form_data.append('rating',updrating);
      }
      if(updauthor!="")
      {
        form_data.append('author',updauthor);
      }
      if(updisimgPicked==true)
      {
        form_data.append('image',updselectedimg);
      }
      if(updisFilePicked==true)
      {
        form_data.append('file',updselectedFile);
      }
      form_data.append('addedby',userdata.email);
      const thetrue=true;
      form_data.append('visible',thetrue);
      let resurl=`http://127.0.0.1:8000/Tpostupdatedbookdata/`+theid+'/';
      axios.post(resurl, form_data,
        {
          headers:
          {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data);
          alert('BOOK DETAILS HAS BEEN UPDATED!')
          history.push("/teacher/");
        })
        .catch(err => {
          console.log(err)
          alert('RE-CHECK THE BOOK DETAILS, FAILED TO UPDATE BOOK TO THE SHELF')
        })
      }

    async function restorebook(theid){
      let resurl=`http://127.0.0.1:8000/tresbook-list/`+userdata.email+'/'+theid+`/`;
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
        <h1 style={center}><b>TEACHER PORTAL</b></h1>

        <h1>ADD BOOK</h1>
        <div className='tbook_addmain'>
          <div className='tbook_igrid'>
          <label>book for grade:
          <select onChange={(e) => setBgrade(e.target.value)}>
            <option value="2">Grade 10</option>
            <option value="3">Grade 11</option>
            <option value="4">Grade 12</option>
          </select>
        </label>
          </div>
          <div className='tbook_igrid'>
          <label>Enter book name:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </label>
          </div>
          <div className='tbook_igrid'>
          <label>Enter subject name:
        <input
          type="text" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        </label>
          </div>
          <div className='tbook_igrid'>
          <label>Enter book details:
        <input
          type="text" 
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        </label>
          </div>
          <div className='tbook_igrid'>
          <label>Enter book review:
        <input
          type="text" 
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        </label>
          </div>
          <div className='tbook_igrid'>
          <label>Enter book rating:
        <input
          type='number'
          step="0.1"
          min='0'
          max='5'
          value={rating}
          onChange= {(e) => setRating(e.target.value)}
        />
        </label>
          </div>
          <div className='tbook_igrid'>
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
        </label>
          </div>
          <div className='tbook_igrid'> <label>Enter book author:
        <input
          type="text" 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        </label>
        </div>
          <div className='tbook_igrid'>
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
        </label>
          </div>
          <div className='tbook_igrid'>   <button onClick={() => createbook()}>ADD BOOK<FaFolderPlus className='btfolder'/></button></div>
     
     
        </div>
        {updbdata.length>0 ? <>
          <h1>UPDATE DETAILS</h1>
          {
            updbdata.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                {/* <img classname="bimg" src={item.image} /> */}
                <div className='tbook_addmain'>
                <div className='tbook_igrid'>
                <label>book for grade:
                  <select onChange={(e) => setupdBgrade(e.target.value)}>
                    <option value="2">select pls</option>
                    <option value="2">Grade 10</option>
                    <option value="3">Grade 11</option>
                    <option value="4">Grade 12</option>
                  </select>
                </label>
                </div>
                <div className='tbook_igrid'>
                <label>Enter book name:
                  <input
                    type="text" 
                    value={updname}
                    onChange={(e) => setupdName(e.target.value)}
                  />
                  </label>
                </div>
                <div className='tbook_igrid'>
                <label>Enter book author:
                  <input
                    type="text" 
                    value={updauthor}
                    onChange={(e) => setupdAuthor(e.target.value)}
                  />
                  </label>
                </div>
                <div className='tbook_igrid'>
                <label>Enter book subject:
                  <input
                    type="text" 
                    value={updsubject}
                    onChange={(e) => setupdSubject(e.target.value)}
                  />
                  </label>
                </div>
                <div className='tbook_igrid'>
                <label>Enter book details:
        <input
          type="text" 
          value={upddetails}
          onChange={(e) => setupdDetails(e.target.value)}
        />
        </label>
                </div>
                <div className='tbook_igrid'>
                <label>Enter book review:
        <input
          type="text" 
          value={updreview}
          onChange={(e) => setupdReview(e.target.value)}
        />
        </label>
                </div>
                <div className='tbook_igrid'>
                <label>Enter book rating:
        <input
          type='number'
          step="0.1"
          min='0'
          max='5'
          value={updrating}
          onChange= {(e) => setupdRating(e.target.value)}
        />
        </label>
                </div>
                <div className='tbook_igrid'>
                <label>Add book image to update :<br/>
        <input type="file" name="image" accept="image/png, image/jpeg" onChange={updimageHandler} />
			{updisimgPicked ? (
				<div>
					<p>Image name: {updselectedimg.name}</p>
					<p>Image type: {updselectedimg.type}</p>
					<p>Size in bytes: {updselectedimg.size}</p>
					<p>
						lastModifiedDate:{' '}
						{updselectedimg.lastModifiedDate.toLocaleDateString()}
					</p>
          <p><a href={updselectedimg}>VIEW IMAGE</a></p>
				</div>
			) : (
				<p>Select a image to show details</p>
			)}</label>
                </div>
                <div className='tbook_igrid'>
                <form action={item.file}>
                    <input type="submit" value="Read Book" />
                  </form>
                </div>
                <div className='tbook_igrid'>
                <label>attach new book to attach update pdf:<br/>
                  <input type="file" name="file" onChange={updfileHandler} />
                {updisFilePicked ? (
                  <div>
                    <p>Filename: {updselectedFile.name}</p>
                    <p>Filetype: {updselectedFile.type}</p>
                    <p>Size in bytes: {updselectedFile.size}</p>
                    <p>
                      lastModifiedDate:{' '}
                      {updselectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                    <p><a href={updselectedFile}>READ FILE</a></p>
                  </div>
                ) : (
                  <p>Select a file to show details</p>
                )}
                  </label>
                </div>
                <div className='tbook_igrid'><button onClick={() => postupdate(item.id)}>POST UPDATED DETAILS</button></div>
        
                  
                </div>
                </div>
              </a>
              ))
            }
        </>:<></>}

        <h1>UPDATE BOOK</h1>
        {(!loading) && (book.length>0) ?
          <div className='tupdate_main'>
          {
            book.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                {/* <img classname="bimg" src={item.image} /> */}
                <div className='updatebook_t'>
                  <p><b>name: </b>{item.name}</p>
                  <p><b>author: </b>{item.author}</p>
                  <p><b>subject:</b> {item.subject}</p>
                  {item.bgrade==2?<p>grade: 10</p>:<></>}
                  {item.bgrade==3?<p>grade: 11</p>:<></>}
                  {item.bgrade==4?<p>grade: 12</p>:<></>}
                  <form action={item.file}>
                    <input type="submit" value="Read Book" />
                  </form>
                  <button onClick={() => updatebook(item.id)}><b>UPDATE BOOK DETAILS</b></button>
                </div>
                </div>
              </a> 
              ))
            }
          </div>:<>{loading?<p>Cruising the shelves</p>:<p>no book available add books to update them</p>}</>}

        <h1>REMOVE BOOK</h1>
          {(!loading) && (book.length>0) ?
          <div className='tupdate_main'>
          {
            book.map(item => (
              <a key={item.id}>
                 <div className='updatebook_t'>
                <div classname="dispbook">
                <img classname="tbook_remove" src={item.image} />
                  <p><b>name:</b> {item.name}</p>
                  <p><b>author: </b>{item.author}</p>
                  <p><b>subject:</b> {item.subject}</p>
                  {item.bgrade==2?<p>grade: 10</p>:<></>}
                  {item.bgrade==3?<p>grade: 11</p>:<></>} 
                  {item.bgrade==4?<p>grade: 12</p>:<></>}
                  <a href={item.file}>Read Book</a>
                  <br/>
                  <button onClick={() => deletebook(item.id)}>DELETE BOOK</button>
                </div>
                </div>
              </a>
              ))
            }
          </div>:<>{loading?<p>Cruising the shelves</p>:<p>no book available add books to delete</p>}</>}

          <h1>RESTORE DELETED BOOKS</h1>
          {(!delloading) && (delbook.length>0) ?
          <div className='updatebook_t'>
          {
            delbook.map(item => (
              <a key={item.id}>
                 <div className='updatebook_t'>
                <div classname="dispbook">
                <img classname="bimg" src={item.image} />
                  <p>name: {item.name}</p>
                  <p>author: {item.author}</p>
                  <p>subject: {item.subject}</p>
                  {item.bgrade==2?<p>grade: 10</p>:<></>}
                  {item.bgrade==3?<p>grade: 11</p>:<></>}
                  {item.bgrade==4?<p>grade: 12</p>:<></>}
                  <a href={item.file}>Read Book</a>
                  <br/>
                  <button onClick={() => restorebook(item.id)}>RESTORE BOOK</button>
                </div>
                </div>
              </a>
              ))
            }
          </div>:<>{delloading?<p>Minning the Bin</p>:<><p>no books have been deleted previously,</p><p>delete books to restore them</p></>}</>}
    </div>
</div>
    );
}

export default Tbooks;
