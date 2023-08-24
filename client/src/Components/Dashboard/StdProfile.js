import React, { useState, useEffect } from 'react'
import { useUserData } from '../context/UserDataContext'
import { useAlert } from '../context/AlertContext'

const StdProfile = () => {
    const [isOpen, setisOpen] = useState(false)
    const [OtpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [FixedWarning, setFixedWarning] = useState({ msg: "", type: "" });
    const { userData } = useUserData();
    const { showalert } = useAlert();

    const [updateddata, setData] = useState({
        name: userData.name,
        email: userData.email,
        enrollment: userData.enrollment,
        contact: userData.contact,
        branch: userData.branch,
        year: userData.year,
        gender: userData.gender,
        dob: userData.dob,
        id: userData._id
    })

    useEffect(() => {
        if (updateddata.email !== userData.email) {
            var usercheck = { varname: 'email', varval: updateddata.email }
            fetch(`${process.env.REACT_APP_BASE_URL}/api/check-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usercheck)
            })
                .then(response => response.json())
                .then(data => {
                    setEmailExists(data.exists)
                    if (data.exists) {
                        setFixedWarning({ msg: "Error: Email Already exists", type: 'warning' });
                        return;
                    }
                    else {
                        setFixedWarning({ msg: "" });

                    }

                })
                .catch(error => {
                    console.log(error)
                })
        }
        // eslint-disable-next-line
    }, [updateddata.email])


    const handleInputs = ({ currentTarget: input }) => {
        setData({ ...updateddata, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --------------------------------------EMAIL VERIFICATION USING OTP-------------------------------------------

        const message = {
            email: updateddata.email
        }

        fetch(`${process.env.REACT_APP_BASE_URL}/api/mailsend/sendotp`, {
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
        fetch(`${process.env.REACT_APP_BASE_URL}/api/mailsend/verifyotp`, {
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
                    console.log("otp verified " + otpVerified);

                    // -----------------------------------UPDATE DETAILS IN BACKEND FETCH API----------------------------------------------


                    //Backend URL
                    const url = `${process.env.REACT_APP_BASE_URL}/api/users/update`;
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

    // selection options for year and branches 
    const renderBranchOptions = () => {
        const branches = ['CSE', 'CST', 'IT', 'ITE', 'AIDS', 'AIML', 'ECE', 'EEE', 'MAE', 'ME']; // Add more branches if needed
        return branches.map((branch, index) => (
            <option key={index} value={branch}>
                {branch}
            </option>
        ));
    };

    const renderYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const endYear = currentYear + 10; // Display options up to 10 years from current year
        const years = Array.from({ length: endYear - currentYear + 1 }, (_, index) => currentYear + index);

        return years.map((year, index) => (
            <option key={index} value={year}>
                {year}
            </option>
        ));
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
                    <p>Contact No       :</p>
                    <p>Email Id         :</p>
                    <p>Gender           :</p>
                    <p>DOB              :</p>
                </div>
                <div className="stdprfl_body">
                    <p>{userData.name}</p>
                    <p>{userData.contact}</p>
                    <p>{userData.email}</p>
                    <p>{userData.gender}</p>
                    <p>{userData.dob}</p>
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
                        <div className='h-[20px] text-center'>
                            <label htmlFor="usernexistence" className={`text-base px-[3%] py-[2%] font-head ${FixedWarning.type === 'success' ? 'bg-succ' : 'text-warn'}`}>{FixedWarning.msg}</label>
                        </div>

                        <form>

                            <div className='mt-[20px]  grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-2 gap-y-3'>

                                <div className="form-floating">
                                    <input type="text" name="name" className="form-control" id="floatingInput" placeholder="First Name" value={updateddata.name} onChange={handleInputs} autoFocus required />
                                    <label className='w-full text-headcolor ' htmlFor="floatingInput">Full Name</label>
                                </div>

                                <div className="form-floating">
                                    <input type='email' id='floatingemail' name='email' className={`form-control ${emailExists ? 'border-2 shadow-lg border-warnborder shadow-warn' : ''}`} placeholder='EMAIL ADDRESS' required value={updateddata.email} onChange={handleInputs} ></input>
                                    <label className='w-full  text-headcolor' htmlFor="floatingemail">Email Address</label>
                                </div>


                                <div className="form-floating">
                                    <input id='floatingenrollment' name='enrollment' className="form-control" placeholder='' required value={updateddata.enrollment} readOnly type='text' inputMode='numeric'></input>
                                    <label className='w-full text-headcolor ' htmlFor="floatingenrollment">Enrollment No.</label>
                                </div>
                                <div className="form-floating">
                                    <input id='flaotingcontact' name='contact' className="form-control" placeholder='' required value={updateddata.contact} onChange={handleInputs} type='text' inputMode='numeric'></input>
                                    <label className='w-full text-headcolor ' htmlFor="flaotingcontact">Contact No.</label>
                                </div>
                                <div className="form-floating">
                                    <select
                                        className="form-select text-center"
                                        id="floatingYear"
                                        name="year"
                                        value={updateddata.year}
                                        onChange={handleInputs}
                                        required
                                    >
                                        <option value="">Select Passing Out Year</option>
                                        {renderYearOptions()}
                                    </select>
                                    <label className='w-full text-headcolor ' htmlFor="floatingYear">Passing Out Year</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        id='floatingdob'
                                        name='dob'
                                        className="form-control  text-center"
                                        placeholder="(DD/MM/YYYY)"
                                        required
                                        value={updateddata.dob}
                                        onChange={handleInputs}
                                        type='date'
                                    />
                                    <label className='doblbl w-full ' htmlFor="floatingdob">Dob (DD/MM/YYYY)</label>
                                </div>
                                {/* branch  */}
                                <div className="form-floating md:col-span-2">
                                    <select
                                        className="form-select text-center"
                                        id="floatingBranch"
                                        name="branch"
                                        value={updateddata.branch}
                                        onChange={handleInputs}
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        {renderBranchOptions()}
                                    </select>
                                    <label className='w-full text-headcolor ' htmlFor="floatingBranch">Branch</label>
                                </div>
                                {/* gender */}
                                <fieldset className='md:col-span-2 '>
                                    <legend>Gender:</legend>
                                    <div className="gendiv ">
                                        <input
                                            className='mr-[1%]'
                                            type="radio"
                                            id="genderChoice1"
                                            name="gender"
                                            value="male"
                                            checked={updateddata.gender === "male"}
                                            onChange={handleInputs}
                                            required

                                        />
                                        <label className='mr-[5%]' htmlFor="genderChoice1">Male</label>

                                        <input
                                            className='mr-[1%]'
                                            type="radio"
                                            id="genderChoice2"
                                            name="gender"
                                            value="female"
                                            checked={updateddata.gender === "female"}
                                            onChange={handleInputs}
                                            required
                                        />
                                        <label className='mr-[5%]' htmlFor="genderChoice2">Female</label>

                                        <input
                                            className='mr-[1%]'
                                            type="radio"
                                            id="genderChoice3"
                                            name="gender"
                                            value="prefer not to say"
                                            checked={updateddata.gender === "prefer not to say"}
                                            onChange={handleInputs}
                                            required
                                        />
                                        <label className='mr-[3%]' htmlFor="genderChoice3">Prefer Not to Say</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="horline"></div>

                            <div className="compbtn">
                                <button className='btn btn-secondary mx-2 my-2' onClick={() => { setisOpen(false); window.location.reload() }}>Close</button>
                                {emailExists 
                                    ? <button type='submit' disabled className='btn btn-primary mx-2 my-2' onClick={handleSubmit}>Save</button>
                                    : <button type='submit' className='btn btn-primary mx-2 my-2' onClick={handleSubmit}>Save</button>
                                }
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