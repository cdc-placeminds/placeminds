import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import Navbar from "./Navbar";
import { Route, Routes } from 'react-router-dom';
import Home from './Homepage';
import Signupfrm from "../Authorisation/Signupfrm";
import AdminDash from "../Dashboard/AdminPanel/AdminDash";
import EditDriveDash from "../Dashboard/AdminPanel/EditDriveDash";
import { AuthProvider } from "../context/AuthContext";
import { AdminProvider } from "../context/AdminContext";
import { UserDataProvider } from "../context/UserDataContext";
import { DriveDataProvider } from "../context/DriveDataContext";
import { AlertProvider } from "../context/AlertContext";
import { ScannerProvider } from "../context/ScannerContext";
import QRScanner from "../Dashboard/AdminPanel/Qrscanner";

function App() {
  return (
    <div className="appbody">
      <AuthProvider>
        <UserDataProvider>
          <DriveDataProvider>
            <AdminProvider>
              <ScannerProvider>
                <AlertProvider>
                  <Navbar />
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signupfrm />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path="/adddrive" element={<AdminDash />} />
                    <Route path="/editdrive" element={<EditDriveDash />} />
                    <Route path="/qrscanner" element={<QRScanner />} />
                  </Routes>
                </AlertProvider>
              </ScannerProvider>
            </AdminProvider>
          </DriveDataProvider>
        </UserDataProvider>
      </AuthProvider>
    </div >

  );
}

export default App;
