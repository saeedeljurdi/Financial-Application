import React from 'react';
import { Link , useHistory } from "react-router-dom";
import './navbar.css'

function Navbar(){
    const history = useHistory();
    const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  }
    return(
        <div className='navbar'>
            <ul className="nav-items">
                <li>
                <Link to="/about">MSH GROUP</Link>
                </li>
                <li>
                    <Link to="/home">HOME</Link>
                </li>
                <li>
                    <Link to="/income">INCOME</Link>
                </li>
                <li>
                    <Link to="/expenses">EXPENSES</Link>
                </li>
                <li>
                    <Link to="/categories">CATEGORIES</Link>
                </li>
                <li>
                    <Link to="/admin">ADMINS</Link>
                </li>
                {/*<li>
                    <Link to="/about">ABOUT US</Link>
                </li>*/}
                <li>
                    <button className="logout" onClick={e=> handleLogout(e)}>LOGOUT <i class="fas fa-arrow-alt-circle-right"></i></button>
                </li>
              
            </ul>
    </div>
    )
}
export default Navbar;