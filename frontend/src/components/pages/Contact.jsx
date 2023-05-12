import { Link } from "react-router-dom";
import PageTitle from "../cards/pageTitle";
import { useContext } from "react";
import { CompanyInformationContext } from "../../App";


function ContactPage() {
    const companyInfo = useContext(CompanyInformationContext)
    return (
        <>
            <PageTitle title="Contact Us" />

            <section className="py-10">
                <section className="container">
                    <section className="row g-5 ">
                        <section className="col-lg-6">
                            <h2>Become  a Partner</h2>
                            <p>Join us in promoting sports excellence! Partner with Charichdeb Sports Solution today and help us support aspiring athletes. Contact us now to learn more about sponsorship opportunities.</p>
                            <Link className="btn btn-primary" onClick={() => window.location = 'tel:{companyInfo.telephone}'}>Call Us Today</Link>
                        </section>

                        <section className="col-lg-6">
                            <h2>Get In Touch</h2>
                            <p>Take the first step towards achieving your sports goals and partner with Charichdeb Sports Solution today. With our expert guidance and personalized approach, we can help you reach your full potential. Contact us now to get started</p>

                            <section className="footer-contact-info">
                                <section className="mb-2">
                                    <section className="text-decoration-none hstack justify-content-start align-items-center" to='#'>
                                        <section className='me-1 bg-primary p-1 rounded icon-size text-center'>
                                            <i className="fa-solid fa-location-dot fs-6 text-white"></i>
                                        </section>

                                        <p className="fw-bolder">{companyInfo.address}</p>
                                    </section>
                                </section>

                                <section className="mb-2">
                                    <Link className="text-decoration-none hstack justify-content-start align-items-center" to='#' onClick={() => window.location = 'tel:{companyInfo.telephone}'}>
                                        <section className='me-1 bg-primary p-1 rounded icon-size text-center'>
                                            <i className="fa-solid fa-phone-volume fs-6 text-white"></i>
                                        </section>
                                        <p className="fw-bolder">{companyInfo.telephone}</p>
                                    </Link>
                                </section>

                                <section className="">
                                    <Link className="text-decoration-none hstack justify-content-start align-items-center" to='#' onClick={() => window.location = 'mailto:{companyInfo.email}'}>
                                        <section className='me-1 bg-primary p-1 rounded icon-size text-center'>
                                            <i className="fa-solid fa-envelope fs-5 text-white"></i>
                                        </section>
                                        <p className="fw-bolder">{companyInfo.email}</p>
                                    </Link>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </>
    );
}

export default ContactPage;