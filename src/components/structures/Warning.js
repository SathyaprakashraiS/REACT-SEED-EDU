import React from 'react';
import "./CSS/warning.css"

const Warning = (props)=> {
  return (
      <div className="warning_div">
          <p>{props.count}</p>
      </div>
  );
}

export default Warning;
