import React, { useState } from 'react'
import axios from "axios";

const Signupfrm = () => {

    const [data, setData] = useState({
        name: "", email: "", enrollment: "", contact: "", password: "", cpassword: ""
    })

    const [error, setError] = useState("");

    const handleInputs = ({ currentTarget: input}) => {
        setData({...data,[input.name]: input.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const {data: res} = await axios.post(url,data);
            console.log(res.message);
            window.location= '/';
        } catch (error) {
           if(error.response && error.response.status >= 400 && error.response <=500){
                setError(error.response.data.message)
           }
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
                {error && <div className="errmsg">{error}</div> }
                <button type= 'submit' className='btn btn-primary' onClick={handleSubmit} >Sign Up</button>
            </div>
        </div>

    </div>;
}

export default Signupfrm