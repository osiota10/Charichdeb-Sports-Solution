import AthleteCard from "../cards/athleteCard";
import Slider from "react-slick";
import { useContext } from "react";
import { AthleteContext } from "../../App";
import { Link } from "react-router-dom";



function AthleteGroup() {
    const settings = {
        dots: true,
        arrows: true,
        className: "center",
        infinite: false,
        centerPadding: "160px",
        slidesToShow: 3,
        swipeToSlide: true,
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

    const AthleteList = useContext(AthleteContext)

    return (
        <>
            {Object.keys(AthleteList).length === 0
                ?
                null
                :
                <section className="py-10">
                    <section className='container'>
                        <header className="text-center mb-8">
                            <h2>Our Athletes</h2>
                        </header>

                        <section className="row justify-content-center">
                            <Slider {...settings}>
                                {AthleteList.slice(0, 9).map(item =>
                                    <Link className='text-decoration-none' >
                                        <AthleteCard key={item.id}
                                            firstName={item.first_name}
                                            lastName={item.last_name}
                                            pic={item.get_photo_url}
                                            sport={item.sport}
                                            state_of_origin={item.state_of_origin}
                                            nationality={item.nationality}
                                            weight={item.weight}
                                            height={item.height}
                                            sportstats={item.sportstats}
                                        />
                                    </Link>)}
                            </Slider>
                        </section>
                        <div className='d-flex justify-content-center'>
                            <Link to="/athletes" className='btn btn-primary mt-9'>See all</Link>
                        </div>
                    </section>
                </section>
            }
        </>

    );
}

export default AthleteGroup;