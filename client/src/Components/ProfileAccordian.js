import React, { useState } from 'react'
import StdProfile from './StdProfile';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from './context/AdminContext';

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

    const {isAdmin} = useAdmin();
    
    const navigate = useNavigate();
    
    const adddrivepanel = () => {
        navigate('/adddrive')
    }
    const editdrivepanel = () => {
        navigate('/editdrive')
    }

    return (

        <div className="accordion my-1 mx-4 ">
            <AccordionItem title="View QR Code" content="Here QR Code will be displayed" />
            <AccordionItem title="Student Profile" content={<StdProfile/>} />
            <AccordionItem title="Placement Details" content="Content for Section 2" />
            {isAdmin && (<AccordionItem title="Admin Panel" content={
                <div>
                    <button onClick={adddrivepanel} className='btn btn-primary btn-sm my-1 mx-3'>Add Drive</button>
                    <button onClick={editdrivepanel} className='btn btn-primary btn-sm my-1 mx-3'>Edit Drive</button>
                </div>
            } />)}
        </div>

    )
}


export default ProfileAccordian