import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import maitbluelogo from "../images/PlaceMinds-logo.png"
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import { useUserData } from '../context/UserDataContext';
import { useAdmin } from '../context/AdminContext';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedin } = useAuth();
    const { isAdmin } = useAdmin();
    const { setisLoggedin } = useAuth();
    const { showalert } = useAlert();
    const { userData } = useUserData();
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('jwtoken')
        setMenuOpen(true)
        setisLoggedin(false)
        showalert("", "Logout Successful", "warning")
    }

    const handleLogin = () => {
        navigate('/login')
        window.location.reload();
    }

    return (
        <nav className=' z-[99999]'>
            <Link to='/' className="title flex"> <img src={maitbluelogo} alt="" className="navlogo" /></Link>

            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul className={menuOpen ? "open" : ""}>
                {
                    !isLoggedin
                        ?
                        <>
                            <li><NavLink to='/signup'>Signup</NavLink></li>
                            <li ><NavLink to='/login' onClick={handleLogin}>Login</NavLink></li>
                        </>
                        :
                        <>
                            <li ><NavLink to='/dashboard'>Dashboard</NavLink></li>
                            {isAdmin && <li><NavLink to='/adddrive'>Add Drive</NavLink></li>}
                            {isAdmin && <li><NavLink to='/controlpanel'>Control Panel</NavLink></li>}
                            <li><NavLink to='/' onClick={handleLogout}>Logout</NavLink></li>
                            <li>
                                <span className="material-symbols-outlined user_icon">
                                    account_circle
                                </span>
                                <p>{userData.name}</p>
                            </li>
                        </>
                }
            </ul>
        </nav>
    )
}

export default Navbar   