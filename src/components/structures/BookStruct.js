import React from 'react'
import './CSS/BookStruct.css'

function BookStruct(props) {
    var host = "127.0.0.1:8000"
    return (
        <div className="books">
            <div className="face front">
             <div className="im">
                    <img src={props.img}/>
                </div>
             <div className="info">
                 <p>{props.subject}</p>
                 <p>{props.name}</p>
                 <p>{props.author}</p>
                 
             </div>
            
            </div>
            <div className="face back">
                  <h1>About</h1>
                  <a href={"http://127.0.0.1:8000"+props.file}>Read</a>
            </div>
        </div>
    )
}

export default BookStruct
