import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Loginfrm = () => {

  //Navigate function to redirect user after successful login
  const navigate = useNavigate();

  //update data that user is entering
  const [data, setData] = useState({
    email: "", password: ""
  })

  const handleInputs = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

  //When user Submits form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = data;
    //Backend URL
    const url = "http://localhost:8080/api/auth";
    //Fetch Api Methods Defining
    const fetchMethods = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    }
    //Calling Fetch API
    const res = await fetch(url, fetchMethods);
    //Converting String Data to JSON
    const userData = await res.json();

    console.log(userData.userGetData)

    //Checking for any error or credentials dont match
    if (res.status === 400 || !userData) {
      window.alert("Invalid Credentials")
      console.log("Invalid Credentials")
    }
    //Login Successful
    else {
      window.alert("Login Successful")
      console.log("Login Successful")
      //Redirecting to Dashboard
      Cookies.set("jwtoken", userData.data, { expires: 7 });
      navigate('/dashboard')

    }
  }


  return (
    <div className="col-md-6 loginsec">
      <div className='signinsec'>
        <div className='lgnhead'>
          <p>Student Login</p>
        </div>
        <div className='lgnform'>
          <form className='signin_frm' id='signin_frm' method="POST" onSubmit={handleSubmit}>
            <div>
              <p>EMAIL</p>
              <input id='inptbox' name="email" type='email' inputMode='numeric' value={data.email} onChange={handleInputs}></input>
            </div>
            <div>
              <p>PASSWORD</p>
              <input id='inptbox' name="password" type='password' value={data.password} onChange={handleInputs}></input>
            </div>
          </form>
        </div>
        <div className='lgnbtns'>
          <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Login</button>
          <p>Forgot Password?</p>
        </div>
      </div>
    </div>
  )
}

export default Loginfrm
