import React from "react";
import Loginfrm from "../Loginfrm";
import maitlogo from "../images/maitlogo.png"

const Home = () => {
  return <div className="container-fluid homebody">
    <div className="row">
      <div className="col-md-10 col-12 mx-auto">
        <div className="container-fluid homhead">
          <div className="row">
            <div className="col-md-6 homettl">
              <img src={maitlogo} alt="" className="homelogo" />
              <div className="cdchead">
                <div className="cdcline"></div>
                <div className="cdcttl">CAREER <span>AND</span> DEVELOPMENT CELL</div>
              </div>
              <div>
                <p>Maharaja Agrasen<br /><span>Institute of Technology, Delhi</span></p>
                <div className="cdchrline"></div>
              </div>


            </div>

            <Loginfrm />



          </div>
        </div>

      </div>
    </div>
  </div>;
};

export default Home;