import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import Alert from '../Additonal/Alert';

const Loginfrm = () => {

  //Navigate function to redirect user after successful login
  const navigate = useNavigate();
  const { setisLoggedin } = useAuth();
  const { showalert, alert } = useAlert();

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


    //Checking for any error or credentials dont match
    if (res.status === 400 || !userData) {
      showalert("Error:", "Invalid Details", "warning")
      console.log("Invalid Credentials")
    }
    //Login Successful
    else {

      showalert("Success:", "Log In Successful", "success")

      console.log("Login Successful")
      //Redirecting to Dashboard


      setisLoggedin(true);


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
              <Alert alert={alert} />
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
          <a href='/res-pass'>Forgot Password?</a>
        </div>
      </div>
    </div>
  )
}

export default Loginfrm
