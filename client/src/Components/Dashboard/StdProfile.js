import React from 'react'
import { useUserData } from '../context/UserDataContext'
import { useNavigate } from 'react-router-dom';

const StdProfile = () => {
    const { userData } = useUserData();
    const navigate = useNavigate();

const editprofile = () => {
    navigate("/signup")

}

    return (
        <div>
            <div>
                <button type='button' className='btn btn-primary btn-sm' onClick={editprofile}>Edit Profile</button>
            </div>

            <div className='stdprfl'>

                <div className="stdprfl_head">
                    <p>Full Name        :</p>
                    <p>Enrollment No    :</p>
                    <p>Contact No       :</p>
                    <p>Email Id         :</p>
                    <p>Branch           :</p>
                    <p>Passing Year     :</p>
                </div>
                <div className="stdprfl_body">
                    <p>{userData.name}</p>
                    <p>{userData.enrollment}</p>
                    <p>{userData.contact}</p>
                    <p>{userData.email}</p>
                    <p>IT</p>
                    <p>2024</p>
                </div>

            </div>
        </div>
    )
}

export default StdProfile