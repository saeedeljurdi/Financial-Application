import React from 'react';
import './login.css';
import { useState } from 'react';
import { useHistory } from "react-router-dom";



const Login = (props) => {
    let history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [isShown , setIsShown] = useState(false);

    const toggleVisibility = () =>{
setIsShown(!isShown);
    }


    const handleClick = async (e) => {
        e.preventDefault();
        const request = await fetch('http://127.0.0.1:8000/api/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            });
        const allResponse = await request;
        console.log(allResponse);
        const response = await request.json();
        console.log(response);
        console.log(props);
        if (allResponse.status == '401') {
            setStatus('Wrong username or password');
        } else {
            localStorage.setItem('token', response.access_token);
            history.push('/home');
        }
    }
  
    return ( 
        <div className="login">
        <div className="form">
            <p className="status1">{status}</p>
            <div className="input-container">
            <i className="fa fa-user icon"></i>
            <input className="login-username" type="text" placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            /></div><br />
            <div className="input-container">
            <i className="fa fa-key icon"></i>
            <input style={{position:"relative"}} className="login-password" type={(isShown)? "text" : "password"} placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            /><i style={{position:"absolute" , top:"53.5%", zIndex : 1 , right : '40%' , cursor : 'pointer', color : 'white'}} className="fa fa-eye password-icon" onClick={toggleVisibility}/></div><br />
            <input className="login-submit" type="submit" value="SIGN IN"
                onClick={(e) => handleClick(e)}
            />
            </div>
            </div>
     );
}
 
export default Login;
