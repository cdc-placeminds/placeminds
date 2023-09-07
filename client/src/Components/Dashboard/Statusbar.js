import React, { useEffect, useState } from 'react'
import { useDriveData } from '../context/DriveDataContext';
import { useUserData } from '../context/UserDataContext';

const Statusbar = () => {
  const { driveData } = useDriveData();
  const { userData } = useUserData();
  const drivesArray = Object.keys(driveData).map(key => driveData[key])

  const total_drive = drivesArray.filter(drive => drive.year === userData.year).length;
  const [appliedDrivesCount, setAppliedDrivesCount] = useState(0);

  useEffect(() => {
    if (userData && Array.isArray(userData.drives)) {
      const count = userData.drives.reduce((count, drive) => {
        if (drive.applied === true) {
          return count + 1;
        }
        return count;
      }, 0);
      setAppliedDrivesCount(count);
    }
  }, [userData]);


  return (
    <div>
      <div className="statusbar">
        <div className="opprcount  countdiv">
          <p className="subheading">OPPORTUNITY</p>
          <p className="subcount md:text-[1.7rem]">{total_drive}</p>
        </div>
        <div className="verline"></div>
        <div className="appcount countdiv">
          <p className="subheading">APPLIED</p>
          <p className="subcount md:text-[1.7rem]">{appliedDrivesCount}</p>
        </div>

        <div className="verline"></div>
        <div className="disccount countdiv">
          <p className="subheading">DISCIPLINE</p>
          <p className="subcount md:text-[1.7rem]">GREEN</p>
        </div>


      </div>
    </div>
  )
}

export default Statusbar
