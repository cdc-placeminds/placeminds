import React from 'react'
import profileImage from './images/profileimg.png'; // Make sure the path to your image is correct
import './css/styles.css'

const Profile = () => {
  return (
      <div className="col-md-4 profile">
      <div className="profimgdiv">
        <img src={profileImage} alt="profile_image" className="profimg" />
       <h1 className="prname"> Kavya Singhal</h1>
      </div>


    </div>
    
  )
}

export default Profile
