import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./Navbar.css";
import maitbluelogo from "../Components/images/maitbluelogo.png"
import { useAuth } from './context/AuthContext';
import { useAlert } from './context/AlertContext';
import { useUserData } from './context/UserDataContext';
import { useAdmin } from './context/AdminContext';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const { isLoggedin } = useAuth();
    const { isAdmin } = useAdmin();
    const { setisLoggedin } = useAuth();
    const { showalert } = useAlert();
    const { userData } = useUserData();

    const handleLogout = () => {
        setMenuOpen(true)
        setisLoggedin(false)
        showalert("Success: ", "Logout Successful", "warning")
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
                {
                    !isLoggedin
                        ?
                        <>
                            <li><NavLink to='/signup'>Signup</NavLink></li>
                            <li><NavLink to='/'>Login</NavLink></li>
                        </>
                        :
                        <>
                            <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                            {isAdmin && <li><NavLink to='/adddrive'>Add Drive</NavLink></li>}
                            {isAdmin && <li><NavLink to='/editdrive'>Edit Drive</NavLink></li>}
                            <li><NavLink to='/' onClick={handleLogout}>Logout</NavLink></li>
                            <li>
                                <span className="material-symbols-outlined">
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