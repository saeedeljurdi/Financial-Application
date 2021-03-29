import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu} from 'react-burger-menu';
import './navbar.css'
import {useHistory } from "react-router-dom";


const Sidenav = () => {
    const history = useHistory();
    const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  }
    return (
        <div id="navz">
        
        <Menu>
            <li><Link className="link" to="/about">MSH GROUP</Link></li>
            <li><Link className="link" to="/home">Home</Link></li>
            <li><Link className="link" to="/income">INCOME</Link></li>
            <li><Link className="link" to="/expenses">EXPENSES</Link></li>
            <li><Link className="link" to="/categories">CATEGORIES</Link></li>
            <li><Link className="link" to="/admin">ADMINS</Link></li>
            {/*<li><Link className="link" to="/about">ABOUT US</Link></li>*/}
            <li><button className="logout" onClick={e=> handleLogout(e)}>LOGOUT <i class="fas fa-arrow-alt-circle-right"></i></button></li>
        </Menu>
        
        </div>
    )
}

export default Sidenav;