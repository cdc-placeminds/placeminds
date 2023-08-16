import React from "react";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navbar";
import { Route, Routes } from 'react-router-dom';
import Home from './Components/pages/Homepage';
import About from './Components/pages/About';
import Signupfrm from "./Components/Signupfrm";
import AdminDash from "./Components/AdminDash";
import EditDriveDash from "./Components/EditDriveDash";
import { AuthProvider } from "./Components/context/AuthContext";
import { AdminProvider } from "./Components/context/AdminContext";
import { UserDataProvider } from "./Components/context/UserDataContext";
import { DriveDataProvider } from "./Components/context/DriveDataContext";
import { AlertProvider } from "./Components/context/AlertContext";


function App() {
  return (
    <div className="appbody">
      <AuthProvider>
        <UserDataProvider>
          <DriveDataProvider>
            <AdminProvider>
              <AlertProvider>
                <Navbar />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/signup' element={<Signupfrm />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path="/adddrive" element={<AdminDash />} />
                  <Route path="/editdrive" element={<EditDriveDash />} />
                </Routes>
              </AlertProvider>
            </AdminProvider>
          </DriveDataProvider>
        </UserDataProvider>
      </AuthProvider>
    </div>

  );
}

export default App;
