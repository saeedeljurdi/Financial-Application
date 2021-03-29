import React from 'react';
import './about.css';
import Navbar from '../navbar/navbar';
import Sidenav from '../navbar/Sidenav';

function About(){
    return(
        <div className='about'>
        <style>{'body { background-color: #1f2235; }'}</style>
            <Navbar/>
           <Sidenav />
           <div className="founders">
                <h1>FOUNDERS</h1><br />
                <h1>SAEED EL JURDI</h1><br />
                <h1>MANAL JABER SHEHAYEB</h1><br />
                <h1>HAMIDA DRIBIKA</h1><br />
           </div>
        </div>
    )
}
export default About;