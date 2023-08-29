import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import Navbar from "./Navbar";
import { Route, Routes } from 'react-router-dom';
import Home from './Homepage';
import Signupfrm from "../Authorisation/Signupfrm";
import AdminDash from "../Dashboard/AdminPanel/AdminDash";
import { AuthProvider } from "../context/AuthContext";
import { AdminProvider } from "../context/AdminContext";
import { UserDataProvider } from "../context/UserDataContext";
import { DriveDataProvider } from "../context/DriveDataContext";
import { AlertProvider } from "../context/AlertContext";
import { ScannerProvider } from "../context/ScannerContext";
import QRScanner from "../Dashboard/AdminPanel/Qrscanner";
import ControlPanel from "../Dashboard/AdminPanel/ControlPanel";

function App() {
  return (
    <div className="appbody bg-gradient-to-b to-[#dff1ff] from-[#cdb3fe40]">
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
                    <Route path="/qrscanner" element={<QRScanner />} />
                    <Route path="/controlpanel" element={<ControlPanel />} />
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
