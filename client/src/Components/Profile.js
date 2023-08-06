import React from 'react'
import profileImage from './images/userpic.png'; // Make sure the path to your image is correct
import './css/styles.css'
import ProfileAccordian from './ProfileAccordian';

const Profile = ({ userData }) => {
  return (
    <div className="col-md-4 profile">
      <div className="profimgdiv">
        <img src={profileImage} alt="profile_image" className="profimg" />
        <h1 className="prname"> {userData.name}</h1>
      </div>
      <div className="stddetails">
        <ProfileAccordian userData={userData} />
      </div>


    </div>

  )
}

export default Profile
