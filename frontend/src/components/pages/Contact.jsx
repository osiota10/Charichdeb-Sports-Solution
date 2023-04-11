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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Esse aliquid ad, iusto ducimus debitis aliquam nostrum
                                libero eos impedit eum. Repudiandae quia est quas itaque
                                eveniet aliquid delectus illo sed?</p>
                            <Link className="btn btn-primary" onClick={() => window.location = 'tel:{companyInfo.telephone}'}>Call Us Today</Link>
                        </section>

                        <section className="col-lg-6">
                            <h2>Get In Touch</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Esse aliquid ad, iusto ducimus debitis aliquam nostrum
                                libero eos impedit eum. Repudiandae quia est quas itaque
                                eveniet aliquid delectus illo sed?</p>

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