import React, { useState } from 'react'
import profileImage from '../images/userpic.png'; // Make sure the path to your image is correct
import '../css/styles.css'
import ProfileAccordian from './ProfileAccordian';
import { useUserData } from '../context/UserDataContext';

const Profile = () => {
  const { userData } = useUserData();
  const [imageurl, setimageurl] = useState();
  const [imgurl, setimgurl] = useState();
  const [isOpen, setisOpen] = useState(false)

  const handleinput = (e) => {
    setimageurl(e.target.files[0])
  }

  const modifyCloudinaryUrl = (originalUrl) => {
    // Split the original URL into parts
    const parts = originalUrl.split('/');

    // Find the index of "upload" in the URL
    const uploadIndex = parts.findIndex(part => part === 'upload');

    if (uploadIndex !== -1) {
      // Insert the desired transformation parameters after "upload"
      parts.splice(uploadIndex + 1, 0, 'c_thumb,g_faces,h_200,w_200');
    }

    // Join the parts back together to create the modified URL
    const modifiedUrl = parts.join('/');
    console.log(modifiedUrl)
    return modifiedUrl;
  };

  const handlesubmit = () => {
    const data = new FormData();
    data.append("file", imageurl)
    data.append("upload_preset", "user_profileimg_prm")
    data.append("cloud_name", "daw345b5a")

    fetch(process.env.REACT_APP_EDIT_IMG, {
      method: "POST",
      body: data
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const newurl = modifyCloudinaryUrl(data.url)
        setimgurl(newurl)
      }).catch((err) => {
        console.log(err)
      })

      setisOpen(false)


  }

  return (
    <div className="col-md-4 profile">
      <div className="profimgdiv flex flex-col items-center">
        <div className="updateprfl">
          <span className="material-symbols-outlined" onClick={() => { setisOpen(true) }}>
            edit
          </span>
        </div>
        {
          imgurl
            ? <img src={imgurl} alt="profile_image" className="profimg" />
            : <img src={profileImage} alt="profile_image" className="profimg" />
        }

        {/* --------------------Edit Image POPUP End-------------------- */}
        {
          isOpen && (
            <div className="popup">
              <div className="popup-content">
                <div className='comphead'>
                  <h2 className='font-head m-[2%] text-[20px] font-[400]' >Edit Profile</h2>
                </div>

                <div className="horline"></div>
                <div className='my-[3%]'>
                  <input type='file' onChange={handleinput} />
                </div>
                <div className="horline"></div>
                <div>
                  <button onClick={()=>{setisOpen(false)}} className='btn btn-primary mx-2 my-1'>Close</button>
                  <button onClick={handlesubmit} className='btn btn-primary mx-2 my-1'>Upload</button>
                </div>
              </div>
            </div>

          )
        }
        {/* --------------------Edit Image POPUP End-------------------- */}


        <h1 className="prname text-[30px] text-headcolor font-[600]"> {userData.name}</h1>
      </div>
      <div className="stddetails">
        <ProfileAccordian />
      </div>


    </div>

  )
}

export default Profile
