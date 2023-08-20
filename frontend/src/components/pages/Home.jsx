import ServiceGroup from "../cardGroups/serviceGroup";
import WorkProcess from "../cardGroups/workProcessGroup";
import TestimonialGroup from "../cardGroups/testimonialGroup";
import StatCard from "../cards/stats";
import AthleteGroup from "../cardGroups/athleteGroup";
import { useContext, useLayoutEffect, useState } from "react";
import { CompanyInformationContext } from "../../App";
import Slider from "react-slick";
import TextTruncate from 'react-text-truncate';
import { Link } from "react-router-dom";
import axios from "axios";
import { ServiceContext } from "../../App";



const pic = {
    url: 'https://joy1.videvo.net/videvo_files/video/free/2016-07/large_watermarked/160721_1_StartingStopwatch1_1080p_preview.mp4'
}

function HomePage() {
    const [sportsCoverage, setSportsCoverage] = useState([]);

    const settings = {
        dots: false,
        arrows: false,
        className: "center",
        infinite: true,
        centerPadding: "160px",
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        // afterChange: function (index) {
        //     console.log(
        //         `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        //     );
        // },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
        ]
    };

    const companyInfo = useContext(CompanyInformationContext)
    const services = useContext(ServiceContext)


    useLayoutEffect(() => {
        //Sports Coverage
        axios.get(`${process.env.REACT_APP_API_URL}/sportcoverage`)
            .then(res => {
                setSportsCoverage(res.data)
            })

    }, []);
    return (

        <section>
            <section className="card hero">
                <div className="text-bg-dark">
                    <section className="ratio ratio-21x9">
                        <video src={pic.url} muted loop autoPlay></video>
                    </section>

                    <div className="card-img-overlay img-dark-overlay">
                        <div className="py-5 text-center position-absolute top-50 start-50 translate-middle w-75">
                            <h4 className="text-secondary">The future of</h4>
                            <Slider {...settings}>
                                {services.map((item) =>
                                    <h1 className="text-white">{item.title}</h1>
                                )}
                            </Slider>

                        </div>
                    </div>
                </div>
            </section>

            <section className=' w-75 mx-auto mt-n8 stat'>
                <StatCard />
            </section>

            {companyInfo.about_company
                ?
                <section className="container py-10">
                    <section className="row">
                        <section className="col-lg-8 mx-auto">
                            <h2 className="text-center">About Us</h2>
                            <TextTruncate
                                line={7}
                                element="p"
                                truncateText="…"
                                text={companyInfo.safe_about_body_html}
                            />
                            <div className='d-flex justify-content-center'>
                                <Link to="/about" className='btn btn-primary mt-3'>Read More</Link>
                            </div>
                        </section>
                    </section>
                </section>
                :
                null
            }


            <ServiceGroup />
            <WorkProcess />
            <AthleteGroup />

            {Object.keys(sportsCoverage).length === 0
                ?
                null
                :
                <section className="py-10 bg-light">
                    <section className="container">
                        <header className="text-center">
                            <h2 className="mb-8">Our Sports Coverage</h2>
                        </header>
                        <section className="row row-cols-1 row-cols-lg-4 g-4 justify-content-center text-center">
                            {sportsCoverage.map((item) =>
                                <section className="col" key={item.id}>
                                    <section className="card">
                                        <section className="card-body">
                                            <h4>{item.name}</h4>
                                        </section>
                                    </section>
                                </section>
                            )}
                        </section>
                    </section>
                </section>
            }

            {/* <EventGroup /> */}

            <TestimonialGroup />
        </section>
    );
}

export default HomePage;