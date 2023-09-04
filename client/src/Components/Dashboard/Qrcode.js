import React, { useEffect } from 'react';
// imported qrcode js 
import QRCode from 'qrcode';
// imported user data from useContext 
import { useUserData } from '../context/UserDataContext'



// var enrollmentNo= '08814804920';

function QRCodeGenerator() {
  const { userData } = useUserData();
  var enrollmentNo = userData.enrollment;
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
    <div className='flex justify-center'>
      <div className="justify-around items-center p-[3%]">
        <h1 className='text-[20px] font-head font-[600]'>Scan QR to Mark Attendance</h1>

      </div>
      <div >
        <canvas id="qrcode" height={'50%'} width={'50%'} />
      </div>
    </div>
  );
}

export default QRCodeGenerator;
