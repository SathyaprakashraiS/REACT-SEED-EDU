import React from 'react'
import Navbar from '../navbar';

import './css/home.css'

function home() {
  const userdata = JSON.parse(localStorage.getItem('theuser'));
  return (
    <div className="outer"> 
      <Navbar/>
     <div className="hmain">
      <p>hello {userdata.username}</p>
      {/* {userdata.teacher ? <p>qqq</p>:<p>aaa</p>} */}
    </div>
 
    </div>
  )
}

export default home
