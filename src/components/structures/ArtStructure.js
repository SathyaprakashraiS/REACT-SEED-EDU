import React from 'react'
import './CSS/Artstruct.css'


function ArtStructure(props) {
   
     
    return (
        <div>
           
            <div className="CTable">
                
            <p className="cname">{props.name}</p>
            <p className="cname">{props.duration}</p>
            <p className="cname">{props.desc}</p>
            
            </div>
        </div>
    )
}
 
export default ArtStructure

