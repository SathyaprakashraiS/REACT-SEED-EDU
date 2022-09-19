import React from 'react'
import Navbar from '../navbar';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './css/eprofile.css'



function Eprofile() {
    let history = useHistory();
    function pushout()
    {
        history.push("/");
    }
  const userdata = JSON.parse(localStorage.getItem('theuser'));
  return (
    <>
    {userdata?
        <>
            <div className="outer"> 
                <Navbar/>
                <div className="hmain">
                <p>edit profile</p>
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
