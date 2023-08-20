import { Link } from "react-router-dom";
import { useState, useContext, useLayoutEffect } from "react";
import { CompanyInformationContext } from "../../App";
import axios from "axios";


function Footer() {
    const [socials, setSocials] = useState([])
    const companyInfo = useContext(CompanyInformationContext)
    const year = new Date()

    useLayoutEffect(() => {
        // Socials
        axios.get(`${process.env.REACT_APP_API_URL}/socials`)
            .then(res => {
                setSocials(res.data)
            })
    }, []);
    return (
        <section className="pt-7 bg-primary text-white footer-contact-info">
            <section className="container pb-4">
                <section className="row g-3">
                    <section className="col-lg-4">
                        <section className="text-decoration-none text-white hstack justify-content-start align-items-center justify-content-lg-center" to='#'>
                            <section className='me-1 bg-white p-1 rounded icon-size text-center'>
                                <i className="fa-solid fa-location-dot fs-6 text-primary"></i>
                            </section>

                            <p>{companyInfo.address}</p>
                        </section>
                    </section>

                    <section className="col-lg-4">
                        <Link className="text-decoration-none text-white hstack justify-content-start align-items-center justify-content-lg-center" to='#' onClick={() => window.location = 'tel:{companyInfo.telephone}'}>
                            <section className='me-1 bg-white p-1 rounded icon-size text-center'>
                                <i className="fa-solid fa-phone-volume fs-6 text-primary"></i>
                            </section>
                            <p>{companyInfo.telephone}</p>
                        </Link>
                    </section>

                    <section className="col-lg-4">
                        <Link className="text-decoration-none text-white hstack justify-content-start align-items-center justify-content-lg-center" to='#' onClick={() => window.location = 'mailto:{companyInfo.email}'}>
                            <section className='me-1 bg-white p-1 rounded icon-size text-center'>
                                <i className="fa-solid fa-envelope fs-5 text-primary"></i>
                            </section>
                            <p className="d-inline">{companyInfo.email}</p>
                        </Link>
                    </section>
                </section>
            </section>

            <div style={{ borderTop: '1px solid #fff' }}>
                <div className='container py-4'>
                    <div className="row align-items-center g-3">
                        <div className="col-lg-4 justify-content-center">
                            <p className="text-center">&#169; <span className="fw-bolder">{companyInfo.company_name} {year.getFullYear()}.</span> <br />All rights Reserved</p>
                        </div>

                        <div className="col-lg-4">
                            <div class="hstack gap-1 justify-content-center">
                                <div className=""><Link to="privacy-policy" className="text-decoration-none text-white">Privacy Policy</Link></div>
                                <div class="vr"></div>
                                <div className=""><Link to="terms-and-conditions" className="text-decoration-none text-white">Terms and Conditions</Link></div>
                            </div>
                        </div>

                        <div className="col-lg-4 ">
                            <section className="hstack g-1 justify-content-center">
                                {socials.map(item =>
                                    <section className='me-1 bg-white p-1 rounded icon-size text-center' key={item.id}>
                                        <a href={item.url} target="_blank"><i className={`${item.font_awesome_class} fs-5 text-primary`}></i></a>
                                    </section>
                                )}
                            </section>

                        </div>
                    </div>

                </div>
            </div>

            <section className="codehub">
                <section className="container">
                    <section className="row p-1">
                        <small className="text-center">Designed and Developed by <a href="https://wa.me/message/SMDJVELK7COKN1" target="_blank" className="text-white text-decoration-none fw-bolder"> Codehub Technologies</a></small>
                    </section>
                </section>
            </section>
        </section >
    );
}

export default Footer;