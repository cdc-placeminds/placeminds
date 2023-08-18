import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAlert } from '../context/AlertContext';
import Alert from '../Additonal/Alert';

// const dotenv = require("dotenv")

const Signupfrm = () => {
    //Navigate function to redirect user after successful signup


    const navigate = useNavigate();
    const { showalert, alert } = useAlert();

    //update data that user is entering
    const [data, setData] = useState({
        name: "", email: "", enrollment: "", contact: "", password: "", cpassword: "", branch: "", year: "", gender: "", dob: ""
    })


    const handleInputs = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, contact, enrollment, password, cpassword } = data;
        //Backend URL
        const url = "http://localhost:8080/api/users/signup";
        //Fetch Api Methods Defining
        const fetchMethods = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, contact, enrollment, password, cpassword
            })
        }
        //Calling Fetch API
        const res = await fetch(url, fetchMethods);
        //Converting Data in JSON 
        const userData = await res.json();

        //Checking If any error occured 
        if (res.status === 422 || !userData) {
            showalert("Error:", "Invalid Details", "warning")
            console.log("Registration Unsuccessful")
        }
        //If registration is successfull
        else {
            showalert("Success:", "Log In Successful", "success")
            console.log("Registration Successful")

            navigate("/");


        }

    }



    return <div className="container-fluid homebody">

        <div className="col-md-6 md-12 mx-auto signupsec">
            <p><Alert alert={alert} /></p>
            <div className="sgnhead">Signup to CDC MAIT</div>
            <form className='register_frm' id='register_frm' method="POST" onSubmit={handleSubmit}>
                <div className="sgnbody">
                    <div>
                        <div class="form-floating">
                            <input id='inptbox' name='name' value={data.name} onChange={handleInputs} type='text'></input>
                            <label for="name">FULL NAME</label>
                        </div>
                        <div class="form-floating">
                            <input id='inptbox' name='email' value={data.email} onChange={handleInputs} type='email'></input>
                            <label for="email">EMAIL ADDRESS</label>
                        </div>
                        <div class="form-floating">
                            <input id='inptbox' name='password' value={data.password} onChange={handleInputs} type='password'></input>
                            <label for="password">PASSWORD</label>
                        </div>
                    </div>
                    <div>
                        <div class="form-floating">
                            <input id='inptbox' name='enrollment' value={data.enrollment} onChange={handleInputs} type='text' inputMode='numeric'></input>
                            <label for="enrollment">ENROLLMENT NO</label>
                        </div>
                        <div class="form-floating">
                            <input id='inptbox' name='contact' value={data.contact} onChange={handleInputs} type='text' inputMode='numeric'></input>
                            <label for="contact">CONTACT NO</label>
                        </div>
                        <div class="form-floating">
                            <input id='inptbox' name='cpassword' value={data.cpassword} onChange={handleInputs} type='password'></input>
                            <label for="cpassword">CONFIRM PASSWORD</label>
                        </div>
                    </div>
                </div>
                <div className="sgnbtn">
                    <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Sign Up</button>
                </div>
            </form>
        </div >
    </div >
}

export default Signupfrm