import React, { useEffect, useState } from 'react';
import { useAlert } from '../context/AlertContext';
import Alert from '../Additonal/Alert';


function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordReset, setPasswordReset] = useState(false);
  const [emailExists,setEmailExists]=useState(false);
const { showalert, alert } = useAlert();

  

//   useeffect for checking email being entered exitst in our db or not 

useEffect(()=>{
    
    if (email){
        var usercheck ={varname:'email',varval:email}
        fetch("http://localhost:8080/api/check-user",{
        method:'POST',
        headers:{'Content-Type':'application/json'}  ,
        body:JSON.stringify(usercheck)  
        })
        .then(response => response.json())
        .then(data =>{
            setEmailExists(data.exists)
            if(data.exists){
                showalert("Success:", "User found", "success")
   
            }
            else{
                showalert("Error:", "Invalid Details", "warning")

            }
        })
        .catch(error =>{
            console.log(error)
        })
    }

},[email])


        // for sending otp 
         const handleSendOTP = () => {



    // Here, you can implement the logic to send the OTP to the user's email.
    const message={email:email}
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
            if(data.otpSent){
                showalert("Success:", "OTP Sent check mail", "success")
   
            }
            else{
                console.log( "checking if otp is sent "+data.otpSent);
                showalert("Error:", "Invalid Details", "warning")

            }
        })
        .catch(error => {
          console.error('Error sending email:', error);
        });
  };
//    for verifying otp 
  const handleVerifyOTP = () => {
     const verfotpfor={email:email,enteredOtp:otp}
    fetch("http://localhost:8080/api/mailsend/verifyotp",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(verfotpfor)
    })
    .then(response=>response.json())
    .then(data=>{
        if (data.status === 200) {
            showalert("Success:", data.message, "success");
            setOtpVerified(true);
            // Set your state variable (otpVerified) to true if needed
          } else {
            showalert("Error:", data.message, "warning");
          }

    })
    .catch(error =>{
        console.log("error in verify otp"+error);
        
    })


    // Here, you can implement the logic to verify the entered OTP.
    // For the sake of the example, let's simulate OTP verification after 2 seconds.
    
  };

  const handleResetPassword = () => {
    // logic to reset the password.
   
    if(newPassword!==confirmPassword){
        showalert("Error:","Passwords doesn't match eachother !!","warning")
    }

   else{

    const updateCred ={email,newPassword:newPassword};

    fetch("http://localhost:8080/api/resetpassword",{
     method:'POST',
     headers:{
        'Content-Type':'application/json'
     },
     body:JSON.stringify(updateCred)

    })
    .then(response =>response.json())
    .then(data=>{
        if(data.status==200){
          showalert("Success:",data.message,"success");
          setPasswordReset(true);
          console.log("password reset successfull");
        }
        else{
            showalert("Success:",data.message,"success");
        }

    })
    .catch(error=>{
        console.log(error);
    })

   }

  };

  return (
    <div>
      <h2>Reset Password</h2>
      <br/>
      <Alert alert={alert} />
      <br/>
      {/* if both otp is not verified and password is also not reseted */}

      {!otpVerified && !passwordReset && (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent}
          />

{/* need to check whether this email exists in our databaseor not  */}

          {/* if otp is not sent then send otp button else another  */}

          {!otpSent && (
            <button disabled={!emailExists} onClick={handleSendOTP}>Send OTP</button>
          )}

          {/* if otp is sent then an input for sending otp and verify otp button  */}

          {otpSent && (
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={handleVerifyOTP}>Verify OTP</button>
            </div>
          )}
        </div>
      )}

{/* if otp is verified then then this  */}

      {otpVerified && !passwordReset && (
        <div>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}

{/* if password is resetted then this  */}

      {passwordReset && (
        <p>Password reset successfully!</p>
      )}
    </div>
  );
}

export default ForgetPassword;
