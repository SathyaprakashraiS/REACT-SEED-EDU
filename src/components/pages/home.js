import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import Navbar from '../navbar';
class Home extends Component
{
  render()
  {
    return (
      <>
      <Navbar />
    <div className="App">
      <p></p>
      </div>
      </>
      );
  }
}

export default Home;