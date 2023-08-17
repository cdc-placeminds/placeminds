import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import beepSoundSrc from '../../static/audio/beep.mp3';

const beepSound = new Audio(beepSoundSrc);

const QRScanner = () => {
  const [scanResult, setScanResult] = useState("Show QR to Mark Attendance");
  let scanner;

  useEffect(() => {

    if (!scanner?.getState()) {
      // eslint-disable-next-line
      scanner = new Html5QrcodeScanner('qrreader', {
          qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
        pausedText: 'Attendance Marked ✔',
      });

      scanner.render(success, error);

      function success(decodedText, result) {

        // scanned succesfully 

        console.log("inside success function");
        console.log(decodedText);

        setScanResult("Attendance marked for " + decodedText); // Update the scan result

// api req to send mail 
const message = {
  subject: 'Attendace Marked',
  text: decodedText,
};

fetch('http://localhost:8080/api/mailsend', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(message),
})
  .then(response => response.json())
  .then(data => {
    console.log('Email sent:', data);
  })
  .catch(error => {
    console.error('Error sending email:', error);
  });




        scanner.pause();
        beepSound.play();




        setTimeout(function () {
          setScanResult("Show QR to Mark Attendance"); // Reset the scan result
          scanner.resume();
        }, 2000);
      }

      function error(err) {
        // console.error(err);
      }
    }
  }, []);

  return (
    <div>
      <style>
        {`
          main {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction:column


            
          }
          #qrreader {
            width: 600px;
            box-shadow: inset 0em 3em 8em #9e9a9a6e;
            {/* margin-top: 7%; */}
            border: 2px solid silver;
            color: white;
          }
          .scanres {
            text-align: center;
            font-size: 25px;
            margin-top: 10px;
            color: red;
          }
          video {
            transform: scaleX(-1);
            }
        `}
      </style>
      <main>
      <div className="scanres">{scanResult}</div>
        <div id="qrreader"></div>
        
      </main>
    </div>
  );
};

export default QRScanner;
