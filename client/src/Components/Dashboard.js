import React, { useEffect } from 'react';
import Profile from './Profile';
import Drivesec from './Drivesec';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useAdmin } from './context/AdminContext';
import { useUserData } from './context/UserDataContext';
import { useDriveData } from './context/DriveDataContext';
import { useAlert } from './context/AlertContext';
import Alert from './Alert';


const Dashboard = () => {

  const { setisLoggedin } = useAuth();
  const { setisAdmin } = useAdmin();
  const { setuserData } = useUserData();
  const { setdriveData } = useDriveData();
  const { alert } = useAlert();
  const user_year = "2023";

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

      setisLoggedin(true);
      if (data.userDatasB.email === "ksingh@gmail.com") {
        setisAdmin(true)
      }
      setuserData(data.userDatasB);
      setdriveData(data.driveData);



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
            <Alert alert={alert} />
            <div className="row">
              <Profile />
              <Drivesec user_year={user_year} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}


export default Dashboard;