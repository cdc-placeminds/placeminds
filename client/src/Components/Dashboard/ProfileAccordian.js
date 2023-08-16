import React, { useState } from 'react'
import StdProfile from './StdProfile';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

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

    const navigate = useNavigate();

    const adddrivepanel = () => {
        navigate('/adddrive')
    }
    const editdrivepanel = () => {
        navigate('/editdrive')
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
            } content="Here QR Code will be displayed" />

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
                <div>
                    <button onClick={adddrivepanel} className='btn btn-primary btn-sm my-1 mx-1'>Add Drive</button>
                    <button onClick={editdrivepanel} className='btn btn-primary btn-sm my-1 mx-1'>Edit Drive</button>
                    <button className='btn btn-primary btn-sm my-1 mx-1'>Scan QR</button>
                </div>
            } />)}
        </div>

    )
}


export default ProfileAccordian