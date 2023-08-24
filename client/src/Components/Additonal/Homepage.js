import React, {useEffect} from "react";
import Loginfrm from "../Authorisation/Loginfrm";
import maitlogo from "../images/maitlogo.png"
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const callHomePage = async() => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/dashboard`, {
        method: "GET",
        headers: {
          Accept: "application/json", "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if(res.status === 201){
        navigate('/dashboard')
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    callHomePage();
    // eslint-disable-next-line
  }, [])

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