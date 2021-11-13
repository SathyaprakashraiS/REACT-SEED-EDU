import React from 'react'

import ReactTable from 'react-table-6';

import 'react-table-6/react-table.css';
function ArtStructure({data}) {
    const fill = [{
        name:'kavin',
        duration:4,
        desc:"hello"
    },
    {
        name:'kavin',
        duration:4,
        desc:"hello"
    }
]

    
    const columns = [{  
        Header: 'Name',  
        accessor: 'name'  
       },{  
       Header: 'Duration',  
       accessor: 'duration'  
       },{
         Header:'Description',
         accessor:'desc'
       }]  
     
    return (
        <div>
           <ReactTable

           data={data}
           columns={columns}
           />
         
            {/* <p>{props.name}</p>
            <p>{props.duration}</p>
            <p>{props.desc}</p> */}
        </div>
    )
}

export default ArtStructure

