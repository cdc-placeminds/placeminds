import React, { useState } from 'react';
import axios from 'axios';

const Loginfrm = () => {

  const [data, setData] = useState({
    email: "", password: ""
  })

  const [error, setError] = useState("");

  const handleInputs = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/dashboard";
      console.log(res.message);
    } catch (error) {
      if (error.respone && error.response.status >= 400 && error.response <= 500) {
        setError(error.response.data.message)
      }
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
          {error && <div className="errmsg">{error}</div>}
          <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Login</button>
          <p>Forgot Password?</p>
        </div>
      </div>
    </div>
  )
}

export default Loginfrm
