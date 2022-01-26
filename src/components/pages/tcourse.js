import React,{useState,useEffect, Component } from 'react';
import './tcourse.css';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';
import TNavbar from './tnavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Tcourse(){
  let history = useHistory();
  const logout = ()=>{
      localStorage.clear(); //for localStorage
      sessionStorage.clear(); //for sessionStorage
      return(
        <Redirect to="/"/>
        )
    }

    const [cname,setcname] = useState([]);
    const [crating,setcrating] = useState([]);
    const [cdes,setcdes] = useState([]);
    const [cprice,setcprice] = useState([]);
    const [clink,setclink] = useState([]);
    const [courses,setcourses] = useState([]);
    const [loading,setloading] = useState([true]);
    const [delcourses,setdelcourses] = useState([]);
    const [delloading,setdelloading] = useState([true]);
    const [selectedimg, setSelectedimg] = useState();
    const [isimgPicked, setIsimgPicked] = useState(false);
    const imageHandler = (event) => {
      setSelectedimg(event.target.files[0]);
      setIsimgPicked(true);        
    };

    // const [delbook,setdelbook] = useState([]);
    // const [Qname,setQname] = useState([]);
    // const [book,setbook] = useState([]);
    // const [bookpresent, setbookpresent] = useState(false);
    // const [delbookpresent, setdelbookpresent] = useState(false);
    // const [bgrade, setBgrade] = useState("");
    // const [name, setName] = useState("");
    // const [subject, setSubject] = useState("");
    // const [details, setDetails] = useState("");
    // const [review, setReview] = useState("");
    // const [rating, setRating] = useState("");
    // const [author, setAuthor] = useState("");
    // const [selectedFile, setSelectedFile] = useState();
    // const [isFilePicked, setIsFilePicked] = useState(false);
    // const fileHandler = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //     setIsFilePicked(true);        
    //   };
    
    function createcourse()
    {
        const bool=true;
        let form_data= new FormData();
        form_data.append('name',cname);
        form_data.append('description',cdes);
        form_data.append('rating',crating);
        form_data.append('price',cprice);
        form_data.append('image',selectedimg);
        form_data.append('link',clink);
        form_data.append('addedby',userdata.email);
        form_data.append('visible',bool);
        let resurl=`http://127.0.0.1:8000/Taddocourse-list/`+userdata.email+'/';
        axios.post(resurl, form_data,
        {
          headers:
          {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          alert('COURSE HAS BEEN ADDED!');
          history.push("/teacher/");
        })
        .catch(err => {
          alert('RE-CHECK THE COURSE DETAILS, FAILED TO ADD COURSE TO THE LIST')
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
    
    async function fetchCourse(stand) {
      var booklink=`http://127.0.0.1:8000/Tocourse-list/`+userdata.email+'/';
      const request = await fetch(booklink)
        .then(response => {
          if(response.ok)
        {
          return response.json(); 
        }
        else{
          fetchCourse();
        }
      })
        .then(data => { 
          setcourses(data)
          setloading(false);
        })
        .catch((error) => {
          setloading(false);
        });
      }

      async function fetchDeletedCourse(stand) {
        var booklink=`http://127.0.0.1:8000/Tdeletedocourses-list/`+userdata.email+'/';
        const request = await fetch(booklink)
          .then(response => {
            if(response.ok)
          {
            return response.json(); 
          }
          else{
            fetchDeletedCourse();
          }
        })
          .then(data => { 
            setdelcourses(data)
            setdelloading(false);
          })
          .catch((error) => {
            setdelloading(false);
          });
        }

      async function deletecourse(theid){
        let resurl=`http://127.0.0.1:8000/Tdelocourse-list/`+userdata.email+'/'+theid+`/`;
        const request = await fetch(resurl)
          .then(response => {
            if(response.ok)
          {
            return response.json(); 
          }
          else{
            fetchCourse();
          }
        })
          .then(data => { 
            setcourses(data)
            setloading(false);
            history.push('/teacher/');
          })
          .catch((error) => {
            setloading(false);
          });
      }

      async function restorecourse(theid){
        let resurl=`http://127.0.0.1:8000/Tresocourse-list/`+userdata.email+'/'+theid+`/`;
        const request = await fetch(resurl)
          .then(response => {
            if(response.ok)
          {
            return response.json(); 
          }
          else{
            fetchCourse();
          }
        })
          .then(data => { 
            setdelcourses(data)
            setdelloading(false);
            history.push('/teacher/');
          })
          .catch((error) => {
            setdelloading(false);
          });
      }

    // async function fetchQuiz(stand) {
    //     var booklink=`http://127.0.0.1:8000/Tquiz-list/`+userdata.email+'/';
    //     const request = await fetch(booklink)
    //       .then(response => {
    //         if(response.ok)
    //       {
    //         console.log("here trying to fetch")
    //         return response.json(); 
    //       }
    //       else{
    //         fetchQuiz();
    //         console.log("im not here")
    //       }
    //     })
    //       .then(data => { 
    //         setbook(data)
    //         setloading(false);
    //         console.log(setbook)
    //       })
    //       .catch((error) => {
    //         console.log("the error ",error)
    //         setloading(false);
    //       });
    //       if(book.length>0)
    //       {
    //         setbookpresent(true);
    //       }
    //     }

        // async function deletequiz(theid){
        //     alert(theid);
        //     let resurl=`http://127.0.0.1:8000/Tdelquiz-list/`+userdata.email+'/'+theid+`/`;
        //     const request = await fetch(resurl)
        //       .then(response => {
        //         if(response.ok)
        //       {
        //         return response.json(); 
        //       }
        //       else{
        //         fetchQuiz();
        //       }
        //     })
        //       .then(data => { 
        //         setbook(data)
        //         setloading(false);
        //         history.push('/teacher/');
        //       })
        //       .catch((error) => {
        //         setloading(false);
        //       });
        //       if(book.length>0)
        //       {
        //         setbookpresent(true);
        //       }
        //   }

          // async function restorequizlist(){
          //   let resurl=`http://127.0.0.1:8000/Trestorequiz-list/`+userdata.email+`/`;
          //   const request = await fetch(resurl)
          //     .then(response => {
          //       if(response.ok)
          //     {
          //       return response.json(); 
          //     }
          //     else{
          //       restorequizlist();
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

          // async function restorequiz(theid){
          //   alert(theid);
          //   let resurl=`http://127.0.0.1:8000/Trestorequiz-list/`+userdata.email+'/'+theid+`/`;
          //   const request = await fetch(resurl)
          //     .then(response => {
          //       if(response.ok)
          //     {
          //       return response.json(); 
          //     }
          //     else{
          //       restorequiz(theid);
          //     }
          //   })
          //     .then(data => { 
          //       setbook(data)
          //       setloading(false);
          //       history.push('/teacher/');
          //     })
          //     .catch((error) => {
          //       setloading(false);
          //     });
          //     if(book.length>0)
          //     {
          //       setbookpresent(true);
          //     }
          // }

    useEffect(() => {
      fetchCourse();
      fetchDeletedCourse();
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

        <h1>ADD COURSE</h1>
        <label><b>Enter course name:</b>
        <input
          type="text" 
          value={cname}
          onChange={(e) => setcname(e.target.value)}
        />
        </label><br/>
        <label><b>Enter course description:</b>
        <input
          type="text" 
          value={cdes}
          onChange={(e) => setcdes(e.target.value)}
        />
        </label><br/>
        <label>Enter course rating:
        <input
          type='number'
          step="0.1"
          min='0'
          max='5'
          value={crating}
          onChange= {(e) => setcrating(e.target.value)}
        />
        </label><br/>
        <label>Enter course price[in rs or "Free"]:
        <input
          type="text" 
          value={cprice}
          onChange={(e) => setcprice(e.target.value)}
        />
        </label><br/>
        <label><b>Enter course link:</b>
        <input
          type="text" 
          value={clink}
          onChange={(e) => setclink(e.target.value)}
        />
        </label><br/>
        <label>Add course image:
        <input type="file" name="image" accept="image/png, image/jpeg" onChange={imageHandler} />
			{isimgPicked ? (
				<div>
					{/* <p>Image name: {selectedimg.name}</p>
					<p>Image type: {selectedimg.type}</p>
					<p>Size in bytes: {selectedimg.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedimg.lastModifiedDate.toLocaleDateString()}
					</p> */}
          <p><a href={selectedimg}>VIEW IMAGE</a></p>
				</div>
			) : (
				<p>Select a image to show details</p>
			)}
        </label><br/>
        <button onClick={() => createcourse()}>ADD COURSE</button>



        <h1>UPDATE COURSE</h1>


        <h1>REMOVE COURSE</h1>
          {(!loading) && (courses.length>0) ?
          <>
          {
            courses.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                <img classname="bimg" src={item.image} />
                  <p>name: {item.name}</p>
                  <p>description: {item.description}</p>
                  <p>rating: {item.rating}</p>
                  <p>price: {item.price}</p>
                  <a href={item.link}>View Course</a>
                  <br/>
                  <button onClick={() => deletecourse(item.id)}>DELETE COURSE</button>
                </div>
              </a>
              ))
            }
          </>:<>{loading?<p>Cruising the shelves</p>:<p>no course available add course to delete</p>}</>}

          <h1>RESTORE DELETED COURSE</h1>
          {(!delloading) && (delcourses.length>0) ?
          <>
          {
            delcourses.map(item => (
              <a key={item.id}>
                <div classname="dispbook">
                <img classname="bimg" src={item.image} />
                  <p>name: {item.name}</p>
                  <p>description: {item.description}</p>
                  <p>rating: {item.rating}</p>
                  <p>price: {item.price}</p>
                  <a href={item.link}>View Course</a>
                  <br/>
                  <button onClick={() => restorecourse(item.id)}>RESTORE COURSE</button>
                </div>
              </a>
              ))
            }
          </>:<>{delloading?<p>Minning the Bin</p>:<p>no courses deleted previously</p>}</>}
    </div>
</div>
    );
}

export default Tcourse;
