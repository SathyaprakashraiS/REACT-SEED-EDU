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
      //var isSelected=false;
      
        const [selectedFile, setSelectedFile] = useState();
        const [isFilePicked, setIsFilePicked] = useState(false);
        const changeHandler = (event) => {
          setSelectedFile(event.target.files[0]);
          setIsFilePicked(true);        
        };
        function sendsaveans(){
          let form_data= new FormData();
          form_data.append('studentname',userdata.username);
          form_data.append('semail',userdata.email);
          form_data.append('sgrade',userdata.standard);
          //form_data.append('stest',quizid);
          form_data.append('answersheet',selectedFile);
          console.log("FORM DATA: ",selectedFile)
          let resurl=`http://127.0.0.1:8000/mockrresult-list/`+userdata.email+'/';
          axios.post(resurl, form_data, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log(err))
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
    
    
    <h1><b>MOCK EXAM</b></h1>
    <div className="qmain">
    {
    qp.map(item => (
      <a key={item.id}>
          <div className="qcard">
        <b>{item.mockpapername}</b><br/>
        <b>{item.paperdescription}</b><br/>
        <b>{item.totalmarks}</b><br/>
        <button >SUBMIT</button>
        </div>
      </a>
      ))
    }
    </div>
    <br/><br/><br/>

<h1>HTML FORM</h1>
    <form>
   <label for="studentname">Student Name:</label>
   <input type="text" id="studentname" name="studentname" value={userdata.username} readonly /><br/>
   <label for="semail">Email:</label>
   <input type="text" id="semail" name="semail" value={userdata.email} readonly /><br/>
   <label for="sgrade">Grade:</label>
   <input type="text" id="sgrade" name="sgrade" value={userdata.standard} readonly /><br/>
   <label for="testname">Exam Name:</label>
   <input type="text" id="testname" name="testname" value="testname" readonly /><br/>
   <label for="totalmarks">Total Marks:</label>
   <input type="text" id="totalmarks" name="totalmarks" value="{{i.totalmarks}}" readonly /><br/>
   <input type="file" id="answersheet" name="answersheet" />
 
  <br/>
  <button >Upload</button>
</form>
    <br/><br/><br/>

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
			<div>
				<button onClick={handleSubmission}>Submit</button>sendsaveans
			</div>
		</div>
    <button onClick={() => sendsaveans()}>API REQ</button>
    <br/><br/><br/>

      
  
    </div>
   

    
    </div>
    );
}

export default Mock;