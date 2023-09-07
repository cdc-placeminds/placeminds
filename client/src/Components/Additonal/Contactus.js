import React from 'react'
import '../css/contact.css'

const Contactus = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className=" container-contact w-[90vw]">
                <div className="contactInfo">
                    <div>
                        <h2 className="contacttitle">Contact Info</h2>
                        <ul className="coninfo">
                            <li>
                                <span className="cicon">
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                </span>
                                <span className="address cinfo">
                                    Plot No 1 <br />
                                    Rohini Sector 22, <br />
                                    Delhi , 110086


                                </span>
                            </li>
                            <li>
                                <span className="cicon">
                                    <i className="fa fa-envelope"></i>
                                </span>
                                <span className="cinfo">
                                    <a
                                        href="mailto:Info@redleaffreshfruits.com.au"
                                        className="telno"
                                    >
                                        placement.mait@gmail.com
                                    </a>
                                </span>
                            </li>
                            <li>
                                <span className="cicon">
                                    <i className="fa fa-phone"></i>
                                </span>
                                <span className="cinfo">
                                    <a href="tel:+6132463838" className="telno">
                                        0358722879
                                    </a>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <section className="socialsec" id="social">
                        <div className="color"></div>
                        <div className="color"></div>
                        <div className="color"></div>

                        <ul>

                            <li>
                                <a
                                    href="https://instagram.com/ecell_maims?igshid=YmMyMTA2M2Y="
                                    className=""
                                >
                                    <i className="fa fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/919991522233" className="">
                                    <i className="fa fa-whatsapp"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/company/ecellmaims"
                                    className=""
                                >
                                    <i className="fa fa-linkedin"></i>
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>

                <div className="contactForm max-h-fit pt-[5px]">
                    <h2 className="font-subt tracking-[2px] md:tracking-[5px] text-[1.6rem] md:text-[2.5rem] text-sechead mt-[2%]">Send us a Message !</h2>
                    <form name="contact-form" className="contact-form text-md-left mt-[2%]">
                        <div className="form-group">
                            <label htmlFor="name" className="required form-label">
                                Name
                            </label>
                            <input type="text" id="name" className="form-control" name="name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="required form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                name="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone" className="required form-label">
                                Phone
                            </label>
                            <input
                                type="number"
                                id="phone"
                                className="form-control"
                                name="phone"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address" className="required form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                id="address"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description" className="required form-label">
                                Description
                            </label>
                            <textarea
                                rows="5"
                                placeholder=" I just wanted to ...."
                                style={{ resize: 'none' }}
                                id="description"
                                className="form-control"
                                name="description"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            id=""
                            name="enquirybtn"
                            className="btn btn-primary enqbtn"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default Contactus
