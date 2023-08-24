import React, { useState, useEffect } from 'react'
// import complogo from './images/complogo.png';
import { useUserData } from '../context/UserDataContext';
// import { useDriveData } from '../context/DriveDataContext';
import { useAlert } from '../context/AlertContext';

const DriveCard = ({ datadrive }) => {

    const { setuserData, userData } = useUserData();
    // const { driveData } = useDriveData();
    const { showalert } = useAlert();


    //Here we are checking if user is applied to this drive initially or not, below expression return True or False
    const isDriveAppliedInitially = userData.drives.some(drive => drive.drivecode === datadrive.drivecode && drive.applied);
    const [isDriveApplied, setisDriveApplied] = useState(isDriveAppliedInitially);
    const [appliedstd, setappliedstd] = useState(datadrive.totalapplied);
    const [daysAgoPublished, setDaysAgoPublished] = useState(0); // State to store the number of days ago drive was published

    // Check if the deadline has passed
    const deadlineIST = new Date(datadrive.deadline);
    const currentDateIST = new Date(); // Current date and time in IST
    const isDeadlineExpired = deadlineIST < currentDateIST;

    //-------------Formating Deadline to Show on DriveCard-------------

    const formatDeadline = (datadrive) => {
        if (datadrive.name === 'Paytm') {
            const deadline = datadrive.deadline; // Assuming it's in the format "2023-08-25T14:00"  
            const [datePart, timePart] = deadline.split('T');
            const [year, month, day] = datePart.split('-');
            const [hour, minute] = timePart.split(':');

            return `${month}-${day}-${year} | ${hour}:${minute}`
        }
    }

    //-----------------------------------------

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
            const updateduserdata = await updateApplied.json()
            setuserData(updateduserdata.userdata)

            // ---------------------------Fetch API for Updating Total Applied Count in Database----------------------------------


            const uri = "http://localhost:8080/api/drive/totalapplied"
            const Methods = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    datadrive
                })
            }
            const updatetotalapplied = await fetch(uri, Methods);


            // --------------------------------------------------------------------------------------------------------------

            if (addtosheet.status === 201) {
                if (updateApplied.status === 201) {
                    if (updatetotalapplied.status === 201) {
                        setisDriveApplied(true); // To change button from Apply now to Applied
                        setappliedstd(datadrive.totalapplied + 1)
                        showalert("Success: ", "Applied to Drive Successfully", "success") // Showing Alert of Successful Applied
                        console.log("Add to sheet successful")
                    }
                }
            }

            e.preventDefault();

        }
        catch (error) {
            console.log(error)
            showalert("Error: ", "Try Again", "warning")
        }
    }

    const calculateDaysAgoPublished = () => {
        const publishedDate = new Date(datadrive.publishDate); // Assuming publishDate is a valid date string
        const currentDate = new Date();
        const timeDifference = currentDate - publishedDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        return daysDifference;
    }


    useEffect(() => {
        const daysAgo = calculateDaysAgoPublished();
        setDaysAgoPublished(daysAgo);

        // eslint-disable-next-line
    }, []);

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
                    <p>Published {daysAgoPublished} days ago</p>

                </div>
            </div>
            <div className="horline"></div>
            <div className="compdisc">
                <div className="jobtype compdiscdiv">
                    <p className="head">Deadline</p>
                    <p className="subhead">{formatDeadline(datadrive)}</p>
                </div>
                <div className="ctc compdiscdiv">
                    <p className="head">CTC</p>
                    <p className="subhead">{datadrive.ctc}</p>
                </div>
                <div className="brelig compdiscdiv">
                    <p className="head">Branch Eligible</p>
                    <p className="subhead">{datadrive.branch.length <= 2
                        ? datadrive.branch.join(" | ")
                        : `${datadrive.branch.slice(0, 2).join(" | ")} +${datadrive.branch.length - 2}`}
                    </p>
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
                    <p>{appliedstd} Applied</p>
                </div>
                <div className="drvbtns">
                    <button className="viewdtl">View Details</button>
                    {isDriveApplied //To toggle Apply now and applied button
                        ? (<button className="applied_btn" disabled>Applied</button>)
                        : (
                            isDeadlineExpired ? (
                                <button className="deadline_btn" disabled>Closed</button>
                            ) : (
                                <button className="apnow_btn" onClick={handleSubmit}>Apply Now</button>
                            )
                        )}

                </div>
            </div>
        </div>
    )
}

export default DriveCard
