import React, { useState, useEffect } from 'react'
import { useUserData } from '../context/UserDataContext';
import { useAlert } from '../context/AlertContext';
import { useLoader } from '../context/LoaderContext';

const DriveCard = ({ datadrive }) => {

    const { setuserData, userData } = useUserData();
    const { showalert } = useAlert();
    const { setLoadingcont } = useLoader();


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
        const deadline = new Date(datadrive.deadline); // Assuming it's in the format "2023-08-25T14:00"
        const options = { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true };
        return deadline.toLocaleString('en-US', options);
    }

    //-----------------------------------------
    //TO check wheter user is eligible for drive or not
    const isEligible = datadrive.branch.some((branch) => userData.branch === branch);

    const handleViewDtl = async (e) => {
         //----------------------------Redirecting User to External Link for Applying------------------------------------

         if (datadrive.isExtLink) {
            window.open(datadrive.ExtLink, "_blank");
        }
    }

    const handleSubmit = async (e) => {
        setLoadingcont(true)
        try {
           
            // ---------------------------Fetch API for Adding User Details to Google Sheet----------------------------------

            const sheeturl = `${process.env.REACT_APP_BASE_URL}/api/applyapi`
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

            const url = `${process.env.REACT_APP_BASE_URL}/api/updateapply`
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


            const uri = `${process.env.REACT_APP_BASE_URL}/api/drive/totalapplied`
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
            setLoadingcont(false);
            if (addtosheet.status === 201) {
                if (updateApplied.status === 201) {
                    if (updatetotalapplied.status === 201) {
                        setisDriveApplied(true); // To change button from Apply now to Applied
                        setappliedstd(datadrive.totalapplied + 1)
                        showalert("Success: ", "Applied to Drive Successfully", "success") // Showing Alert of Successful Applied
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
                    <div className="imgborder items-center md:h-[2.7rem] md:w-[2.7rem]">
                        {/* <img className='complogo' src={complogo} alt="Company Logo" /> */}
                        <span className="material-symbols-outlined md:text-[1.8rem] md:h-[2.5rem] md:w-[2.5rem]">
                            business_center
                        </span>

                    </div>
                    <div>
                        <p className='comprole md:text-[1.3rem]'>{datadrive.profile}</p>
                        <p className="compname md:text-[1.1rem]">{datadrive.name}</p>
                    </div>
                </div>
                <div className="comptime md:text-[0.8rem]">
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
                    <p className="subhead group relative">
                        {datadrive.branch.length <= 2
                            ? datadrive.branch.join(" | ")
                            : (
                                <>
                                    {datadrive.branch.slice(0, 2).join(" | ")}
                                    <span className="tooltip-popup absolute hidden group-hover:flex group-hover:flex-row group-hover:items-center group-hover:justify-center group-hover:top-[100%] group-hover:left-1/2 transform -translate-x-1/2 bg-bkg py-1 px-2 rounded shadow-lg border border-headcolor">
                                        {datadrive.branch.map((branch, index) => (
                                            <span key={index} className="mx-1">{branch}{index !== datadrive.branch.length - 1 ? ',' : ''}</span>
                                        ))}
                                    </span>
                                    +{datadrive.branch.length - 2}
                                </>
                            )}
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
                    <span className="material-symbols-outlined groupicon flex items-end h-[30px] md:h-[41px] text-[1.5rem] md:text-[1.8rem]">group</span>
                    <p className='text-[0.6rem] md:text-[0.8rem]'>{appliedstd} Applied</p>
                </div>
                <div className="drvbtns">
                    <button className="viewdtl" onClick={handleViewDtl}>View Details</button>
                    {isDriveApplied ? (
                        <button className="applied_btn" disabled>Applied</button>
                    ) : (
                        isEligible ? (
                            isDeadlineExpired ? (
                                <button className="deadline_btn" disabled>Closed</button>
                            ) : (
                                <button className={` ${datadrive.isExtLink ? 'hidden' : ''} apnow_btn`} onClick={handleSubmit}>Apply Now</button>
                            )) : (
                            <button className="deadline_btn" disabled>Not Eligible</button>
                        )
                    )}

                </div>
            </div>
        </div>
    )
}

export default DriveCard
