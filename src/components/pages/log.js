import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import {GoogleLogin , GoogleLogout} from 'react-google-login';
import googleLogin from "../../services/googleLogin"
import { Redirect } from "react-router-dom";
import Book from './books';

class GLogin extends Component
{
  render()
  {
        const responseGoogle = async(response) => {
            let googleResponse  = await googleLogin(response.accessToken)
            const googleresponseData = {
                Name: response.profileObj.name,
                email: response.profileObj.email,
                token: response.googleId,
                Image: response.profileObj.imageUrl,
                ProviderId: 'Google',
                auth:'true'
              };
            console.log(googleResponse);
            console.log(googleresponseData);
            console.log("worked");
            this.props.history.push({
                pathname: '/newhome',
                  state: googleresponseData // your data array of objects
              })
          }
            
         
        return (
          <div className="App">
            <h1>LOGIN WITH GOOGLE</h1>
            <GoogleLogin
              clientId="576119017330-jpt7fm9m1k2476fd8aadl6lrr4smstd0.apps.googleusercontent.com"
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={console.log("logined"),responseGoogle}
              onFailure={console.log("login failed")}
            />
          </div>
        );
      }
 
}

export default GLogin;