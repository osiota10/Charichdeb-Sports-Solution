import TestimonialCard from "../cards/testimonialCard";
import { TestimoninailContext } from "../../App";
import { useContext } from "react";
import Slider from "react-slick";



function TestimonialGroup() {
    const settings = {
        dots: false,
        arrows: true,
        className: "center",
        infinite: true,
        centerPadding: "160px",
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 10000,
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

    const TestimonialList = useContext(TestimoninailContext)

    return (
        <>
            {Object.keys(TestimonialList).length === 0
                ?
                null
                :
                <section className="container py-10 testimonials">
                    <header className="text-center">
                        <h2 className="mb-8">Testimonials</h2>
                    </header>

                    <section>
                        <section className="row">
                            <section className="col-lg-8 mx-auto">
                                <Slider {...settings}>
                                    {TestimonialList.map(item => <TestimonialCard key={item.id} name={item.name} title={item.designation} pic={item.get_image_url} message={item.body} />)}
                                </Slider>
                            </section>
                        </section>
                    </section>
                </section>
            }
        </>

    );
}

export default TestimonialGroup;