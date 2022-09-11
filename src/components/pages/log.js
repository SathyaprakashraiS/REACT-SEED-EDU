import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import {GoogleLogin , GoogleLogout} from 'react-google-login';
import googleLogin from "../../services/googleLogin"
import { Redirect } from "react-router-dom";
import Navbar from '../navbar';

class GLogin extends Component
{
  render()
  {
    console.log("overhere")
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
            localStorage.setItem('user',JSON.stringify(googleresponseData));
            console.log("worked");
            this.props.history.push({
                pathname: '/',
                //pathname:'/book',
                state: googleresponseData // your data array of objects
              })

              const request = fetch(`http://127.0.0.1:8000/users-list/`)
              .then(response => {
                if(response.ok)
              {
                console.log("here")
                return response.json(); 
              }
              else{
                console.log("im not here")
              }
            })
              .then(data => {
                localStorage.setItem('apiuser',JSON.stringify(data));
                console.log("api setitem done")
                const apilocdata = JSON.parse(localStorage.getItem('apiuser'));
                const locdata = JSON.parse(localStorage.getItem('user'));
                for(var i=0;i< apilocdata.length;i++)
                {
                  //console.log("data name: ",i,apilocdata[i].email)
                  var checkemail=apilocdata[i].email
                  var logedemail=locdata.email
                  if(checkemail==logedemail)
                    {
                      localStorage.setItem('theuser',JSON.stringify(apilocdata[i]));
                      localStorage.setItem('theuser',JSON.stringify(apilocdata[i]));
                      console.log("user from api: ",apilocdata[i].username)
                      console.log("auto reload")
                      window.location.reload(false);
                    }
                }
              })
              .catch((error) => {
                console.log("the error ",error)
              });

            // const apilocdata = JSON.parse(localStorage.getItem('apiuser'));
            // const locdata = JSON.parse(localStorage.getItem('user'));
            // for(var i=0;i< apilocdata.length;i++)
            //     {
            //       //console.log("data name: ",i,apilocdata[i].email)
            //       var checkemail=apilocdata[i].email
            //       var logedemail=locdata.email
            //       if(checkemail==logedemail)
            //       {
            //         localStorage.setItem('theuser',JSON.stringify(apilocdata[i]));localStorage.setItem('theuser',JSON.stringify(apilocdata[i]));
            //         console.log("user from api: ",apilocdata[i].username)
            //       }
            //     }
          }
            
          
            // const request = fetch(`http://127.0.0.1:8000/users-list/`)
            //   .then(response => {
            //     if(response.ok)
            //   {
            //     console.log("here")
            //     return response.json(); 
            //   }
            //   else{
            //     console.log("im not here")
            //   }
            // })
            //   .then(data => {
            //     localStorage.setItem('apiuser',JSON.stringify(data));localStorage.setItem('apiuser',JSON.stringify(data));
            //   })
            //   .catch((error) => {
            //     console.log("the error ",error)
            //   });

            // const apilocdata = JSON.parse(localStorage.getItem('apiuser'));
            // const locdata = JSON.parse(localStorage.getItem('user'));
            // for(var i=0;i< apilocdata.length;i++)
            //     {
            //       //console.log("data name: ",i,apilocdata[i].email)
            //       var checkemail=apilocdata[i].email
            //       var logedemail=locdata.email
            //       if(checkemail==logedemail)
            //       {
            //         localStorage.setItem('theuser',JSON.stringify(apilocdata[i]));localStorage.setItem('theuser',JSON.stringify(apilocdata[i]));
            //         console.log("user from api: ",apilocdata[i].username)
            //       }
            //     }
              
            
        
        return (
          <>
          <Navbar />
          <div className="App">
            <h1>LOGIN WITH GOOGLE</h1>
            <GoogleLogin
              clientId="576119017330-jpt7fm9m1k2476fd8aadl6lrr4smstd0.apps.googleusercontent.com"
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={responseGoogle}
              onFailure={console.log("login failed")}
            />
          </div>
          </>
        );
      }
 
}

export default GLogin;