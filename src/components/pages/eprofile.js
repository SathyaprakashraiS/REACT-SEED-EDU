import React,{useState,useEffect, Component } from 'react';
import Navbar from '../navbar';
import { Link, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import './css/eprofile.css'



function Eprofile() {
    let history = useHistory();
    const [newname, setnewname] = useState("");
    const [newstatus, setnewstatus] = useState("");
    const [newstandard, setnewstandard] = useState("");
    const [newcontactnumber, setnewcontactnumber] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [selectedimg, setSelectedimg] = useState();
    const [isimgPicked, setIsimgPicked] = useState(false);
    const [isstaffstatchanged, setisstaffstatchanged] = useState(false);
    const [isstudentstatchanged, setisstudentstatchanged] = useState(false);
    const [ishidestatuschanged, sethidestatuschanged] = useState(false);
    const [isadvertisestatchanged, setisadvertisestatchanged] = useState(false);
    const [ishelptatchanged, setishelptatchanged] = useState(false);
    const [teacher,setteacher]=useState(false);
    const [student,setstudent]=useState(false);
    const [hidestatus,sethidestatus]=useState(false);
    const [advertisestatus,setadvertisestatus]=useState(false);
    const [helpstatus,sethelpstatus]=useState(false);
    const fileHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);        
      };
    const imageHandler = (event) => {
        setSelectedimg(event.target.files[0]);
        setIsimgPicked(true);        
      };
      const staffstatusHandler = () => {
        setteacher(true);
        setisstaffstatchanged(true);        
      };
      const studentstatusHandler = () => {
        setstudent(true);
        setisstudentstatchanged(true);        
      };
      const hidestatusHandler = () => {
        sethidestatus(true);
        sethidestatuschanged(true);        
      };
      const advertisestatusHandler = () => {
        setadvertisestatus(true);
        setisadvertisestatchanged(true);        
      };
      const helpstatusHandler = () => {
        sethelpstatus(true);
        setishelptatchanged(true);        
      };
    
    function postupdate()
    {
      let form_data= new FormData();
      if(newname!="")
      {
        form_data.append('username',newname);
      }
      if(newstatus!="")
      {
        form_data.append('status',newstatus);
      }
      if(newstandard!="")
      {
        form_data.append('standard',newstandard);
      }
      if(isimgPicked==true)
      {
        form_data.append('img',selectedimg);
      }
      if(isFilePicked==true)
      {
        form_data.append('resume',selectedFile);
      }
      if(newname=="")
      {
        form_data.append('username',userdata.username);
      }
      if(isstaffstatchanged && !isstudentstatchanged)
      {
        form_data.append('upgreq',teacher);
      }
      if(!isstaffstatchanged && isstudentstatchanged)
      {
        form_data.append('upgreq',student);
      }
      if(isstaffstatchanged && isstudentstatchanged)
      {
        form_data.append('teacher',false);
      }
      if(!isstaffstatchanged && !isstudentstatchanged)
      {
        form_data.append('teacher',userdata.teacher);
      }
      if(ishidestatuschanged)
      {
        form_data.append('hide',hidestatus);
      }
      if(!ishidestatuschanged)
      {
        form_data.append('hide',userdata.hide);
      }
      if(newcontactnumber!="")
      {
        form_data.append('contactnumber',newcontactnumber);
      }
      if(isadvertisestatchanged)
      {
        form_data.append('advertise',advertisestatus);
      }
      if(ishelptatchanged)
      {
        form_data.append('needassist',helpstatus);
      }
      form_data.append('password',"thepassword");
      let resurl=`http://127.0.0.1:8000/updateprofile/`+userdata.email;
      axios.post(resurl, form_data,
        {
          headers:
          {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data);
          alert('USER DETAILS HAS BEEN UPDATED!')
          localStorage.clear(); //for localStorage
          sessionStorage.clear(); //for sessionStorage
          history.push("/");  
        })
        .catch(err => {
          console.log(err)
          alert('RE-CHECK YOUR DETAILS DETAILS, FAILED TO UPDATE DATA TO THE DATABASE')
        })
      }
    function pushout()
    {
        history.push("/");
    }
    function goback()
    {
        history.push("/")
    }
  const userdata = JSON.parse(localStorage.getItem('theuser'));
  return (
    <>
    {userdata?
        <>
            {/* <div className="outer">  */}
                <Navbar/>
                <div className="hmain">
                    <div className="pagemain">
                    {userdata.teacher?<>
                      <>
                      <p>TEACHER</p>
                      <div className="sbox">
                      <label>standard:
                  <select onChange={(e) => setnewstandard(e.target.value)}>
                    <option value="10">select pls</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </label><br/>
                <label>user name:(username must contain only letters number and special charecters not spaces)
                  <input
                    type="text" 
                    value={newname}
                    onChange={(e) => setnewname(e.target.value)}
                  />
                  </label><br/>
                  <label>status:
                  <input
                    type="text" 
                    value={newstatus}
                    onChange={(e) => setnewstatus(e.target.value)}
                  />
                  </label><br/>
                  <label>contact number:
                  <input
                    type="text" 
                    value={newcontactnumber}
                    onChange={(e) => setnewcontactnumber(e.target.value)}
                  />
                  </label><br/>
                  <label>Add image to update DP:<br/>
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
          {/* <p><a href={selectedimg}>VIEW IMAGE</a></p> */}
				</div>
			) : (
				<p>Select a image to show details</p>
			)}</label>
                  <label>attach new resume to attach update old-resume details:<br/>
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
                    {/* <p><a href={selectedFile}>VIEW FILE</a></p> */}
                  </div>
                ) : (
                  <p>Select a file to show details</p>
                )}
                  </label><br/>
                  <label><b>teacher:</b><input type="checkbox" name="staffstatus" onChange={staffstatusHandler} /></label><br/>
                  <label><b>student:</b><input type="checkbox" name="studentstatus" onChange={studentstatusHandler} /></label><br/>
                  <label><b>hide status:</b><input type="checkbox" name="hidestatus" onChange={hidestatusHandler} /></label><br/>
                  <label><b>ADVERTISE:</b><input type="checkbox" name="advertstatus" onChange={advertisestatusHandler} /></label><br/>
                  
                        <button onClick={()=>postupdate()}>update details</button>
                    </div>
                    <button onClick={()=>goback()}>Go back</button>
                      
                      </>
                      </>:
                      <>
                      <p>STUDENT</p>
                      <div className="sbox">
                      <label>standard:
                  <select onChange={(e) => setnewstandard(e.target.value)}>
                    <option value="10">select pls</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </label><br/>
                <label>user name:(username must contain only letters number and special charecters not spaces)
                  <input
                    type="text" 
                    value={newname}
                    onChange={(e) => setnewname(e.target.value)}
                  />
                  </label><br/>
                  <label>status:
                  <input
                    type="text" 
                    value={newstatus}
                    onChange={(e) => setnewstatus(e.target.value)}
                  />
                  </label><br/>
                  <label>contact number:
                  <input
                    type="text" 
                    value={newcontactnumber}
                    onChange={(e) => setnewcontactnumber(e.target.value)}
                  />
                  </label><br/>
                  <label>Add image to update DP:<br/>
        <input type="file" name="image" accept="image/png, image/jpeg" onChange={imageHandler} />
			{isimgPicked ? (
				<div>
					<p>Image name: {selectedimg.name}</p>
					<p>Image type: {selectedimg.type}</p>
					<p>Size in bytes: {selectedimg.size}</p>
					{/* <p>
						lastModifiedDate:{' '}
						{selectedimg.lastModifiedDate.toLocaleDateString()}
					</p> */}
          {/* <p><a href={selectedimg}>VIEW IMAGE</a></p> */}
				</div>
			) : (
				<p>Select a image to show details</p>
			)}</label>
                  <label><b>teacher:</b><input type="checkbox" name="staffstatus" onChange={staffstatusHandler} /></label><br/>
                  <label><b>student:</b><input type="checkbox" name="studentstatus" onChange={studentstatusHandler} /></label><br/>
                  <label><b>hide status:</b><input type="checkbox" name="hidestatus" onChange={hidestatusHandler} /></label><br/>
                  <label><b>NEED ASSIST:</b><input type="checkbox" name="helpreqstatus" onChange={helpstatusHandler} /></label><br/>
  
                        <button onClick={()=>postupdate()}>update details</button>
                    </div>
                    <button onClick={()=>goback()}>Go back</button>
                      
                      </>
                    }
                    
                </div>
            </div>
        </>:
        <>
            {pushout()}
        </>
    }
    </>
  )
}

export default Eprofile
