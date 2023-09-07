import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import Emailsender from '../Additonal/Emailsender';

// const dotenv = require("dotenv")

const Signupfrm = () => {

    const [p1Filled, setP1Filled] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [enrollExists, setEnrollExists] = useState(false);
    const [FixedWarning, setFixedWarning] = useState({ msg: "", type: "" });
    // const [pwdmsg, setPwdmsg] = useState(null);
    // const requiredFields = ['name', 'email', 'gender','password','cppassword','contact','year','branch','enrollment','dob'];
    const [Uppercasevalid, setUppercasevalid] = useState({ msg: "", value: false });
    const [Lowercasevalid, setLowercasevalid] = useState({ msg: "", value: false });
    const [specialcasevalid, setSpecialcasevalid] = useState({ msg: "", value: false });
    const [numvalid, setNumvalid] = useState({ msg: "", value: false });
    const [plenvalid, setPlenvalid] = useState({ msg: "", value: false });
    // const [passvalid, setpassvalid] = useState(null);



    // for scrolling too of the form 
    const formRef = useRef(null);

    const scrollToTopOfForm = () => {
        if (formRef.current) {
            formRef.current.scrollTop = 0;
        }
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


    // handling next 

    const handleNext = () => {
        // Check if userExists or any required field is empty
        if (!data.name || !data.email || !data.password || !data.cpassword || !data.enrollment || !data.contact) {
        }
        else {

            if (data.password === data.cpassword) {
                setFixedWarning({ msg: " " });
                setP1Filled(true);
            } else {
                setFixedWarning({ msg: "passwords doesn't match", type: 'warning' });
                scrollToTopOfForm();
            }
        }

    }

    //Navigate function to redirect user after successful signup
    const navigate = useNavigate();


    //update data that user is entering
    const [data, setData] = useState({
        name: "", email: "", enrollment: "", contact: "", password: "", cpassword: "", branch: "", year: "", gender: "", dob: ""
    })


    // ---------   for checking user existence --------------------------------------------------------------

    useEffect(() => {

        if (data.email) {
            var usercheck = { varname: 'email', varval: data.email }
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
                        scrollToTopOfForm();
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
    }, [data.email])

    useEffect(() => {

        if (data.enrollment) {
            var usercheck = { varname: 'enrollment', varval: data.enrollment }
            fetch(`${process.env.REACT_APP_BASE_URL}/api/check-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usercheck)
            })
                .then(response => response.json())
                .then(data => {
                    setEnrollExists(data.exists)
                    if (data.exists) {
                        setFixedWarning({ msg: "Error: Enrollment Already exists", type: 'warning' });
                        scrollToTopOfForm();


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
    }, [data.enrollment])



    // --------------------------------------------------------------

    // -------------------------for checking password complexity----------------------------------------------------------
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-,.])/;


    useEffect(() => {


        if (data.password) {




            uppercaseRegExp.test(data.password) ? (setUppercasevalid({ msg: " ✔️ 1 Uppercase", value: true })) : (setUppercasevalid({ msg: " ❌ 1 Uppercase", value: false }));
            lowercaseRegExp.test(data.password) ? (setLowercasevalid({ msg: " ✔️ 1 Lowercase", value: true })) : (setLowercasevalid({ msg: " ❌ 1 Lowercase", value: false }));
            specialCharRegExp.test(data.password) ? (setSpecialcasevalid({ msg: " ✔️ 1 Special Character ", value: true })) : (setSpecialcasevalid({ msg: " ❌ 1 Special Character", value: false }));
            digitsRegExp.test(data.password) ? (setNumvalid({ msg: " ✔️ 1 Digit ", value: true })) : (setNumvalid({ msg: " ❌ 1 Digit", value: false }));
            (data.password.length >= 8) ? (setPlenvalid({ msg: "✔️ Strong Password", value: true })):(setPlenvalid({ msg: "❌ Password must contain atleast 8 Charcaters ", value: false })) ;
        }
        else {
            setUppercasevalid({ msg: "", value: false });
            setLowercasevalid({ msg: "", value: false });
            setSpecialcasevalid({ msg: "", value: false });
            setNumvalid({ msg: "", value: false });
            setPlenvalid({ msg: "", value: false });
        }

        // eslint-disable-next-line
    }, [data.password])


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


    // ----------------------------------------------------------------------------------------------

    const handleInputs = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        console.log("inside handle submit ");
        e.preventDefault();

        const { name, email, contact, enrollment, password, cpassword, branch, year, gender, dob } = data;

        if (Object.keys(data).some(key => !data[key])) {
            setFixedWarning({ msg: "Fill all mandatory Fields", type: 'warning' });
            scrollToTopOfForm();
            return;
            // Handle the case where any of the fields is empty
        }


        //Backend URL
        const url = `${process.env.REACT_APP_BASE_URL}/api/users/signup`;
        //Fetch Api Methods Defining
        const fetchMethods = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, contact, enrollment, password, cpassword, branch, year, gender, dob
            })
        }
        //Calling Fetch API
        const res = await fetch(url, fetchMethods);
        //Converting Data in JSON 
        const userData = await res.json();

        //Checking If any error occured 
        if (res.status === 422 || !userData) {
            setFixedWarning({ msg: 'Invalid Details', type: 'warning' });
            scrollToTopOfForm();

        }
        //If registration is successfull
        else {
            setFixedWarning({ msg: 'Registration Successfull', type: 'success' });
              // Call the Emailsender function
          const EmailSent= Emailsender({
            email: data.email,
            message: ` Dear ${data.name} Your registration is successful. Thank you!`,
            subject: 'Registration Successful'
        })
        if(EmailSent)
        console.log("Email Sent Succefully");
            scrollToTopOfForm();
            setTimeout(() => {

                navigate("/");
            }, 2500);



        }

    }




    return <div className="container-fluid homebody">

        <div className="w-[75%] md:w-[50%] bg-hor-doodle mx-auto bg-white h-max py-[1%] px-[5%] mt-[5%] border-[1px] border-headcolor rounded-[12px]  ">
            <form ref={formRef} className='register_frm' id='register_frm' method="POST" onSubmit={handleSubmit}>
                <div className="text-center font-head text-headcolor text-[36px] tracking-[0.3px] font-[700] ">Signup to CDC MAIT</div>
                <div className='h-[20px] text-center'>
                    <label htmlFor="usernexistence" className={`text-base px-[3%] py-[2%] font-head ${FixedWarning.type === 'success' ? 'bg-succ' : 'text-warn'}`}>{FixedWarning.msg}</label>
                </div>
                <div className=" ">

                    {!p1Filled && (
                        <div className='mt-[20px]  grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-2 gap-y-3'>

                            <div className="form-floating">
                                <input type="text" name="name" className="form-control" id="floatingInput" placeholder="First Name" value={data.name} onChange={handleInputs} autoFocus required />
                                <label className='w-full text-headcolor ' htmlFor="floatingInput">Full Name</label>
                            </div>

                            <div className="form-floating">
                                <input type='email' id='floatingemail' name='email' className={`form-control ${emailExists ? 'border-2 shadow-lg border-warnborder shadow-warn' : ''}`} placeholder='EMAIL ADDRESS' required value={data.email} onChange={handleInputs} ></input>
                                <label className='w-full  text-headcolor' htmlFor="floatingemail">Email Address</label>
                            </div>


                            <div className="form-floating">
                                <input id='floatingenrollment' disabled={emailExists} name='enrollment' className={`form-control ${enrollExists ? 'border-2 border-warnborder shadow-warn' : ''}`} placeholder='' required value={data.enrollment} onChange={handleInputs} type='text' inputMode='numeric'></input>
                                <label className='w-full text-headcolor ' htmlFor="floatingenrollment">Enrollment No.</label>
                            </div>
                            <div className="form-floating">
                                <input id='flaotingcontact' disabled={emailExists || enrollExists} name='contact' className="form-control" placeholder='' required value={data.contact} onChange={handleInputs} type='text' inputMode='numeric'></input>
                                <label className='w-full text-headcolor ' htmlFor="flaotingcontact">Contact No.</label>
                            </div>
                            <div className="form-floating">
                                <input disabled={emailExists || enrollExists} onBlur={handleconfirmpassword} id='floatingpassword' name='password' className="form-control" placeholder='' required value={data.password} onChange={handleInputs} type='password'></input>
                                <label className='w-full text-headcolor ' htmlFor="floatingpassword">Password</label>
                            </div>

                            <div className="form-floating">
                                <input disabled={emailExists || enrollExists || !(Uppercasevalid.value && Lowercasevalid.value && numvalid.value && specialcasevalid.value && plenvalid.value)} id='flaotingcpassword inptbox' name='cpassword' className="form-control" placeholder='' required value={data.cpassword} onChange={handleInputs} type='password'></input>
                                <label className='w-full  text-headcolor' htmlFor="flaotingcpassword">Confirm Password</label>
                            </div>

                            {/* password validation */}
                            <label className='md:col-span-2 text-[90%] ' htmlFor="password"><span>{plenvalid.msg}</span> </label>

                            <label className='md:col-span-2 text-[75%] ' htmlFor="password"><span className='mr-[7px]'>{Uppercasevalid.msg}</span> <span className='mr-[7px]'>{Lowercasevalid.msg}</span> <span className='mr-[7px]'>{specialcasevalid.msg}</span> <span>{numvalid.msg}</span> </label>
                            <div className='flex justify-center md:col-span-2'>
                                <button disabled={emailExists || enrollExists || !(Uppercasevalid.value && Lowercasevalid.value && numvalid.value && specialcasevalid.value && plenvalid.value)} className='btn btn-primary w-fit mt-[7px]' onClick={handleNext}> Next </button>
                            </div>

                        </div>
                    )}

                    {/* wrap in form-floating classname of form-control to input placeholder needded floating input id and for for label  */}

                    {p1Filled && !emailExists && !enrollExists && (
                        <div className='mt-[20px] sgnbody grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-2 gap-y-3'>
                            <div className="form-floating">
                                <select
                                    className="form-select text-center"
                                    id="floatingYear"
                                    name="year"
                                    value={data.year}
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
                                    value={data.dob}
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
                                    value={data.branch}
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
                                        checked={data.gender === "male"}
                                        onChange={handleInputs}
                                        required

                                    />
                                    <label className='mr-[20%]' htmlFor="genderChoice1">Male</label>

                                    <input
                                        className='mr-[1%]'
                                        type="radio"
                                        id="genderChoice2"
                                        name="gender"
                                        value="female"
                                        checked={data.gender === "female"}
                                        onChange={handleInputs}
                                        required
                                    />
                                    <label className='mr-[20%]' htmlFor="genderChoice2">Female</label>

                                    <input
                                        className='mr-[1%]'
                                        type="radio"
                                        id="genderChoice3"
                                        name="gender"
                                        value="prefer not to say"
                                        checked={data.gender === "prefer not to say"}
                                        onChange={handleInputs}
                                        required
                                    />
                                    <label className='mr-[3%]' htmlFor="genderChoice3">Prefer Not to Say</label>
                                </div>
                            </fieldset>

                            <div className='flex justify-center md:col-span-2'>
                                <button className='btn btn-primary w-fit mt-[7px]' onClick={handleSubmit}>Sign Up</button>
                            </div></div>
                    )}

                </div>
            </form>

        </div >
    </div >
}

export default Signupfrm