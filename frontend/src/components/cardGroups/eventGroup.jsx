import EventCard from "../cards/eventCard";
import Slider from "react-slick";
import { useContext } from "react";
import { EventContext } from "../../App";
import { Link } from "react-router-dom";



function EventGroup() {
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
    const EventList = useContext(EventContext)

    return (
        <>
            {Object.keys(EventList).length === 0
                ?
                null
                :
                <section className="py-10 bg-light upcoming-events">
                    <section className='container'>
                        <header className="text-center">
                            <h2 className="mb-8">Upcoming Events</h2>
                        </header>

                        <section>
                            <Slider {...settings}>
                                {EventList.slice(0, 9).map(item => <Link className='text-decoration-none' to={'/events/' + item.slug}><EventCard key={item.id} title={item.title} body={item.safe_body_html} image={item.get_image_url} date={item.event_date} /></Link>)}
                            </Slider>

                            <div className='d-flex justify-content-center'>
                                <Link to="/events" className='btn btn-primary mt-9'>See all</Link>
                            </div>
                        </section>
                    </section>
                </section>
            }
        </>

    );
}

export default EventGroup;