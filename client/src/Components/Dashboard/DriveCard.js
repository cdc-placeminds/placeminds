import React, { useState } from 'react'
// import complogo from './images/complogo.png';
import { useUserData } from '../context/UserDataContext';
import { useAlert } from '../context/AlertContext';

const DriveCard = ({ datadrive }) => {

    const { userData } = useUserData();
    const { showalert } = useAlert();

    //Here we are checking if user is applied to this drive initially or not, below expression return True or False
    const isDriveAppliedInitially = userData.drives.some(drive => drive.drivecode === datadrive.drivecode && drive.applied);
    const [isDriveApplied, setisDriveApplied] = useState(isDriveAppliedInitially);

    const handleSubmit = async (e) => {

        try {

            // ---------------------------Fetch API for Adding User Details to Google Sheet----------------------------------

            const sheeturl = "http://localhost:8080/api/applyapi"
            const fetchMethod = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    datadrive, userData
                })
            }
            const addtosheet = await fetch(sheeturl, fetchMethod);

            // ---------------------------Fetch API for Updating Applied = True in Database----------------------------------

            const url = "http://localhost:8080/api/updateapply"
            const fetchMethods = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    datadrive, userData
                })
            }
            const updateApplied = await fetch(url, fetchMethods);

            // --------------------------------------------------------------------------------------------------------------

            if (addtosheet.status === 201) {
                if (updateApplied.status === 201) {
                    setisDriveApplied(true); // To change button from Apply now to Applied
                    showalert("Success: ", "Applied to Drive Successfully", "success") // Showing Alert of Successful Applied
                    console.log("Add to sheet successful")
                }
            }

            e.preventDefault();

        }
        catch (error) {
            console.log(error)
            showalert("Error: ", "Try Again", "warning")
        }
    }

    return (
        <div className="drivecard">
            <div className="compdet">
                <div className="comphead">
                    <div className="imgborder">
                        {/* <img className='complogo' src={complogo} alt="Company Logo" /> */}
                        <span className="material-symbols-outlined">
                            business_center
                        </span>

                    </div>
                    <div>
                        <p className='comprole'>{datadrive.profile}</p>
                        <p className="compname">{datadrive.name}</p>
                    </div>
                </div>
                <div className="comptime">
                    <p>Published 5 days ago</p>

                </div>
            </div>
            <div className="horline"></div>
            <div className="compdisc">
                <div className="jobtype compdiscdiv">
                    <p className="head">Job Type</p>
                    <p className="subhead">{datadrive.year}</p>
                </div>
                <div className="ctc compdiscdiv">
                    <p className="head">CTC</p>
                    <p className="subhead">{datadrive.ctc}</p>
                </div>
                <div className="brelig compdiscdiv">
                    <p className="head">Branch Eligible</p>
                    <p className="subhead">{datadrive.branch}</p>
                </div>
                <div className="locat compdiscdiv">
                    <p className="head">Location</p>
                    <p className="subhead">{datadrive.location}</p>
                </div>
            </div>
            <div className="horline"></div>
            <div className="compbtn">
                <div className="stdapl">
                    <span className="material-symbols-outlined groupicon">group</span>
                    <p>157 Applied</p>
                </div>
                <div className="drvbtns">
                    <button className="viewdtl">View Details</button>
                    {isDriveApplied //To toggle Apply now and applied button
                        ? (<button className="applied_btn" disabled>Applied</button>)
                        : (<button className="apnow_btn" onClick={handleSubmit}>Apply Now</button>)}

                </div>
            </div>
        </div>
    )
}

export default DriveCard
