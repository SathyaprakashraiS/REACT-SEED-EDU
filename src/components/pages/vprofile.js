import React from 'react'
import Navbar from '../navbar';
import { Link, Redirect, useHistory } from 'react-router-dom';

import './css/vprofile.css'

function Vprofile() {
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
                <p>view profile</p>
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

export default Vprofile
