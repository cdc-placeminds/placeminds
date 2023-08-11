import React from 'react'
import complogo from './images/complogo.png';

const DriveCard = ({drive}) => {

    const handleSubmit = (e) => {

        const uri = "https://script.google.com/macros/s/AKfycbzA1l0f7z3FVYlTZTaikYaCtDtfBf13Z5_EB_J82rEbI7PbroS9q2LAQnePOgYeb6ZLvA/exec"

        fetch(uri, {
            method: "POST",
            body: JSON.stringify({
                name: "Uber"
            })
        }).then((res => res.text)).then((finalres) => {
            e.target.btn = "Submit"
            console.log(finalres)
        })

        e.preventDefault();
    }

    return (
        <div className="drivecard">
            <div className="compdet">
                <div className="comphead">
                    <div className="imgborder">
                        <img className='complogo' src={complogo} alt="Company Logo" />

                    </div>
                    <div>
                        <p className='comprole'>{drive.profile}</p>
                        <p className="compname">{drive.name}</p>
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
                    <p className="subhead">{drive.year}</p>
                </div>
                <div className="ctc compdiscdiv">
                    <p className="head">CTC</p>
                    <p className="subhead">{drive.ctc}</p>
                </div>
                <div className="brelig compdiscdiv">
                    <p className="head">Branch Eligible</p>
                    <p className="subhead">{drive.branch}</p>
                </div>
                <div className="locat compdiscdiv">
                    <p className="head">Location</p>
                    <p className="subhead">{drive.location}</p>
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
                    <button className="apnow" onClick={handleSubmit}>Apply Now</button>
                </div>
            </div>
        </div>
    )
}

export default DriveCard
