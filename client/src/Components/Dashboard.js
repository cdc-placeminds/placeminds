import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import Drivesec from './Drivesec';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useAdmin } from './context/AdminContext';
import { useUserData} from './context/UserDataContext';
import { useDriveData } from './context/DriveDataContext';



const Dashboard = () => {

  const { setisLoggedin } = useAuth();
  const { setisAdmin } = useAdmin();
  const {setuserData} = useUserData();
  const {setdriveData} = useDriveData();
  
  const user_year = "2024";

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

      setuserData(data.userDatasB);
      setdriveData(data.driveData);
      if (data.userDatasB.email === "ksingh@gmail.com") {
        setisAdmin(true)
      }
      setisLoggedin(true);



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
    // eslint-disable-next-line
  }, [])



  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 col-12 mx-auto">

            <div className="container-fluid dashboard">
              <div className="row">
                <Profile/>
                <Drivesec user_year={user_year} />
              </div>
            </div>

          </div>
        </div>
      </div>
  )

}


export default Dashboard;