import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
class Home extends Component
{
 

    render() {
      
      const locdata = JSON.parse(localStorage.getItem('user'));
      console.log(locdata)
            
        if(locdata!= null ){
        return (
          
          <div className="App">
            <Link to="/book" className="navbar-links">Book</Link>
            <Link to="/login" className="navbar-links">login</Link>
            <p>{locdata.Name}</p>
            <img src={locdata.Image}/>
          
          </div>
          
        );
        }
        return(
          <div className="App">
            <p>Not logged  in</p>
            <Link to="/login" className="navbar-links">login</Link>
          </div>
        )
      }
  
}

export default Home;