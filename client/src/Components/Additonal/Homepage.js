import React, { useEffect } from "react";
import Loginfrm from "../Authorisation/Loginfrm";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const callHomePage = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/dashboard`, {
        method: "GET",
        headers: {
          Accept: "application/json", "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (res.status === 201) {
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

  return (
    <div>
      {/* main body of home page  */}
      <div className=" homepg flex w-full flex-col supports-[min-height:91dvh]:min-h-[91dvh] md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]">
        <div className="lhmintro flex flex-col  justify-center bglhm">
          <Loginfrm/>
        </div>


        {/* right part  */}

        <div className="rcon flex md:flex-col justify-evenly items-center p-[5%]">
          <div className='flex px-[3%] py-[1%]'>
            <div>
              <h1 className="intrhead text-black text-[7rem] md:text-[17rem] font-numb font-light">1</h1>
              {/* <img src={onesymbol} alt="" className="w-[60px] h-[70px] md:w-[30px] md:h-[175px]" /> */}
            </div>
            <div className='flex flex-col justify-center ml-[5%]'>
              <h1 className="intrhead text-[#3d3d3d] text-[1rem] md:text-[2.2rem] font-tagline font-bold">STOP</h1>
              <h1 className="intrhead text-[#3d3d3d] text-[1rem] md:text-[2.2rem] font-tagline font-bold">SOLUTION</h1>
              <h1 className="intrhead text-[#3d3d3d] text-[0.55rem] md:text-[1.1rem] font-head">THAT</h1>
              <h1 className="intrhead text-[#3d3d3d] text-[1rem] md:text-[2.2rem] font-tagline font-bold">SIMPLIFIES</h1>
              <h1 className="intrhead text-[#3d3d3d] text-[0.55rem] md:text-[1.1rem] font-head">PLACEMENT PROCESS</h1>
            </div>
          </div>

        </div>
      </div>





    </div>
  )

};

export default Home;