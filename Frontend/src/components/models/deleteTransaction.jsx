import React from 'react';

const DeleteTransaction = (props) => {

    return ( 
        <div className='income-delete'>
        <h1 className='status-del'>{`Are you sure you want to delete ${props.newTitle} and all its contents?`}</h1>
        <button
        className="income-del"
        onClick={e => {
            props.handleDelete(e,props.id);
            props.setShow(false);
        }}
        ><i className="fa">&#xf014;</i> YES</button>
        <button
        className="income-del"
        onClick={() => {
            props.setRender(!props.render);
            props.setShow(false);
        }}
        >NO</button>
        </div>
     );
}
 
export default DeleteTransaction;