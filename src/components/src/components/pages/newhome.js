import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
// import GoogleLogin from 'react-google-login';
// import googleLogin from "../../services/googleLogin"

class NewHome extends Component
{
    render() {
        const { state } = this.props.location
        const isLoggedIn = this.props.location;
        var authenticated=false;
        if(state)
        {
          console.log("Authenticated",state)
          authenticated=true;
        }
        else
        {
          console.log("Not Authenticated")
        }
  return (
    <div>
      {authenticated ? (
        <>
        <p>Logout</p>
        <p>{state.Name}</p>
        <p>{state.email}</p>
        <p>{state.ProviderId}</p>
        <p>{state.auth}</p>
        <img src={state.Image} alt="not found"/>
        </>
      ) : (
        <p>Login</p>
      )}
    </div>
  );
      }
}

export default NewHome;