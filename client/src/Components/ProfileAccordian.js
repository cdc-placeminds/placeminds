import React, { useState } from 'react'
import StdProfile from './StdProfile';

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
    return (
        <div className="accordion">
            <AccordionItem title="View QR Code" content="Here QR Code will be displayed" />
            <AccordionItem title="Student Profile" content={<StdProfile/>} />
            <AccordionItem title="Placement Details" content="Content for Section 2" />
        </div>
    )
}

export default ProfileAccordian