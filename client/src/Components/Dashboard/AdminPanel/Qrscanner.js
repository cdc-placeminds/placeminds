import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import beepSoundSrc from '../../static/audio/beep.mp3';
import errorbeepSoundSrc from '../../static/audio/error-beep.mp3';
import { useScannerData } from '../../context/ScannerContext';

const beepSound = new Audio(beepSoundSrc);
const errorbeepSound = new Audio(errorbeepSoundSrc);

const QRScanner = () => {
  const {selectedDrive, isOpenForAll} = useScannerData();
  const [scanResult, setScanResult] = useState("Show QR to Mark Attendance || " + selectedDrive);
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

      async function success(decodedText, result) {

        // scanned succesfully 
        
        console.log("inside success function");
        console.log(decodedText);


        // api req to send mail 
        const message = {
          subject: 'Attendace Marked',
          text: decodedText,
        };

        // ---------------------------------Fetch API to Mark Attendance in sheet------------------------------------

        const url = "http://localhost:8080/api/findapi"
        const fetchMethod = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message,
            compname: selectedDrive,
            OpentoAll: isOpenForAll
          })
        }
        const addtosheet = await fetch(url, fetchMethod);

        //Marking attendance successfully
        if (addtosheet.status === 201) {

          setScanResult("Attendance marked for " + decodedText); // Update the scan result
          
          // then send mail 
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


          beepSound.play();
        }

        //If user is already present
        else if (addtosheet.status === 423) {
          console.log("Already Present")
          setScanResult("Already Present");
          errorbeepSound.play();
        }

        //If User has not applied for drive
        else if (addtosheet.status === 422) {
          console.log("Not Applied for Drive")
          setScanResult("Not Applied for Drive ");
          errorbeepSound.play();
        }

        else {
          console.log("Server Error")
        }

        // ----------------------------------------------------------------------------------------------------------


        // scanner.pause();
          setTimeout(function () {
            setScanResult("Show QR to Mark Attendance || " + selectedDrive); // Reset the scan result
            // scanner.resume();
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
