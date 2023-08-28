import React, { useState } from 'react'
import StdProfile from './StdProfile';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import QRCodeGenerator from './Qrcode';
import { useScannerData } from '../context/ScannerContext';
import { useAlert } from '../context/AlertContext';
import Alert from "../Additonal/Alert"


const AccordionItem = ({ title, content }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="accordion-item">
            <button className="accordion-title" onClick={toggleAccordion}>
                {title}
            </button>
            {isExpanded && <div className="accordion-content">{content}</div>}
        </div>
    );
};

const ProfileAccordian = () => {

    const { isAdmin } = useAdmin();
    const [isOpen, setisOpen] = useState(false)
    const [sheets, setsheets] = useState([])
    const {alert, showalert} = useAlert();
    const { selectedDrive, setSelectedDrive, isOpenForAll, setIsOpenForAll } = useScannerData()


    const navigate = useNavigate();

    const adddrivepanel = () => {
        navigate('/adddrive')
    }
    const editdrivepanel = () => {
        navigate('/editdrive')
    }
    const controlpanel=()=>{
        navigate('/controlpanel');
    }
    // const qrScanner = () => {
    //     navigate('/qrscanner')
    // }

    const handlesubmit = async () => {

        const url = `${process.env.REACT_APP_BASE_URL}/api/sheetnames`
        const fetchMethods = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            })
        }
        const updateApplied = await fetch(url, fetchMethods);

        var sheetsData = await updateApplied.json();
        setsheets(sheetsData)
        // for (var sheet in sheets) {
        //     console.log(sheets[sheet]);
        // }
    }

    return (

        <div className="accordion my-1 mx-4 ">
            <AccordionItem title={
                <>
                    <span className="material-symbols-outlined accordian-item-icon">
                        qr_code_scanner
                    </span>
                    <p>View QR Code</p>
                </>
            } content={<QRCodeGenerator />} />

            <AccordionItem title={
                <>
                    <span className="material-symbols-outlined">
                        badge
                    </span>
                    <p>Student Profile</p>
                </>
            } content={<StdProfile />} />

            <AccordionItem title={
                <>
                    <span className="material-symbols-outlined">
                        business_center
                    </span>
                    <p>Placement Details</p>
                </>
            } content="Content for Section 2" />

            {/* For Admin  */}
            {isAdmin && (<AccordionItem title={
                <>
                    <span className="material-symbols-outlined">
                        admin_panel_settings
                    </span>
                    <p>Admin Panel</p>
                </>
            } content={
                <div className='grid grid-cols-1 grid-flow-row md:grid-cols-2'>
                    <button onClick={adddrivepanel} className='btn btn-primary btn-sm my-1 mx-1'>Add Drive</button>
                    <button onClick={editdrivepanel} className='btn btn-primary btn-sm my-1 mx-1'>Edit Drive</button>
                    <button onClick={controlpanel} className='btn btn-primary btn-sm my-1 mx-1'>Control Panel</button>
                    <button onClick={() => { setisOpen(true); handlesubmit() }} className='btn btn-primary btn-sm my-1 mx-1'>Scan QR</button>
                </div>
            } />)}
            {/* --------------------Popup Starts-------------------- */}
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        {/* Content of the popup */}
                        <div className='comphead'>
                            <h2 className='font-head m-[2%] text-[20px] font-[400]' >QR Scanner</h2>
                        </div>

                        <div className="horline"></div>

                        <form>
                            <div className='compdesc'>
                                <div>
                                    <Alert alert={alert}/>
                                    <label>Choose Drive: </label>
                                    <select value={selectedDrive} onChange={(e) => setSelectedDrive(e.target.value)} required>
                                        {/* Mapping over the sheets array to create options */}
                                        {sheets.map((sheet, index) => (
                                            <option key={index} value={sheet}>
                                                {sheet}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='my-[3%]'>
                                    <label>Is this drive open for all: </label>
                                    <label>Yes</label>
                                    <input type='radio' value='true' checked={isOpenForAll === true} onChange={() => setIsOpenForAll(true)} name='isOpenforall' />
                                    <label>No</label>
                                    <input type='radio' value='false' checked={isOpenForAll === false} onChange={() => setIsOpenForAll(false)} name='isOpenforall' />
                                </div>
                            </div>

                            <div className="horline"></div>

                            <div className="compbtn">
                                <button className='btn btn-secondary mx-2 my-2' onClick={() => { setisOpen(false) }}>Close</button>
                                <button type='submit' className='btn btn-primary mx-2 my-2' onClick={(e) => {if(selectedDrive !== "") {navigate('/qrscanner') } else{showalert("Error: ", "Select Drive", "warning"); e.preventDefault()}}}>Proceed</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* --------------------Popup Ends-------------------- */}

        </div>

    )
}


export default ProfileAccordian