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
        infinite: true,
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

    const AthleteList = useContext(AthleteContext)

    return (
        <section className="p-10">
            <section className='container'>
                <header className="text-center mb-8">
                    <h2>Our Athletes</h2>
                </header>

                <section>
                    <Slider {...settings}>
                        {AthleteList.slice(0, 9).map(item => <Link className='text-decoration-none' to={'/athletes/' + item.id}><AthleteCard key={item.id} name={item.name} state={item.address.city} sports={item.username} event={item.company.name} age={item.address.zipcode} /></Link>)}
                    </Slider>

                    <div className='d-flex justify-content-center'>
                        <Link to="/athletes" className='btn btn-primary mt-9'>See all</Link>
                    </div>
                </section>
            </section>
        </section>
    );
}

export default AthleteGroup;