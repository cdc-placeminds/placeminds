import React, {useState} from "react";

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

const About = () => {
  return (
    <div className="accordion">
      <AccordionItem title="Student Profile" content='lorem-100' />
      <AccordionItem title="Placement Details" content="Content for Section 2" />
      <AccordionItem title="Career Section" content="Content for Section 3" />
    </div>
  )
};

export default About;