import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import Alert from '../Additonal/Alert';
// for loader 
// import ClipLoader from "react-spinners/ClipLoader";
import HashLoader from 'react-spinners/HashLoader';

const Loginfrm = () => {
  const [loading, setLoading] = useState(false);
  // states for forgotpass 
  const [Fpass, setFpass] = useState(false);
  const [Femail, setFemail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordReset, setPasswordReset] = useState(false);
  const [FemailExists, setFemailExists] = useState(false);
  // states for password complexity ----------------------
  const [Uppercasevalid, setUppercasevalid] = useState({ msg: "", value: false });
  const [Lowercasevalid, setLowercasevalid] = useState({ msg: "", value: false });
  const [specialcasevalid, setSpecialcasevalid] = useState({ msg: "", value: false });
  const [numvalid, setNumvalid] = useState({ msg: "", value: false });
  const [plenvalid, setPlenvalid] = useState({ msg: "", value: false });
  // functions for forget passwrod --------------------------------------


  //   useeffect for checking Femail being entered exitst in our db or not 

  useEffect(() => {

    if (Femail) {
      var usercheck = { varname: 'email', varval: Femail }
      fetch("http://localhost:8080/api/check-user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usercheck)
      })
        .then(response => response.json())
        .then(data => {
          setFemailExists(data.exists)
          if (data.exists) {
            showalert("Success:", "User found", "success")

          }
          else {
            showalert("Error:", "Invalid Details", "warning")

          }
        })
        .catch(error => {
          console.log(error)
        })
    }
    // eslint-disable-next-line
  }, [Femail])


  //------------------------- for sending otp 
  const handleSendOTP = (e) => {
    setLoading(true);
    e.preventDefault(); // Prevent the default form submission behavior
    // Here, you can implement the logic to send the OTP to the user's Femail.
    const message = { email: Femail }
    fetch('http://localhost:8080/api/mailsend/sendotp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        console.log('email sent:', data);
        //   otp is sent 
        setOtpSent(data.otpSent);
        if (data.otpSent) {
          // setLoading(false);
          showalert("Success:", "OTP Sent", "success")

        }
        else {
          console.log("checking if otp is sent " + data.otpSent);
          showalert("Error:", "Invalid Details", "warning")

        }
      })
      .catch(error => {
        console.error('Error sending Femail:', error);
      });
  };

  //   ----------------------------------------- for verifying otp 
  const handleVerifyOTP = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    const verfotpfor = { email: Femail, enteredOtp: otp }
    fetch("http://localhost:8080/api/mailsend/verifyotp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(verfotpfor)
    })
      .then(response => response.json())
      .then(data => {
        console.log("verification backend data back")
        setLoading(false);
        if (data.status === 200) {

          showalert("Success:", data.message, "success");
          setOtpVerified(true);
          // Set your state variable (otpVerified) to true if needed
        } else {
          showalert("Error:", data.message, "warning");
        }

      })
      .catch(error => {
        console.log("error in verify otp" + error);

      })

  };

  // -------------------------for new password complexity check ------------------------------

  // -------------------------for checking password complexity----------------------------------------------------------
  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-,.])/;


  useEffect(() => {


    if (newPassword) {




      uppercaseRegExp.test(newPassword) ? (setUppercasevalid({ msg: " ✔️ 1 Uppercase", value: true })) : (setUppercasevalid({ msg: " ❌ 1 Uppercase", value: false }));
      lowercaseRegExp.test(newPassword) ? (setLowercasevalid({ msg: " ✔️ 1 Lowercase", value: true })) : (setLowercasevalid({ msg: " ❌ 1 Lowercase", value: false }));
      specialCharRegExp.test(newPassword) ? (setSpecialcasevalid({ msg: " ✔️ 1 Special Character ", value: true })) : (setSpecialcasevalid({ msg: " ❌ 1 Special Character", value: false }));
      digitsRegExp.test(newPassword) ? (setNumvalid({ msg: " ✔️ 1 Digit ", value: true })) : (setNumvalid({ msg: " ❌ 1 Digit", value: false }));
      (newPassword.length >= 8) ? (setPlenvalid({ msg: "✔️ Strong Password", value: true })) : (setPlenvalid({ msg: "❌ Minimum 8 characters ", value: false }));
    }
    else {
      setUppercasevalid({ msg: "", value: false });
      setLowercasevalid({ msg: "", value: false });
      setSpecialcasevalid({ msg: "", value: false });
      setNumvalid({ msg: "", value: false });
      setPlenvalid({ msg: "", value: false });
    }

    // eslint-disable-next-line
  }, [newPassword])


  const handleconfirmpassword = () => {



    // if exited password field 



    if ((Uppercasevalid.value && Lowercasevalid.value && numvalid.value && specialcasevalid.value && plenvalid.value)) {
      setUppercasevalid({ msg: "", value: Uppercasevalid.value });
      setLowercasevalid({ msg: "", value: Lowercasevalid.value });
      setSpecialcasevalid({ msg: "", value: specialcasevalid.value });
      setNumvalid({ msg: "", value: numvalid.value });
      setPlenvalid({ msg: "", value: plenvalid.value })


    }

  }


  // =========================== for resetting password ----------------------------------

  const handleResetPassword = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
   
    // logic to reset the password.

    if (newPassword !== confirmPassword) {
      showalert("", "Passwords should match.!!", "danger")
    }
    else {
      setLoading(true);
      const updateCred = { email: Femail, newPassword: newPassword };

      fetch("http://localhost:8080/api/resetpassword", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateCred)

      })
        .then(response => response.json())
        .then(data => {
          setLoading(false);
          if (data.status === 200) {
            showalert("Success:", data.message, "success");
            setPasswordReset(true);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
            console.log("password reset successfull");
          }
          else {
            showalert("Success:", data.message, "success");
          }

        })
        .catch(error => {
          console.log(error);
        })

    }

  };




  // --------------------------------------------------------------

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
    <div className="col-md-6 loginsec flex justify-center items-center">
      <div className='  w-fit flex flex-col  h-[75%] px-[7%] py-[3%] bg-white border-2px border-headcolor rounded-[16px] '>
        <h1 className=' text-center mt-[5%] font-head text-headcolor font-[700] text-[2.0rem] tracking-[0.3px]'>{Fpass ? "Reset Password" : 'Student Login'}</h1>


        <form className={`signin_frm ${loading ? 'flex justify-center h-[100%]' : ''}`} id='signin_frm' method="POST" onSubmit={handleSubmit}>

          {loading ? <div className='text-center mt-[30%]' ><HashLoader

            color={'#0b5ed7'}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          /></div> : <>
            <div className={`h-[25px] w-[207px] ${Fpass ? 'mt-[7px] mb-[10px]' : 'mt-[5px]'}`}>  <Alert alert={alert} /> </div>

            {/* ================= this area is for login if fpass false ---------------- */}
            {!Fpass && (<>  <div className='relative'>
              <div className="form-floating mb-[3%] mt-[5%]">
                <input type='email' id='floatingemail' name='email' className='form-control' placeholder='EMAIL ADDRESS' required value={data.email} onChange={handleInputs} ></input>
                <label className='w-full  text-headcolor' htmlFor="floatingemail">Email Address</label>
              </div>
            </div>
              <div>
                <div className="form-floating">
                  <input id='floatingpassword' name='password' className="form-control" placeholder='' required value={data.password} onChange={handleInputs} type='password'></input>
                  <label className='w-full text-headcolor ' htmlFor="floatingpassword">Password</label>
                </div>
              </div>
              <div className='lgnbtns flex flex-col items-center mt-[7%]' >
                <button type="submit" className='btn btn-primary mb-[5%]' onClick={handleSubmit}>Login</button>
                <p className='text-[25px] cursor cursor-pointer hover:underline hover:text-lblue' onClick={() => setFpass(true)}>Forgot Password ? </p>


              </div> </>)}


            {/* =================== if Fpass is clicked ------------------------------ */}

            {Fpass && (
              <div>

                {/* if both otp is not verified and password is also not reseted */}

                {!otpVerified && !passwordReset && (

                  <div className='flex flex-col items-center'>
                    <div className='emailinp my-[7%]' >
                      <div className="form-floating mb-[3%] mt-[5%]">
                        <input type='email' id='floatingemail' name='email' className='form-control' placeholder='EMAIL ADDRESS' required value={Femail} onChange={(e) => setFemail(e.target.value)}
                          disabled={otpSent} ></input>
                        <label className='w-full  text-headcolor' htmlFor="floatingemail">Email Address</label>
                      </div>
                    </div>




                    {/* need to check whether this Femail exists in our databaseor not  */}

                    {/* if otp is not sent then send otp button else another  */}

                    {!otpSent && (
                      <button className='btn btn-primary ' disabled={!FemailExists} onClick={handleSendOTP}>Send OTP</button>

                    )}

                    {/* if otp is sent then an input for sending otp and verify otp button  */}

                    {otpSent && (
                      <div className='flex flex-col items-center'>

                        <div className="form-floating mb-[3%] mt-[1%]">
                          <input type='text' id='floatingotp' name='otp' className='form-control' required value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                          <label className='w-full  text-headcolor' htmlFor="floatingotp">Enter OTP</label>
                        </div>
                        <button className='mt-[5%] btn btn-primary ' onClick={handleVerifyOTP}>Verify OTP</button>

                      </div>
                    )}
                  </div>
                )}

                {/* if otp is verified then then this  */}

                {otpVerified && !passwordReset && (
                  <div className='flex flex-col items-center'>
                    <div className="form-floating mb-[3%] mt-[1%]">
                      <input type='password' id='floatingpassword' onBlur={handleconfirmpassword} name='otp' className='form-control mt-[7px]' required value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <label className='w-full  text-headcolor' htmlFor="floatingpassword">Enter new password</label>
                    </div>

                    <div className="form-floating mb-[3%] mt-[1%]">

                      <input type='password' disabled={!(Uppercasevalid.value && Lowercasevalid.value && numvalid.value && specialcasevalid.value && plenvalid.value)} id='floatingcnfpassword' name='otp' className='form-control' required value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <label className='w-full  text-headcolor' htmlFor="floatingcnfpassword">Reset Password</label>
                    </div>
                      
                    {/* password validation */}
                    <label className=' text-[90%] ' htmlFor="password"><span>{plenvalid.msg}</span> </label>

                    <label className=' text-[75%] ' htmlFor="password"><span className='mr-[7px]'>{Uppercasevalid.msg}</span> <span className='mr-[7px]'>{Lowercasevalid.msg}</span><br/> <span className='mr-[7px]'>{specialcasevalid.msg}</span> <span>{numvalid.msg}</span> </label>


                    <button disabled={!(Uppercasevalid.value && Lowercasevalid.value && numvalid.value && specialcasevalid.value && plenvalid.value)}  className='mt-[5%] btn btn-primary ' onClick={handleResetPassword}>Reset Password</button>

                  </div>
                )}

                {/* if password is resetted then this  */}

                {passwordReset && (
                  <p>Password reset successfully!</p>
                )}
              </div>

            )}
          </>}
        </form>



      </div>
    </div>
  )
}

export default Loginfrm
