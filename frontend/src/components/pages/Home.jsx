import ServiceGroup from "../cardGroups/serviceGroup";
import EventGroup from "../cardGroups/eventGroup";
import WorkProcess from "../cardGroups/workProcessGroup";
import TestimonialGroup from "../cardGroups/testimonialGroup";
import StatCard from "../cards/stats";
import AthleteGroup from "../cardGroups/athleteGroup";
import { useContext } from "react";
import { CompanyInformationContext } from "../../App";
import parse from 'html-react-parser';
import Slider from "react-slick";



const pic = {
    url: 'https://joy1.videvo.net/videvo_files/video/free/2016-07/large_watermarked/160721_1_StartingStopwatch1_1080p_preview.mp4'
}

function HomePage() {
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
                                <h1 className="text-white">Sports Development</h1>
                                <h1 className="text-white">Entertainment Development</h1>
                                <h1 className="text-white">Sports Recruitment</h1>
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
                            {parse(`${companyInfo.about_company}`)}
                        </section>
                    </section>
                </section>
                :
                null
            }


            <ServiceGroup />
            <WorkProcess />
            <AthleteGroup />
            <EventGroup />
            <TestimonialGroup />
        </section>
    );
}

export default HomePage;