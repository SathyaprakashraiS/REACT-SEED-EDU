import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
// import GoogleLogin from 'react-google-login';
// import googleLogin from "../../services/googleLogin"

class NewHome extends Component
{
    render() {
        const { state } = this.props.location
        return (
            <div>
         <p>{state.Name}</p>
         <img src={state.Image} alt="not found"/>
         </div>
        )
      }
    // return(
    //     <>
    //     <p>hello</p>
    //     <Link to="/book" className="navbar-links">Book</Link>
    //    

    //     </>
    // );
}

export default NewHome;