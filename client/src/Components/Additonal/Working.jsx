import React from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { EnvelopeAtFill, PersonFillLock,QrCodeScan,WindowSidebar } from 'react-bootstrap-icons';

const Working = () => {
  return (
    <div className=' py-[3%] px-[5%] bg-gradient-to-b to-[#dff1ff] from-[#eadeff40] '>
    <h1 className=' font-subt md:text-center  text-sechead text-[2.5rem] tracking-[3px] mb-[2%]'> How it works ? </h1>

    <VerticalTimeline>
        <VerticalTimelineElement className='vertical-timeline-element--work ' iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} icon={<PersonFillLock/>} contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' } }  contentStyle={{borderTop: '2px solid  rgb(33, 150, 243)'}}>
        <h3 className='font-head text-sechead text-[1.3rem]'> Authentication (Signup/Login)</h3>
        <p  className='font-[light] -tracking-wide text-headcolor'> Registers user (Student/admin) and provides with respective Dashboard and Controls : Authorisation</p>


        </VerticalTimelineElement>
        <VerticalTimelineElement className='vertical-timeline-element--work' iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} icon={<WindowSidebar/>}  contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' } }  contentStyle={{borderTop: '2px solid  rgb(33, 150, 243)'}}>
        <h3 className='font-head text-sechead text-[1.5rem]'> Dashboard </h3>
        <p className='font-[light] -tracking-wide text-headcolor'> Shows Personal Information such as Discipline Staus / Availbale Drives / Applied Drives as well as One click drive registration </p>


        </VerticalTimelineElement>
        <VerticalTimelineElement className='vertical-timeline-element--work' iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} icon={<QrCodeScan/>} contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' } }  contentStyle={{borderTop: '2px solid  rgb(33, 150, 243)'}} >
        <h3 className='font-head text-sechead text-[1.5rem]'> Attendance System </h3>
        <p className='font-[light] -tracking-wide text-headcolor'> QR code availbale on Student dashboard can be shown to Scanner availbale for admins to Mark attendance for the respective drives / events</p>


        </VerticalTimelineElement>

        <VerticalTimelineElement className='vertical-timeline-element--work' iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} icon={<EnvelopeAtFill/>} contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' } }  contentStyle={{borderTop: '2px solid  rgb(33, 150, 243)'}} >
        <h3 className='font-head text-sechead text-[1.5rem]'> Email Updates </h3>
        <p className='font-[light] -tracking-wide text-headcolor'> Timely updates regarding all events , activities and responses via fluent email triggering</p>


        </VerticalTimelineElement>

    </VerticalTimeline>
    

      
    </div>
  )
}

export default Working
