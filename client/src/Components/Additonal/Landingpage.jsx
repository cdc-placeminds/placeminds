import React from 'react';
import '../css/landingpage.css'
import { useNavigate } from 'react-router-dom';
import maitbluelogo from "../images/maitbluelogo.png"
import Working from './Working';
import Contactus from './Contactus';
import Testimonial from './Testimonial';
import Footer from './Footer';




function Landingpage() {

    const navigate = useNavigate();
    const handleSignup = () => {
        navigate('/signup');

    }

    const handleLogin = () => {
        navigate('/login');
    }



    return (
        <div>
            {/* main body of home page  */}
            <div className=" homepg flex w-full flex-col supports-[min-height:91dvh]:min-h-[91dvh] md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]">
                <div className="lhmintro flex flex-col bglhm">
                    <div className='w-full h-full grid grid-cols-2 grid-flow-row'>
                        <div className="introtxt col-span-2 py-[15%] md:py-[5%] flex flex-col justify-evenly">
                            <div className='w-[100%] px-[6%] py-[5%] mb-[10%] md:mb-[0]'>
                                <img src={maitbluelogo} alt="" className="homelogo w-[45px] md:w-[70px]" />
                            </div>
                            <div className='bg-[#0000005c] w-[100%] px-[6%] py-[5%] '>
                                <div className="cdchead mt-[1%] mb-[5%]">
                                    <div className="cdcline"></div>
                                    <div className="text-[1.5rem] md:text-[2.5rem] font-[800] font-head text-white ml-[0.5rem] md:ml-[1rem] leading-8 md:leading-10">CAREER <span className='font-head font-[200] text-[1.5rem] md:text-[2.5rem]'>AND</span><br /> DEVELOPMENT CELL</div>
                                </div>
                                <div className='mt-[5%] mb-[1%]'>
                                    <div className="text-[1rem] md:text-[2rem] font-[700] font-head text-white leading-[1]">Maharaja Agrasen <br /><span className='font-head font-[200] text-[0.8rem] md:text-[1.8rem]'>Institute of Technology, Delhi</span></div>
                                    <div className="cdchrline"></div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="moto col-start-2 px-[13.5%] py-[20%] md:py-[16%]">
                         <p className='text-white font-bold tracking-[5px] text-[1.5rem] font-subt '> <span className='text-[2.5rem]'>S</span>top <br /><span className='text-[2.5rem]'>S</span>olution <br /> <span className=' font-light text-[1.0rem]'> for placement</span> </p>

                        </div> */}
                    </div>
                </div>


                {/* right part  */}

                <div className="rcon flex md:flex-col justify-evenly items-center p-[5%]">
                    <div className='flex px-[3%] py-[3%]'>
                        <div>
                            <h1 className="intrhead text-black text-[6.5rem] md:text-[17rem] font-numb font-light">1</h1>
                            {/* <img src={onesymbol} alt="" className="w-[60px] h-[70px] md:w-[30px] md:h-[175px]" /> */}
                        </div>
                        <div className='flex flex-col justify-center ml-[5%]'>
                            <h1 className="intrhead text-[#3d3d3d] text-[0.85rem] md:text-[2.2rem] font-tagline font-bold">STOP</h1>
                            <h1 className="intrhead text-[#3d3d3d] text-[0.85rem] md:text-[2.2rem] font-tagline font-bold">SOLUTION</h1>
                            <h1 className="intrhead text-[#3d3d3d] text-[0.45rem] md:text-[1.1rem] font-head">THAT</h1>
                            <h1 className="intrhead text-[#3d3d3d] text-[0.85rem] md:text-[2.2rem] font-tagline font-bold">SIMPLIFIES</h1>
                            <h1 className="intrhead text-[#3d3d3d] text-[0.45rem] md:text-[1.1rem] font-head">PLACEMENT PROCESS</h1>
                        </div>
                    </div>
                    <div className='flex flex-col w-[100%] px-[3%] md:px-[10%] py-[5%]'>
                        <h1 className="intrhead flex justify-center text-[headcolor] text-[1rem] md:text-[1.9rem] mb-[3%] font-bold "> Get Started </h1>
                        <div className="btnss flex justify-evenly mt-[3%]">
                            <button type="submit" className='btn btn-primary text-[0.5rem] md:text-[1rem] h-[15%] md:h-[50%] mb-[5%] md:mb-[10%] w-[35%] md:w-[40%]' onClick={handleLogin}>Login</button>
                            <button type="submit" className='btn btn-primary text-[0.5rem] md:text-[1rem] h-[15%] md:h-[50%] mb-[5%] md:mb-[10%] w-[35%] md:w-[40%]' onClick={handleSignup}>Signup</button>
                        </div>
                    </div>
                </div>
            </div>



            <Working/>
            <Testimonial />
            <Contactus />
            <Footer />


        </div>
    )
}

export default Landingpage
