import React from 'react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import '../css/landingpage.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// importing all images 
import tpo from '../images/testimonials/tpo.jpg'
import chairman from '../images/testimonials/founder-chairman.jpg'
import direct from '../images/testimonials/director.jpg'
import { Quote } from 'react-bootstrap-icons';



// ---------------------------------



const Testimonial = () => {
    const testimonialsData = [
        {
            id: 1,
            imgsrc: tpo,
            name: 'Dr .Amit Guatam',
            desgn: 'Training & Placement Officer',
            message: '"Best wishes for your placements! This portal will streamline the process, making your journey to success even smoother."'
        },
        {
            id: 2,
            imgsrc: direct,
            name: 'Prof (Dr) Neelam Sharma',
            desgn: 'DIRECTOR',
            message: '"Best of luck with your placements; may this portal pave the way for your success with ease."'
        },
        {
            id: 3,
            imgsrc: chairman,
            name: 'Dr. N K Garg',
            desgn: 'FOUNDER CHAIRMAN',
            message: '"Sending you our warmest wishes for your upcoming placements. With this portals help, may you find countless opportunities and breeze through your journey to success."'
        }
        // Add more testimonials here
    ];

    return (
        <div className="testimonial-section bg-gradient-to-t to-[#dff1ff] from-[#eadeff40] h-[100vh]  text-center flex flex-col justify-evenly " >
            <h1 className='font-subt tracking-[2px] md:tracking-[5px] text-[1.6rem] md:text-[2.5rem] text-sechead   h-[20%] flex items-center justify-center '> Message from Authorities </h1>

            <div className=" flex items-center text-center ">

                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    // scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    autoplay={{ delay: 5000 }}
                    loop={true} // Add the loop attribute for infinite loop
                >
                    {testimonialsData.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="testimonial-card flex justify-center items-center flex-col w-full md:pb-[5%] pb-[10%] ">

                                <img
                                    src={testimonial.imgsrc}
                                    alt={`Testimonial by ${testimonial.name}`}
                                    className="testimonial-image h-[125px] w-[125px] object-cover rounded-full mt-[1%] mb-[3%] hover:scale-[1.1] transition-transform duration-300 ease-in-out"
                                />
                                <p className="testimonial-message font-head text-headcolor text-[1.2rem] text-center px-[25%] mb-[3%]">{testimonial.message}</p>
                                <div className="icon text-sechead text-[2.2rem]"><Quote /></div>
                                <div className="details text-center text-headcolor font-head mt-[3%]">
                                    <p className="testimonial-author font-[700] text-sechead text-[1.1rem]">{testimonial.name}</p>
                                    <p className="testimonial-author">{testimonial.desgn}</p>
                                </div>


                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonial;
