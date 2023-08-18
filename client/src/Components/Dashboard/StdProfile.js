import React, { useState } from 'react'
import { useUserData } from '../context/UserDataContext'
import { useAlert } from '../context/AlertContext'

const StdProfile = () => {
    const [isOpen, setisOpen] = useState(false)
    const [OtpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const { userData } = useUserData();
    const { showalert } = useAlert();
    const [updateddata, setData] = useState({
        name: userData.name, email: userData.email, enrollment: userData.enrollment, contact: userData.contact, branch: "", year: "", id: userData._id
    })


    const handleInputs = ({ currentTarget: input }) => {
        setData({ ...updateddata, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --------------------------------------EMAIL VERIFICATION USING OTP-------------------------------------------

        const message = {
            email: updateddata.email
        }

        fetch('http://localhost:8080/api/mailsend/sendotp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Email sent:', data);
                //   otp is sent 
                setOtpSent(data.otpSent);
                if (data.otpSent) {
                    showalert("Success:", "OTP Sent check mail", "success")

                }
                else {
                    console.log("checking if otp is sent " + data.otpSent);
                    showalert("Error:", "Invalid Details", "warning")

                }
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });

    }
    // ---------------------------------------------------------------------------------


    // handleSubmit ended 

    // --------------------------------------Verifying OTP Backend Fetch API-------------------------------------
    const handleVerifyOTP = () => {
        const verfotpfor = { email: updateddata.email, enteredOtp: otp }
        fetch("http://localhost:8080/api/mailsend/verifyotp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(verfotpfor)
        })
            .then(response => response.json())
            .then(async data => {
                if (data.status === 200) {
                    showalert("Success:", data.message, "success");
                   
                    setOtpVerified(true);
                    console.log("otp verified "+otpVerified);

                    // -----------------------------------UPDATE DETAILS IN BACKEND FETCH API----------------------------------------------


                    //Backend URL
                    const url = "http://localhost:8080/api/users/update";
                    //Fetch Api Methods Defining
                    const fetchMethods = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            updateddata
                        })
                    }
                    //Calling Fetch API
                    const res = await fetch(url, fetchMethods);

                    //If registration is successfull
                    if (res.status === 201) {
                        setisOpen(false)
                        showalert("Success:", "Update Successful", "success")
                        console.log("Update Successful")
                        window.location.reload();
                    }

                    // //Checking If any error occured 
                    else if (res.status === 422) {
                        setisOpen(false)
                        showalert("Error:", "User Not Found", "warning")
                        console.log("Update Unsuccessful")
                    }

                    else {
                        setisOpen(false)
                        showalert("Error:", "Server Error", "warning")
                        console.log("Update Unsuccessful")
                    }
                }
                // Set your state variable (otpVerified) to true if needed
                else {
                    showalert("Error:", data.message, "warning");
                }

            })
            .catch(error => {
                console.log("error in verify otp" + error);

            })


        // Here, you can implement the logic to verify the entered OTP.
        // For the sake of the example, let's simulate OTP verification after 2 seconds.

    };

    // ---------------------------------------------------------------------------------



    return (
        <div>
            <div className="updateprfl">
                <p>Edit Profile</p>
                <span className="material-symbols-outlined" onClick={() => { setisOpen(true) }}>
                    edit
                </span>
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

            {/* --------------------Edit Popup Starts-------------------- */}
            {isOpen && !OtpSent && (
                <div className="popup">
                    <div className="popup-content">
                        {/* Content of the popup */}
                        <div className='comphead'>
                            <h2>Edit Profile</h2>
                        </div>

                        <div className="horline"></div>

                        <form>
                            <div className="sgnbody">
                                <div>

                                    <p>FULL NAME</p>
                                    <input id='inptbox' name='name' value={updateddata.name} onChange={handleInputs} type='text'></input>
                                    <p>EMAIL ADDRESS</p>
                                    <input id='inptbox' name='email' value={updateddata.email} onChange={handleInputs} type='email'></input>
                                    <p>BRANCH</p>
                                    <input id='inptbox' name='branch' value={updateddata.branch} onChange={handleInputs} type='text'></input>

                                </div>
                                <div>
                                    <p>ENROLLMENT NO</p>
                                    <input id='inptbox' name='enrollment' value={updateddata.enrollment} readOnly type='text' inputMode='numeric'></input>
                                    <p>CONTACT NO</p>
                                    <input id='inptbox' name='contact' value={updateddata.contact} onChange={handleInputs} type='text' inputMode='numeric'></input>
                                    <p>YEAR</p>
                                    <input id='inptbox' name='year' value={updateddata.year} onChange={handleInputs} type='text'></input>
                                </div>
                            </div>

                            <div className="horline"></div>

                            <div className="compbtn">
                                <button className='btn btn-secondary mx-2 my-2' onClick={() => { setisOpen(false) }}>Close</button>
                                <button type='submit' className='btn btn-primary mx-2 my-2' onClick={handleSubmit}>Save</button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
            {/* --------------------Popup Ends and otp sent-------------------- */}
            {/* --------------------Verifying OTP POPUP Start-------------------- */}

            {
                isOpen && OtpSent && !otpVerified && (
                    <div className="popup">
                        <div className="popup-content">
                            <div className='comphead'>
                                <h2>Edit Profile</h2>
                            </div>

                            <div className="horline"></div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <button onClick={handleVerifyOTP}>Verify OTP</button>
                            </div>
                            <div className="horline"></div>
                        </div>
                    </div>

                )
            }
            {/* --------------------Verifying OTP POPUP End-------------------- */}



        </div>
    )
}

export default StdProfile