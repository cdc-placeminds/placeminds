import React, { useState } from 'react'
import profileImage from '../images/userpic.png'; // Make sure the path to your image is correct
import '../css/styles.css'
import { useNavigate } from 'react-router-dom';
import QRCodeGenerator from './Qrcode';
import StdProfile from './StdProfile';
import { useAlert } from '../context/AlertContext';
import Alert from "../Additonal/Alert"
import { useAdmin } from '../context/AdminContext';
import { useUserData } from '../context/UserDataContext';
import { useScannerData } from '../context/ScannerContext';

const Profile = () => {
  const { userData } = useUserData();
  const [imageurl, setimageurl] = useState();
  const [imgurl, setimgurl] = useState();
  const [isOpen, setisOpen] = useState(false);
  const [viewdtl, setviewdtl] = useState({ type: "Student Profile" })
  const [sheets, setsheets] = useState([])
  const { alert, showalert } = useAlert();
  const { isAdmin } = useAdmin();
  const { selectedDrive, setSelectedDrive, isOpenForAll, setIsOpenForAll } = useScannerData()

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

  const handlesubmitsheetname = async () => {

    const url = `${process.env.REACT_APP_BASE_URL}/api/sheetnames`
    const fetchMethods = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      })
    }
    const updateApplied = await fetch(url, fetchMethods);

    var sheetsData = await updateApplied.json();
    setsheets(sheetsData)
    // for (var sheet in sheets) {
    //     console.log(sheets[sheet]);
    // }
  }

  const navigate = useNavigate();

  const adddrivepanel = () => {
    navigate('/adddrive')
  }
  const editdrivepanel = () => {
    navigate('/editdrive')
  }
  const controlpanel = () => {
    navigate('/controlpanel');
  }

  return (
    <div className="col-md-4 mt-[2%]">

      {/* profile div  */}
      <div className='grid grid-flow-row grid-cols-2 bg-white h-[50vh] p-[2%] mt-[1%] border-1 border-solid border-cardborder rounded-xl'>


        <div className="profimgdiv flex flex-col items-center justify-center ">
          <div className="updateprfl">
            <span className="material-symbols-outlined" onClick={() => { setisOpen(true) }}>
              edit
            </span>
          </div>
          {
            imgurl
              ? <img src={imgurl} alt="profile_image" className="shadow-[ #e5e5e5] shadow-sm  w-[100px] h-[100px] rounded-full" />
              : <img src={profileImage} alt="profile_image" className="shadow-[ #e5e5e5] shadow-sm  w-[100px] h-[100px] rounded-full" />
          }

          {/* --------------------Edit Image POPUP Start-------------------- */}
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
                    <button onClick={() => { setisOpen(false) }} className='btn btn-primary mx-2 my-1'>Close</button>
                    <button onClick={handlesubmit} className='btn btn-primary mx-2 my-1'>Upload</button>
                  </div>
                </div>
              </div>

            )
          }
          {/* --------------------Edit Image POPUP End-------------------- */}


        </div>


        <div className="stddetails ">
          <div className="accordion flex flex-col items-center justify-evenly h-full ">

            <button className='btn btn-primary w-[70%]  text-[0.8rem] flex flex-row items-center ' onClick={()=>{setviewdtl({type: "View QR"})}}>
              <span className="material-symbols-outlined text-white ml-0 text-[1.6rem]  h-[25px]">
                qr_code_scanner
              </span>
              View QR
            </button>

            <button className='btn btn-primary w-[70%]  text-[0.8rem] flex flex-row items-center' onClick={()=>{setviewdtl({type: "Student Profile"})}}>
              <span className="material-symbols-outlined text-white ml-0 text-[1.6rem]  h-[25px]">
                badge
              </span>
              Profile
            </button>

            <button className='btn btn-primary w-[70%]  text-[0.8rem] flex flex-row items-center' onClick={()=>{setviewdtl({type: "Placement Detail"})}}>
              <span className="material-symbols-outlined text-white ml-0 text-[1.6rem]  h-[25px]">
                business_center
              </span>
              Extras
            </button>


            {/* For Admin  */}
            {isAdmin && (

              <button className='btn btn-primary w-[70%]  text-[0.8rem] flex flex-row items-center' onClick={()=>{setviewdtl({type: "Admin Panel"})}}>
                <span className="material-symbols-outlined text-white ml-0 text-[1.6rem]  h-[25px]">
                  admin_panel_settings
                </span>
                Admin Panel
              </button>

            )}


          </div>

        </div>

        <div className="stdname col-span-2">
          <h1 className="prname  text-center text-[30px] text-headcolor font-head font-[600]"> {userData.name}</h1>
        </div>


      </div>
      {/* --------------profile ends here ---------- */}


      <div className="grid grid-flow-row bg-white h-[50vh] p-[5%] mt-[1%] border-1 border-solid border-cardborder rounded-xl">

        {viewdtl.type === 'View QR' &&
          <>
            <QRCodeGenerator />
            {/* --------------------Popup Starts-------------------- */}
            <div>
              {isOpen && (
                <div className="popup">
                  <div className="popup-content">
                    {/* Content of the popup */}
                    <div className='comphead'>
                      <h2 className='font-head m-[2%] text-[20px] font-[400]' >QR Scanner</h2>
                    </div>

                    <div className="horline"></div>

                    <form>
                      <div className='compdesc'>
                        <div>
                          <Alert alert={alert} />
                          <label>Choose Drive: </label>
                          <select value={selectedDrive} onChange={(e) => setSelectedDrive(e.target.value)} required>
                            {/* Mapping over the sheets array to create options */}
                            {sheets.map((sheet, index) => (
                              <option key={index} value={sheet}>
                                {sheet}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className='my-[3%]'>
                          <label>Is this drive open for all: </label>
                          <label>Yes</label>
                          <input type='radio' value='true' checked={isOpenForAll === true} onChange={() => setIsOpenForAll(true)} name='isOpenforall' />
                          <label>No</label>
                          <input type='radio' value='false' checked={isOpenForAll === false} onChange={() => setIsOpenForAll(false)} name='isOpenforall' />
                        </div>
                      </div>

                      <div className="horline"></div>

                      <div className="compbtn">
                        <button className='btn btn-secondary mx-2 my-2' onClick={() => { setisOpen(false) }}>Close</button>
                        <button type='submit' className='btn btn-primary mx-2 my-2' onClick={(e) => { if (selectedDrive !== "") { navigate('/qrscanner') } else { showalert("Error: ", "Select Drive", "warning"); e.preventDefault() } }}>Proceed</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
            {/* --------------------Popup Ends-------------------- */}
          </>
        }

        {viewdtl.type === 'Student Profile' &&
          <StdProfile />
        }

        {viewdtl.type === 'Placement Detail' &&
          "Will Be Available Soon"
        }

        {viewdtl.type === "Admin Panel" &&
          <div className='flex flex-col md:flex-col gap-[2px]'>
            <button onClick={adddrivepanel} className='btn btn-primary btn-sm my-1 mx-1 h-[15%] w-[40%]'>Add Drive</button>
            <button onClick={editdrivepanel} className='btn btn-primary btn-sm my-1 mx-1 h-[15%] w-[40%]'>Edit Drive</button>
            <button onClick={controlpanel} className='btn btn-primary btn-sm my-1 mx-1 h-[15%] w-[40%]'>Control Panel</button>
            <button onClick={() => { setisOpen(true); handlesubmitsheetname() }} className='btn btn-primary btn-sm my-1 mx-1 h-[15%] w-[40%]'>Scan QR</button>
          </div>
        }

      </div>

      {/* --------------------------inside this you have to keep sir --------------------- */}
    </div>



  )
}

export default Profile
