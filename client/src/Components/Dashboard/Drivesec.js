import React from 'react'
import Statusbar from './Statusbar'
import DriveCard from './DriveCard'
import { useDriveData } from '../context/DriveDataContext'


const Drivesec = ({ user_year }) => {
  const { driveData } = useDriveData();
  const drivesArray = Object.keys(driveData).map(key => driveData[key])

  return (
    <div className="col-md-8 dash">
      <div className="drivesecheading">
        <span className="material-symbols-outlined">
          business_center
        </span>
        <h1> PLACEMENT DRIVES</h1>
      </div>

      {/* Statusbar   */}
      <Statusbar user_year={user_year} />

      {/* DriveCard  */}
      {drivesArray.filter(drive => drive.year === user_year).reverse().map((datadrive, index) => (
        <DriveCard key={index} datadrive={datadrive} />
      ))}


    </div>
  )
}

export default Drivesec
