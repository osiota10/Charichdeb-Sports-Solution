import ServiceGroup from "../cardGroups/serviceGroup";
import EventGroup from "../cardGroups/eventGroup";
import WorkProcess from "../cardGroups/workProcessGroup";
import TestimonialGroup from "../cardGroups/testimonialGroup";
import StatCard from "../cards/stats";
import AthleteGroup from "../cardGroups/athleteGroup";
import { useContext, useState, useEffect } from "react";
import { CompanyInformationContext } from "../../App";
import parse from 'html-react-parser';
import axios from "axios";



const pic = {
    url: 'https://img.freepik.com/free-photo/athlete-ready-run-with-are-you-ready-message_23-2149074274.jpg?size=626&ext=jpg&ga=GA1.2.1699289041.1668069491'
}

function HomePage() {
    const companyInfo = useContext(CompanyInformationContext)
    const [hero, setHero] = useState([]);

    useEffect(() => {
        // Service
        axios.get(`http://127.0.0.1:8000/events`)
            .then(res => {
                setHero(res.data)
            })
    }, []);

    return (
        <section>


            <section className="card hero">
                <div className="text-bg-dark">
                    <section className="ratio ratio-16x9">
                        <img src={pic.url} className="card-img img-fluid" alt="..." />
                    </section>

                    <div className="card-img-overlay img-dark-overlay">
                        <div className="py-5 my-5 text-center position-absolute top-50 start-50 translate-middle w-75">
                            <h1 className="display-5 text-white">Centered hero</h1>
                            <div className="col-lg-8 mx-auto">
                                <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                    <button type="button" className="btn btn-secondary">Contact Us</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className=' w-75 mx-auto mt-n6 stat'>
                <StatCard />
            </section>


            <section className="container py-10">
                <section className="row">
                    <section className="col-lg-8 mx-auto">
                        <h2 className="text-center">{companyInfo.company_name}</h2>
                        {parse(`${companyInfo.about_company}`)}
                    </section>
                </section>
            </section>
            <ServiceGroup />
            <WorkProcess />
            <AthleteGroup />
            <EventGroup />
            <TestimonialGroup />
        </section>
    );
}

export default HomePage;