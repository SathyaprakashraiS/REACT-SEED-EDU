import React from 'react'
import { FaUniversity } from 'react-icons/fa';
import Navbar from '../navbar';

import './css/home.css'
{/* <Link to="/" className="navbar-links">
HOME
</Link> */}

function home() {
  return (
    <div className="outer">  
      <Navbar/>
     <div className="hmain">
      <p>hello</p>
    </div>
    
    <div className='hban_out'>
      <div className='hban_title'>
          <div className='hban_icons'>
          <FaUniversity/>
           
          </div>
      </div>
      <div className='hban_inner'>

      </div>
    </div>
    </div>
  )
}

export default home
