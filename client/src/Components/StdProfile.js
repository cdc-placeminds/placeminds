import React from 'react'

const StdProfile = ({userData}) => {
    return (
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
    )
}

export default StdProfile