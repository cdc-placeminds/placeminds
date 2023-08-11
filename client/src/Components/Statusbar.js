import React from 'react'
import { useDriveData } from './context/DriveDataContext';

const Statusbar = ({user_year}) => {
  const {driveData} = useDriveData();
  const drivesArray = Object.keys(driveData).map(key => driveData[key])

  const total_drive = drivesArray.filter(drive => drive.year === user_year).length;

  return (
    <div>
      <div className="statusbar">
    <div className="opprcount  countdiv">
        <p className="subheading">OPPORTUNITY</p>
        <p className="subcount">{total_drive}</p>
    </div>
    <div className="verline"></div>
    <div className="appcount countdiv">
    <p className="subheading">APPLIED</p>
        <p className="subcount">4</p>
    </div>
    
    <div className="verline"></div>
    <div className="disccount countdiv"> 
     <p className="subheading">DISCIPLINE</p>
        <p className="subcount">GREEN</p>
        </div>
    

</div>
    </div>
  )
}

export default Statusbar
