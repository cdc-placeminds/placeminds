import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signupfrm = () => {
    //Navigate function to redirect user after successful signup
    const navigate = useNavigate();

    //update data that user is entering
    const [data, setData] = useState({
        name: "", email: "", enrollment: "", contact: "", password: "", cpassword: ""
    })


    const handleInputs = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, contact, enrollment, password, cpassword } = data;
        //Backend URL
        const url = "http://localhost:8080/api/users";
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
            window.alert("Registration Unsuccessful")
            console.log("Registration Unsuccessful")
        }
        //If registration is successfull
        else {
            window.alert("Registration Successful")
            console.log("Registration Successful")

            navigate("/");


        }

    }



    return <div className="container-fluid homebody">

        <div className="col-md-6 md-12 mx-auto signupsec">
            <div className="sgnhead">Signup to CDC MAIT</div>
            <form className='register_frm' id='register_frm' method="POST" onSubmit={handleSubmit}>
                <div className="sgnbody">
                    <div>
                        <p>FULL NAME</p>
                        <input id='inptbox' name='name' value={data.name} onChange={handleInputs} type='text'></input>
                        <p>EMAIL ADDRESS</p>
                        <input id='inptbox' name='email' value={data.email} onChange={handleInputs} type='email'></input>
                        <p>PASSWORD</p>
                        <input id='inptbox' name='password' value={data.password} onChange={handleInputs} type='password'></input>

                    </div>
                    <div>
                        <p>ENROLLMENT NO</p>
                        <input id='inptbox' name='enrollment' value={data.enrollment} onChange={handleInputs} type='text' inputMode='numeric'></input>
                        <p>CONTACT NO</p>
                        <input id='inptbox' name='contact' value={data.contact} onChange={handleInputs} type='text' inputMode='numeric'></input>
                        <p>CONFIRM PASSWORD</p>
                        <input id='inptbox' name='cpassword' value={data.cpassword} onChange={handleInputs} type='password'></input>
                    </div>
                </div>
            </form>
            <div className="sgnbtn">

                <button type='submit' className='btn btn-primary' onClick={handleSubmit} >Sign Up</button>
            </div>
        </div>

    </div>;
}

export default Signupfrm