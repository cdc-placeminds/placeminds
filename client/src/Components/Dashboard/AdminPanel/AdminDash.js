import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { useAlert } from '../../context/AlertContext';
import Alert from '../../Additonal/Alert';

const AdminDash = () => {

    const navigate = useNavigate();
    const {isAdmin} = useAdmin();
    const {alert, showalert} = useAlert();

    const checkisAdmin = () => {

        if(!isAdmin){
            navigate('/')
        }
    } 

    useEffect(() => {
        checkisAdmin();
        // eslint-disable-next-line
    }, [])

    const [data, setData] = useState({
        name: "", location: "", profile: "", ctc: "", branch: "", year: ""
    })


    const handleInputs = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, location, profile, ctc, branch, year } = data;
        //Backend URL
        const url = "http://localhost:8080/api/drive/newdrive";
        //Fetch Api Methods Defining
        const fetchMethods = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, location, profile, ctc, branch, year
            })
        }

        //Calling Fetch API
        const res = await fetch(url, fetchMethods);
        
        // -----------------------------------------------------------------------------------
        
        const sheeturl = "http://localhost:8080/api/googleapi"
        const fetchMethod = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, location, profile, ctc, branch, year
            })
        }
        const addtosheet = await fetch(sheeturl, fetchMethod);

        if (addtosheet.status === 201) {
            console.log("Add to sheet successful")
        } else {
            console.log("Error")
        }




        // -----------------------------------------------------------------------------------


        //Checking If any error occured 
        if (res.status === 201) {
            showalert("Success: ","Drive Added Successfully", "success")
            console.log("Drive Created Successfully")
        }
        //If registration is successfull
        else {
            showalert("Error: ","Fill Details Correctly", "warning")
            console.log("Unsuccessful")
        }

    }

    return (
        <div className="container-fluid homebody">

            <div className="col-md-6 md-12 mx-auto signupsec">
                <Alert alert={alert} />
                <div className="sgnhead">Create New Drive</div>
                <form className='register_frm' id='register_frm' method="POST" >
                    <div className="sgnbody">
                        <div>
                            <p>COMPANY NAME</p>
                            <input id='inptbox' value={data.name} onChange={handleInputs} name='name' type='text'></input>
                            <p>LOCATION</p>
                            <input id='inptbox' value={data.location} onChange={handleInputs} name='location' type='text'></input>
                            <p>CTC</p>
                            <input id='inptbox' value={data.ctc} onChange={handleInputs} name='ctc' type='text'></input>

                        </div>
                        <div>
                            <p>JOB PROFILE</p>
                            <input id='inptbox' value={data.profile} onChange={handleInputs} name='profile' type='text' inputMode='numeric'></input>
                            <p>BRANCH ELIGIBLE</p>
                           
                            <select className='select' id='inptbox' value={data.branch} onChange={handleInputs} name='branch' >
                                <option value="CSE">CSE</option>
                                <option value="IT">IT</option>
                                <option value="CST">CST</option>
                                <option value="ITE">ITE</option>
                                <option value="AIDE">AIDS</option>
                                <option value="AIML">AIML</option>
                                <option value="ECE">ECE</option>
                                <option value="EEE">EEE</option>
                                <option value="MAE">MAE</option>
                                <option value="ME">ME</option>
                            </select>
                            <p>YEAR</p>
                            
                            <select id='inptbox ' value={data.year} onChange={handleInputs} name='year'>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                            </select>

                            {/* <input id='inptbox' value={data.year} onChange={handleInputs} name='year' type='text'></input> */}
                        </div>
                    </div>
                </form>
                <div className="sgnbtn">

                    <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Create Drive</button>
                </div>
            </div>

        </div>
    )
}

export default AdminDash