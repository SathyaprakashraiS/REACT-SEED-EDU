import React,{useState,useEffect, Component } from 'react';
import './thome.css';
import { GoogleLogout } from 'react-google-login';
import TNavbar from './tnavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Teacher(){
  let history = useHistory();
  const logout = ()=>{
      localStorage.clear(); //for localStorage
      sessionStorage.clear(); //for sessionStorage
      return(
        <Redirect to="/"/>
        )
    }

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
      console.log('Bgrade',bgrade);
      console.log('Name',name);
      console.log('Subject',subject);
      console.log('Details',details);
      console.log('Review',review);
      console.log('Rating',rating);
      console.log('Image',selectedimg);    
      console.log('Author',author);
      console.log('File',selectedFile);
      console.log('addedby:',userdata.username);
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
    
    useEffect(() => {

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
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
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
          type="text" 
          value={rating}
          onChange={(e) => setRating(e.target.value)}
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
        
    </div>
</div>
    );
}

export default Teacher;
