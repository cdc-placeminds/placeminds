import React, { useState } from 'react'
import { useUserData } from '../context/UserDataContext'
import { useAlert } from '../context/AlertContext'

const StdProfile = () => {
    const [isOpen, setisOpen] = useState(false)
    const { userData } = useUserData();
    const { showalert } = useAlert();
    const [data, setData] = useState({
        name: userData.name, email: userData.email, enrollment: userData.enrollment, contact: userData.contact, branch: "", year: "", id: userData._id
    })


    const handleInputs = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Backend URL
        const url = "http://localhost:8080/api/users/update";
        //Fetch Api Methods Defining
        const fetchMethods = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data
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

        //Checking If any error occured 
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

    return (
        <div>
            <div className= "updateprfl">
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

            {/* --------------------Popup Starts-------------------- */}
            {isOpen && (
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
                                    <input id='inptbox' name='name' value={data.name} onChange={handleInputs} type='text'></input>
                                    <p>EMAIL ADDRESS</p>
                                    <input id='inptbox' name='email' value={data.email} onChange={handleInputs} type='email'></input>
                                    <p>BRANCH</p>
                                    <input id='inptbox' name='branch' value={data.branch} onChange={handleInputs} type='text'></input>

                                </div>
                                <div>
                                    <p>ENROLLMENT NO</p>
                                    <input id='inptbox' name='enrollment' value={data.enrollment} readOnly type='text' inputMode='numeric'></input>
                                    <p>CONTACT NO</p>
                                    <input id='inptbox' name='contact' value={data.contact} onChange={handleInputs} type='text' inputMode='numeric'></input>
                                    <p>YEAR</p>
                                    <input id='inptbox' name='year' value={data.year} onChange={handleInputs} type='text'></input>
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
            {/* --------------------Popup Ends-------------------- */}

        </div>
    )
}

export default StdProfile