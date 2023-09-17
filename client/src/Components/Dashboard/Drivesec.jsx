import React from 'react'
import Statusbar from './Statusbar'
import DriveCard from './DriveCard'
import { useDriveData } from '../context/DriveDataContext'
import { useUserData } from '../context/UserDataContext'


const Drivesec = () => {
  const { driveData } = useDriveData();
  const { userData } = useUserData();
  const drivesArray = Object.keys(driveData).map(key => driveData[key])


  return (
    <div className="col-md-8 dash">
      <div className="drivesecheading">
        <span className="material-symbols-outlined text-[2rem] md:text-[2.5rem] md:ml-[20px]">
          business_center
        </span>
        <h1 className='flex items-center text-[1.3rem] font-[600] md:text-[1.5rem] md:ml-[8px]'> PLACEMENT DRIVES</h1>
      </div>

      {/* Statusbar   */}
      <Statusbar />

      {/* DriveCard  */}
      {drivesArray.filter(drive => drive.year === userData.year).reverse().map((datadrive, index) => (
        <DriveCard key={index} datadrive={datadrive} />
      ))}

    </div>
  )
}

export default Drivesec
