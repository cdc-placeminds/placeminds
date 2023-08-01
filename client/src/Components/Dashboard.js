import React from 'react'
import Profile from './Profile';
import Drivesec from './Drivesec';

const Dashboard= () => {
    return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 col-12 mx-auto">

<div className="container-fluid dashboard">
  <div className="row">
    <Profile/>
    <Drivesec/>
  </div>
</div>

</div>
    </div>
    </div>


    )

}


export default Dashboard;