import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import beepSoundSrc from '../../static/audio/beep.mp3';
import errorbeepSoundSrc from '../../static/audio/error-beep.mp3';
import { useScannerData } from '../../context/ScannerContext';
// for loader 
import HashLoader from 'react-spinners/HashLoader';



const beepSound = new Audio(beepSoundSrc);
const errorbeepSound = new Audio(errorbeepSoundSrc);


const QRScanner = () => {
  const [scanResult, setScanResult] = useState("Show QR to Mark Attendance");
  const { selectedDrive, isOpenForAll } = useScannerData();
  const [loading, setLoading] = useState(false);
  let scanner;


  useEffect(() => {
    if (!scanner?.getState()) {
      scanner = new Html5QrcodeScanner('qrreader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
        pausedText: 'Attendance Marked ✔',
      });

      scanner.render(success, error);

      //-----------------------Add to Sheet Function Start-----------------------------

      const markattendance = async (decodedText) => {
        const url = `${process.env.REACT_APP_BASE_URL}/api/findapi`
        const fetchMethod = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            enrollment: decodedText,
            compname: selectedDrive,
            OpentoAll: isOpenForAll
          })
        }
        const addtosheet = await fetch(url, fetchMethod);
        return addtosheet;
      }

      //------------------------------END---------------------------------------------
      //----------------------Function for sending Mail-------------------------------

      const sendmail = (message) => {
        // -----------------mail send started-------------------------------------

        fetch(`${process.env.REACT_APP_BASE_URL}/api/mailsend/attendance`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        })
          .then(response => response.json())
          .then(data => {
            // now if mail is sent 
            setLoading(false)
            setScanResult("Attendance Marked");
            beepSound.play();
            setTimeout(function () {
              setScanResult("Show QR to Mark Attendance"); // Reset the scan result
              scanner.resume();
            }, 2000);
            console.log('Email sent:', data.EmailSent);
          })
          .catch(error => {
            setLoading(false)
            console.error('Error sending email:', error);
          });

        // -----------------mail send ended -------------------------------------

      }


      //---------------------------------END------------------------------------------
      //-------------------------Success function started ---------------------------

      async function success(decodedText, result) {

        // --------------------paused scanner and beep sound ----------------------------------
        scanner.pause();
        setLoading(true);
        // beepSound.play();

        // --------------------paused scanner ---------------------------------------------------


        // setScanResult("Attendance marked for " + decodedText); // Update the scan result

        // Decoded Message, with enrollment in text
        const message = {
          subject: 'Attendace Marked',
          text: decodedText,
        };

        //-------------------- api req to add to sheet start ---------------------

        const addtosheet = await markattendance(decodedText);
        if (addtosheet.status === 201) {
          sendmail(message)
          console.log("Attendance Marked")
        }
        else if (addtosheet.status === 423) {
          console.log("Already Present");
          setLoading(false)
          errorbeepSound.play();
          setScanResult("Already Present");
          setTimeout(function () {
            setScanResult("Show QR to Mark Attendance"); // Reset the scan result
            scanner.resume();
          }, 2000);

        }
        else if (addtosheet.status === 422) {
          console.log("Not Applied for Drive")
          setLoading(false)
          errorbeepSound.play();
          setScanResult("Not Applied for Drive");
          setTimeout(function () {
            setScanResult("Show QR to Mark Attendance"); // Reset the scan result
            scanner.resume();
          }, 2000);
        }
        else {
          // setLoading(false)
          setScanResult("Open Scanner Again")
          console.log("Server Error")
        }

        //-------------------- api req to add to sheet end ---------------------

        //-------------------- api req to send mail ---------------------




        // setTimeout(function () {
        //   setScanResult("Show QR to Mark Attendance"); // Reset the scan result
        //   scanner.resume();
        // }, 2000);
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
        {loading ? <div className='text-center absolute z-[99999]' ><HashLoader

          color={'#09a91d'}
          loading={loading}
          size={75}
          aria-label="Loading Spinner"
          data-testid="loader"
        /></div> : ''}
        <div className="scanres">{scanResult}</div>
        <div id="qrreader"></div>

      </main>
    </div>
  );
};

export default QRScanner;
