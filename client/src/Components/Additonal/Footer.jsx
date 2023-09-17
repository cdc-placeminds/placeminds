import React from 'react'
import flogo from '../images/maitlogo.png'


function Footer() {
  return (
    <div className='footer mt-[135.92px] bg-sechead grid grid-flow-row grid-cols-2 w-full h-[442px]'>
    <div className="fsec1 border-r-[1px] border-[#666666]">
        <h1 className="fqt w-[219px] h-[96px] mt-[52px]
        ml-[46px] font-kBold text-[40px] leading-[47.71px] text-white ">Let’s Get Placed</h1>
        <button className='w-[164.52px] h-[64.52px] rounded-[13px] p-[20px] font-kBold text-[20.26px] leading-[24.17px] bg-gradient-to-r from-btngrad-from via-btngrad-via to-btngrad-to text-white ml-[46px] mt-[179px]'>
Get Started
</button>
    </div>
    <div className="fsec2">
      <ul className="fmenu ml-[58px] mt-[59px] w-[137px] h-[166px] text-white">
        <li className='font-kBold text-[32px] leading-[38.17px]  '>Menu</li>
        <li className='mt-[20px] font-kBold text-[20.26px] leading-[24.17px] text-vanilla  '>  <a href="#howitworks">How it Works</a></li>
        <li className='mt-[18px] font-kBold text-[20.26px] leading-[24.17px] text-vanilla  '><a href="#services">Team</a></li>
        <li className='mt-[18px] font-kBold text-[20.26px] leading-[24.17px] text-vanilla  '><a href="#contact">Contact</a></li>
      </ul>  

      {/* logo part  */}

      <div className="flogo ml-[43px] mt-[75px] flex">
      <img src={flogo} alt="footer logo " className='w-[119px] h-[116.3px] ' />
      <a href="/" className='w-[108px] font-kBold h-[38px] text-[32px] text-white leading-[38.17px] mt-[48px]' ></a>


      </div>
    </div>

      
    </div>
  )
}

export default Footer
