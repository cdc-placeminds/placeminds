import React from 'react'
import Statusbar from './Statusbar'
import DriveCard from './DriveCard'


const Drivesec = () => {
  return (
    <div className="col-md-8 dash">
    <div className="drivesecheading">
    <span className="material-symbols-outlined">
business_center
</span>
    <h1> PLACEMENT DRIVES</h1>
    </div>

   {/* statusbar   */}
   <Statusbar/>

   {/* DriveCard  */}
   <DriveCard/>
   <DriveCard/>
   <DriveCard/>

    
    </div>
  )
}

export default Drivesec
