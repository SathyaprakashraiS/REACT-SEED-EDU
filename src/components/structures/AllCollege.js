import React from 'react'
import './CSS/AllCollege.css'
import {useState,useEffect, Component } from 'react';

function AllCollege(props) {
    // const [city,setCity] = useState([])

    // const SortCity = (vcity) =>{
       
    //     for(var i in props.data){
    //         if(props.data.city === vcity){
    //             // console.log(props.data.name)
    //             setCity(props.data.name)
    //         }
            
    //     }
    // }

    // for(var i in city){
    //     console.log(city)
    // } 
    // useEffect(() => {
    //     SortCity();
    //   }, []);
    
    
    return (
        <div>
           
            <div className="Table">
                
            <p className="cname">{props.name}</p>
            <p className="city">{props.city}</p>
            <p className="state">{props.state}</p>
            <p className="rating">{props.rating}</p>
            </div>
        </div>
    )
}

export default AllCollege
