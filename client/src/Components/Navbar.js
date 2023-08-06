import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./Navbar.css";
import maitbluelogo from "../Components/images/maitbluelogo.png"
// var isLoggedin = true;

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedin, setisLoggedin] = useState(true);

    const handleLogout = () => {
        setisLoggedin(false);
    }

    return (
        <nav>
            <Link to='/' className="title"> <img src={maitbluelogo} alt="" className="navlogo" />CDC Portal</Link>

            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul className={menuOpen ? "open" : ""}>
                {!isLoggedin ? <><li><NavLink to='/signup'>Signup</NavLink></li>
                    <li><NavLink to='/'>Login</NavLink></li></> : <>
                    <li><NavLink to='/dashboard'>Dashboard</NavLink></li><li><NavLink to='/' onClick={handleLogout}>Logout</NavLink></li></>}

            </ul>
        </nav>
    )
}

export default Navbar