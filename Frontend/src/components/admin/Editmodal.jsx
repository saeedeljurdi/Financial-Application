import React from 'react';
import { useEffect, useState } from "react";


const Editmodal = (props) => {

  const [status, setStatus] = useState("");
  const handleEdit = async (e, id) => {
    e.preventDefault();
    const request = await fetch(`http://127.0.0.1:8000/api/admins/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        password: props.pass,
      }),
    });
    const response = await request.json();
    console.log(response);
    setStatus(response.msg);
    props.setRender(!props.render);
  };


    return ( 
        <div>
       <p className='status-edit'> {status} </p>
           <input
         className="new"
         type="password"
         placeholder="New Password"
         onChange={e => props.setPass(e.target.value)}
         
       />
       <br></br>
       <button
         type="submit"
         className="edit-modals"
         onClick={(e) => {
             handleEdit(e,props.id);
             props.setPass('');
             setStatus('');
            }}
       >
         <i className="fa fa-edit"></i>&nbsp;EDIT
       </button>
       <button className="cancel-edit"
       onClick = { () => {
        props.setHide(true);
        props.setPass('');
        setStatus('');
        props.setRender(!props.render);
        }}
       >
       Close
       </button>
        </div>
     );
}
 
export default Editmodal;