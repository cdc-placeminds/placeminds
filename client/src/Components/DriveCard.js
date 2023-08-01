import React from 'react'
import complogo from './images/complogo.png';

const DriveCard = () => {
  return (
    <div>
      
      <div className="drivecard">
        <div className="compdet">
            <div className="comphead">
            <div className="imgborder">
            <img className='complogo' src={complogo} alt="Company Logo" />

            </div>
                <div>
                <p className='comprole'>Software Developer Intern</p>
                <p className="compname">Amazon</p>
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
                <p className="subhead">Internship</p>
            </div>
            <div className="ctc compdiscdiv">
                <p className="head">CTC</p>
                <p className="subhead">4,75,000</p>
            </div>
            <div className="brelig compdiscdiv">
                <p className="head">Branch Eligible</p>
                <p className="subhead">CSE|IT +2</p>
            </div>
            <div className="locat compdiscdiv">
                <p className="head">Location</p>
                <p className="subhead">Gurugram</p>
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
                <button className="apnow">Apply Now</button>
            </div>
        </div>
      </div>


    </div>
  )
}

export default DriveCard
