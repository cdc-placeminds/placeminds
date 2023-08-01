import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./Navbar.css";
import maitbluelogo from "../Components/images/maitbluelogo.png"
var isLoggedin = false;

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav>
            <Link to='/' className="title"> <img src={maitbluelogo} alt="" className="navlogo" />CDC Portal</Link>

            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul className={menuOpen ? "open" : ""}>
            {!isLoggedin?<><li><NavLink to='/signup'>Signup</NavLink></li>
                <li><NavLink to='/'>Login</NavLink></li></>:<><li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/about'>About</NavLink></li>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li><li><NavLink to='/'>Logout</NavLink></li></>}
                
            </ul>
        </nav>
    )
}

export default Navbar