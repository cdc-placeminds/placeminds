import React from 'react'

const Statusbar = () => {
  return (
    <div>
      <div className="statusbar">
    <div className="opprcount  countdiv">
        <p className="subheading">OPPORTUNITY</p>
        <p className="subcount">12</p>
    </div>
    <div className="verline"></div>
    <div className="appcount countdiv">
    <p className="subheading">APPLIED</p>
        <p className="subcount">4</p>
    </div>
    
    <div className="verline"></div>
    <div className="disccount countdiv"> 
     <p className="subheading">DISCIPLINE</p>
        <p className="subcount">GREEN</p>
        </div>
    

</div>
    </div>
  )
}

export default Statusbar
