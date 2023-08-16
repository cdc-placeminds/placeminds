import React, {  useEffect } from 'react';
// imported qrcode js 
import QRCode from 'qrcode';
// imported user data from useContext 
import { useUserData } from '../context/UserDataContext'

    

// var enrollmentNo= '08814804920';

function QRCodeGenerator() {
    const {userData} = useUserData();
    var enrollmentNo=userData.enrollment;
    console.log(" inside qr code generator " + enrollmentNo);

  useEffect(() => {
    if (enrollmentNo) {
      const canvas = document.getElementById('qrcode');

      if (canvas) {
        QRCode.toCanvas(canvas, enrollmentNo, { /* options here */ }, function (error) {
          if (error) console.error(error);
        });
      }
    }
  }, [enrollmentNo]);

  return (
    <div>
      <canvas id="qrcode" />
    </div>
  );
}

export default QRCodeGenerator;
