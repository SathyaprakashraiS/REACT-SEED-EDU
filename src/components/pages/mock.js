import React,{useState,useEffect, Component } from 'react';
import './shome.css';
import { GoogleLogout } from 'react-google-login';
import axios from 'axios';
import SNavbar from './snavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

function Mock(){
  let history = useHistory();

    const logout = ()=>{
        localStorage.clear(); //for localStorage
        sessionStorage.clear(); //for sessionStorage
        // window.location.reload(false);
        return(
            <Redirect to="/"/>
        )
      }
      const userdata = JSON.parse(localStorage.getItem('theuser'));
      const mockid = JSON.parse(localStorage.getItem('mockid'));
      const mockname = JSON.parse(localStorage.getItem('mockname'));
      const mockmark = JSON.parse(localStorage.getItem('mockmark'));
      //var isSelected=false;
      
        const [selectedFile, setSelectedFile] = useState();
        const [isFilePicked, setIsFilePicked] = useState(false);
        const changeHandler = (event) => {
          setSelectedFile(event.target.files[0]);
          setIsFilePicked(true);        
        };
        function sendsaveans()
        {
          let form_data= new FormData();
          form_data.append('studentname',userdata.username);
          form_data.append('semail',userdata.email);
          form_data.append('sgrade',userdata.standard);
          form_data.append('testname',mockname);
          form_data.append('totalmarks',mockmark);
          form_data.append('answersheet',selectedFile);
          form_data.append('tempo',2315);
          console.log("FORM DATA: ",selectedFile)
          let resurl=`http://127.0.0.1:8000/mockrresult-list/`+userdata.email+'/';
          axios.post(resurl, form_data, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
          .then(res => {
            console.log(res.data);
            history.push("/student/");
          })
          .catch(err => console.log(err))
          history.push("/student/");
        }
        const handleSubmission = () => {
        };
      

      // const formik = useFormik({
      //   initialValues: {
      //     Id: `${userdata.username}`,
      //     Name: `${userdata.email}`,
      //     Location: `${userdata.standard}`,
      //     Salary:`${userdata.username}`,
      //     File:''
      //   },
      //   onSubmit: values => {
      //     alert(JSON.stringify(values));
      //   },
      // });

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
     
      const [qp,setqp] = useState([]);

      async function savetempo(stand)
      {
        var attlink=`http://127.0.0.1:8000/mocktempo-list/`+mockname+'/'+userdata.email+'/';
          const request = await fetch(attlink)
            .then(response => {
              if(response.ok)
            {
              return response.json(); 
            }
            else{
              console.log("im not here")
            }
          })
            .then(data => {
              // setatt(data)
              if(data.length!=0)
              {
                alert("U CHEAT RELOAD PANRIYA DA BODYSODA");
                history.push("/student");
              }
              else
              {
                let form_data= new FormData();
                alert("FIRST TIME");
                form_data.append('studentname',userdata.username);
                form_data.append('testname',mockname);
                form_data.append('semail',userdata.email);
                form_data.append('sgrade',userdata.standard);
                form_data.append('totalmarks',mockmark);
                let resurl=`http://127.0.0.1:8000/mockrresult-list/`+userdata.email+'/';
                axios.post(resurl, form_data, {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                })
              }
            })
            .catch((error) => {
              console.log("the error ",error)
            });
      }
      async function fetchQpaper(stand) {
            var apiavail=false;
            var qplink=`http://127.0.0.1:8000/mockqp-list/`+mockid+'/';
            const request = await fetch(qplink)
              .then(response => {
                if(response.ok)
              {
                console.log("here")
                apiavail=true;
                return response.json(); 
              }
              else{
                console.log("im not here")
              }
            })
              .then(data => {
                setqp(data)
                console.log(setqp)
              })
              .catch((error) => {
                console.log("the error ",error)
              });
            }
            

          

               
    
    useEffect(() => {
      savetempo();
      fetchQpaper();
    }, []);

      console.log(userdata)
          let center={
              marginLeft:'45%',
          };
            
return(
    
    <div className="main">
    <SNavbar/>
    <div className="inmain">
    <h1 style={center}><b>|_o_|</b></h1>

    {/* <div>
    <h2>Enter Employee Details...</h2>
    <form onSubmit={formik.handleSubmit}>
      <p>
      <label htmlFor="Id">Student name </label>
      <input
        id="Id"
        name="Id"
        type="text"
        //onChange={formik.handleChange}
        value={formik.values.Id}
        readonly />
      </p>
      
      <p>
      <label htmlFor="Name">email </label>
      <input
        id="Name"
        name="Name"
        type="text"
        //onChange={formik.handleChange}
        value={formik.values.Name}
        readonly />
      </p>
      <p>
      <label htmlFor="Location">grade </label>
      <input
        id="Location"
        name="Location"
        type="text"
        //onChange={formik.handleChange}
        value={formik.values.Location}
        readonly />
      </p>
      <p>
      <label htmlFor="Salary">examname </label>
      <input
        id="Salary"
        name="Salary"
        type="text"
        //onChange={formik.handleChange}
        value={formik.values.Salary}
        readonly />
      </p>

      <input type="file" id="answersheet" name="answersheet"/>


      <button type="submit">Submit</button>
    </form>
    </div> */}


<div>
			<input type="file" name="file" onChange={changeHandler} />
			{
      isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
          <p><a href={selectedFile}>READ FILE</a></p>
          <button onClick={() => sendsaveans()}>SUBMIT</button>
				</div>
			) : (
        <div>
				<p>Select a file to show details</p><br/><br/>
        <p>Submit button only gets enabled when a file is attached</p>
        </div>
			)

      }
			{/* <div>
				<button onClick={handleSubmission}>Submit</button>sendsaveans
			</div> */}
		</div>
    {/* <button onClick={() => sendsaveans()}>SUBMIT</button> */}
    <br/><br/><br/>

      
  
    </div>
   

    
    </div>
    );
}

export default Mock;