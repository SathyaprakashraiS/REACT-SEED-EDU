import React from "react";
import './CSS/pdfView.css'

export function PdfView(props){
 
  
 const pdf = props.pdf


  return (
    <div>
      <iframe src={pdf}
   className="r_pdfViewer"></iframe>
     
    </div>
  );
};

