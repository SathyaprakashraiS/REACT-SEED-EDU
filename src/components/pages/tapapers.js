import React,{useState,useEffect, Component } from 'react';
import './tapapers.css';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';
import TNavbar from './tnavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function TAsses(){
  let history = useHistory();
  const logout = ()=>{
      localStorage.clear(); //for localStorage
      sessionStorage.clear(); //for sessionStorage
      return(
        <Redirect to="/"/>
        )
    }

    const [paper,setpaper] = useState([]);
    const [epaper,setepaper] = useState([]);
    const [asspaper,setasspaper] = useState([]);
    const [loading,setloading] = useState([true]);
    const [eloading,seteloading] = useState([true]);
    const [asspaperloading,setasspaperloading] = useState([false]);
    const [tmarks,settmarks] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    function viewepaper(theid)
    {
        alert(theid);
    }

    async function assespaper(theid)
    {
        alert(theid);
        var tpaperlink=`http://127.0.0.1:8000/Tthatpaper/`+theid+'/';
        const request = await fetch(tpaperlink)
          .then(response => {
            if(response.ok)
          {
            return response.json(); 
          }
          else{
            assespaper(theid)
          }
        })
          .then(data => { 
            setasspaper(data)
            setasspaperloading(true);
          })
          .catch((error) => {
            setasspaperloading(true);
          });
    }

    async function fetchPaper(stand) {
        var paperlink=`http://127.0.0.1:8000/Ttoasspapers-list/`+userdata.standard+'/';
        const request = await fetch(paperlink)
          .then(response => {
            if(response.ok)
          {
            return response.json(); 
          }
          else{
            fetchPaper();
          }
        })
          .then(data => { 
            setpaper(data)
            setloading(false);
          })
          .catch((error) => {
            setloading(false);
          });
        }

    async function fetchEpaper(stand) {
        var epaperlink=`http://127.0.0.1:8000/TEvalpapers-list/`+userdata.email+'/'+userdata.standard+'/';
        const request = await fetch(epaperlink)
          .then(response => {
            if(response.ok)
          {
            return response.json(); 
          }
          else{
            fetchEpaper();
          }
        })
          .then(data => { 
            setepaper(data)
            seteloading(false);
          })
          .catch((error) => {
            seteloading(false);
          });
        }
    
        function submitpaper(theid){
            const settrue=true;
            let form_data= new FormData();
            form_data.append('markobtained',tmarks);
            form_data.append('correctedanswersheet',selectedFile);
            form_data.append('evaluatedby',userdata.email);
            form_data.append('evaluated',settrue);
            let resurl=`http://127.0.0.1:8000/Tcorrectedsubmitpaper/`+theid+'/';
            axios.post(resurl, form_data,
            {
                headers:
                {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(res => {
            alert('EXAM RESULT PUBLISHED!')
            history.push("/teacher/");
            })
            .catch(err => {
            alert('RE-CHECK ANSWER DETAILS, FAILED TO POST EXAM RESULT')
            })
        }

    const [book,setbook] = useState([]);
    const [delbook,setdelbook] = useState([]);
    // const [loading,setloading] = useState([true]);
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
    //const [selectedFile, setSelectedFile] = useState();
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
    
    // async function fetchBook(stand) {
    //   var booklink=`http://127.0.0.1:8000/tbook-list/`+userdata.email+'/';
    //   const request = await fetch(booklink)
    //     .then(response => {
    //       if(response.ok)
    //     {
    //       console.log("here trying to fetch")
    //       return response.json(); 
    //     }
    //     else{
    //       fetchBook();
    //       console.log("im not here")
    //     }
    //   })
    //     .then(data => { 
    //       setbook(data)
    //       setloading(false);
    //       console.log(setbook)
    //     })
    //     .catch((error) => {
    //       console.log("the error ",error)
    //       setloading(false);
    //     });
    //     if(book.length>0)
    //     {
    //       setbookpresent(true);
    //     }
    //   }

    //   async function fetchDelBook(stand) {
    //     var booklink=`http://127.0.0.1:8000/tresbook-list/`+userdata.email+'/';
    //     const request = await fetch(booklink)
    //       .then(response => {
    //         if(response.ok)
    //       {
    //         console.log("here trying to fetch")
    //         return response.json(); 
    //       }
    //       else{
    //         fetchDelBook();
    //         console.log("im not here")
    //       }
    //     })
    //       .then(data => { 
    //         setdelbook(data)
    //         setdelloading(false);
    //         console.log(setdelbook)
    //       })
    //       .catch((error) => {
    //         console.log("the error ",error)
    //         setdelloading(false);
    //       });
    //       if(delbook.length>0)
    //       {
    //         setdelbookpresent(true);
    //       }
    //     }

    // async function deletebook(theid){
    //   alert(theid);
    //   let resurl=`http://127.0.0.1:8000/tdelbook-list/`+userdata.email+'/'+theid+`/`;
    //   const request = await fetch(resurl)
    //     .then(response => {
    //       if(response.ok)
    //     {
    //       return response.json(); 
    //     }
    //     else{
    //       fetchBook();
    //     }
    //   })
    //     .then(data => { 
    //       setbook(data)
    //       setloading(false);
    //     })
    //     .catch((error) => {
    //       setloading(false);
    //     });
    //     if(book.length>0)
    //     {
    //       setbookpresent(true);
    //     }
    //   // axios.post(resurl,
    //   //   {
    //   //     headers:
    //   //     {
    //   //       'content-type': 'multipart/form-data'
    //   //     }
    //   //   })
    //   //   .then(res => {
    //   //     console.log(res.data);
    //   //     alert('BOOK HAS BEEN DELETED!')
    //   //     history.push("/teacher/");
    //   //   })
    //   //   .catch(err => {
    //   //     console.log(err)
    //   //     alert('COULDNT DELETE TRY AGAIN LATER!')
    //   //   })
    // }

    // async function restorebook(theid){
    //   alert(theid);
    //   let resurl=`http://127.0.0.1:8000/tdelbook-list/`+userdata.email+'/'+theid+`/`;
    //   const request = await fetch(resurl)
    //     .then(response => {
    //       if(response.ok)
    //     {
    //       return response.json(); 
    //     }
    //     else{
    //       fetchDelBook();
    //     }
    //   })
    //     .then(data => { 
    //       setdelbook(data)
    //       setdelloading(false);
    //     })
    //     .catch((error) => {
    //       setdelloading(false);
    //     });
    //     if(delbook.length>0)
    //     {
    //       setdelbookpresent(true);
    //     }
    // }

    useEffect(() => {
        fetchEpaper();
        fetchPaper();
        // fetchBook();
        // fetchDelBook();
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

        {(asspaperloading) && (asspaper.length>0)?
        <>
        <h1>TEST PAPER</h1>
        
          {
            asspaper.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                  <p>name: {item.studentname}</p>
                  <p>testname: {item.testname}</p>
                  <p>grade: {item.sgrade}</p>
                  <p>total marks: {item.totalmarks}</p>
                  <a href={item.answersheet}>View answersheet</a><br/>
                  <br/>
                  <label>Enter mark obtained:
                    <input
                    type='number'
                    step="0.1"
                    min='0'
                    max={item.totalmarks}
                    value={tmarks}
                    onChange={(e) => settmarks(e.target.value)}
                    />
                    </label><br/>
                  <label>attach corrected answersheet:
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
                  <button onClick={() => submitpaper(item.id)}>POST EVALUATION</button>
                </div>
              </a>
              ))
            }
          </>:
          <></>}
          {/* {asspaperloading?<p>Students havent attended any exams yet!</p>:<p>Checking the Papers in Bundles</p>} */}

        <h1>PAPERS TO BE ASSESED</h1>
        {(!loading) && (paper.length>0) ?
          <>
          {
            paper.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                  <p>name: {item.studentname}</p>
                  <p>testname: {item.testname}</p>
                  <p>grade: {item.sgrade}</p>
                  <p>total marks:{item.totalmarks}</p>
                  <a href={item.answersheet}>View answersheet</a><br/>
                  <br/>
                  <button onClick={() => assespaper(item.id)}>ASSES PAPER</button>
                </div>
              </a>
              ))
            }
          </>:<>{!loading?<p>Checking the Papers in Bundles</p>:<p>Students havent attended any exams yet!</p>}</>}
    
        <h1>ASSESED PAPERS</h1>
        {(!eloading) && (epaper.length>0) ?
          <>
          {
            epaper.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                  <p>name: {item.studentname}</p>
                  <p>testname: {item.testname}</p>
                  <p>grade: {item.sgrade}</p>
                  <p>mark obtained: {item.markobtained}</p>
                  <p>total marks: {item.totalmarks}</p>
                  <p>total: {item.markobtained}/{item.totalmarks}</p>
                  <a href={item.answersheet}>View answersheet</a><br/>
                  <a href={item.correctedanswersheet}>View corrected-answersheet</a>
                  <br/>
                  <button onClick={() => viewepaper(item.id)}>VIEW PAPER</button>
                </div>
              </a>
              ))
            }
          </>:<>{eloading?<p>Checking the Paper Bundles</p>:<p>Student papers are yet to be corrected to view!</p>}</>}

    
    </div>
</div>
    );
}

export default TAsses;
