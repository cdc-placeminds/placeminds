import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import Drivesec from './Drivesec';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const callDashboardPage = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/dashboard', {
        method: "GET",
        headers: {
          Accept: "application/json", "Content-Type": "application/json"
        },
        credentials: "include"
      })

      const data = await res.json();

      setUserData(data);


      if (res.status === 401) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (error) {
      console.log(error);
      navigate('/');
    }
  }

  useEffect(() => {
    callDashboardPage();
  }, [])



  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 col-12 mx-auto">

          <div className="container-fluid dashboard">
            <div className="row">
              <Profile userData={userData} />
              <Drivesec />
            </div>
          </div>

        </div>
      </div>
    </div>

  )

}


export default Dashboard;