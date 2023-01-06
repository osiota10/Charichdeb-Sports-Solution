import ServiceCard from "../cards/serviceCard";
import Slider from "react-slick";
import { useContext } from "react";
import { ServiceContext } from "../../App";
import { Link } from "react-router-dom";



function ServiceGroup() {
    const settings = {
        dots: true,
        arrows: true,
        className: "center",
        infinite: false,
        centerPadding: "160px",
        slidesToShow: 3,
        swipeToSlide: true,
        afterChange: function (index) {
            console.log(
                `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
        },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
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
    const ServiceList = useContext(ServiceContext)


    return (
        <section className="p-10 bg-primary what-we-do">
            <section className='container'>
                <header className="text-center">
                    <h2 className="text-secondary mb-8">What We Do</h2>
                </header>

                <section>
                    <Slider {...settings}>
                        {ServiceList.map(item => <ServiceCard key={item.id} title={item.title} image={item.get_image_url} />)}
                    </Slider>

                    <div className='d-flex justify-content-center'>
                        <Link to="/services" className='btn btn-secondary mt-9'>See all</Link>
                    </div>
                </section>
            </section>
        </section>
    );
}

export default ServiceGroup;