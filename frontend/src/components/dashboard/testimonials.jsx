import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../App";
import axios from "axios";

const TestimonialDashboard = () => {
    const CurrentUserInfo = useContext(UserInfoContext)
    const [testimonials, setTestimonial] = useState([])
    const isTestimonial = Object.keys(testimonials).length === 0

    console.log(testimonials)

    useEffect(() => {
        // Testimonial info
        const fetchTestimonialData = async () => {
            if (localStorage.getItem('access')) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    axios.get(`${process.env.REACT_APP_API_URL}/dashboard-testimonials`, config)
                        .then(res => {
                            setTestimonial(res.data)
                        })
                } catch (err) {
                    console.error("User not authenticated");
                }
            } else {
                console.error("User not authenticated");
            }
        }

        fetchTestimonialData()
    }, [])

    return (
        <section className="container">
            <h2 class="text-center mb-4">Testimonials</h2>

            <section className={isTestimonial ? "d-block btn btn-primary py-6" : "d-block btn btn-primary py-6 disabled"}>
                Add Testimonials <i className="fa-solid fa-plus ms-1"></i>
            </section>

            <section className="py-8">
                {
                    isTestimonial
                        ?
                        <h4 className="text-center">No Testimonial</h4>
                        :
                        <>
                            <section className='row row-cols-1 row-cols-lg-1 g-6 justify-content-center'>
                                {
                                    testimonials.map((item) =>
                                        <section className="col">
                                            <div class="card test-card mx-auto">
                                                <div class="card-body">
                                                    <div class="row g-3 align-items-center">
                                                        <div class="col-lg-4">
                                                            <section class="text-center mb-1">
                                                                <img src={CurrentUserInfo.get_photo_url} class="img-fluid rounded-circle "
                                                                    alt={CurrentUserInfo.first_name} width="150" height="150" />
                                                            </section>
                                                            <section class="text-center">
                                                                <h4 class="card-title">{CurrentUserInfo.last_name} {CurrentUserInfo.first_name}</h4>
                                                                <small class="card-title badge rounded-pill text-bg-primary ">{CurrentUserInfo.sport}</small>
                                                            </section>
                                                        </div>
                                                        <div class="col-lg-8">
                                                            <div>
                                                                <i class="fa-solid fa-quote-left text-primary fs-4"></i>
                                                                <p class="card-text">{item.body}</p>
                                                                <i class="fa-solid fa-quote-right text-primary d-flex justify-content-end fs-4"></i>
                                                            </div>
                                                            <button className="justify-content-end btn btn-primary">
                                                                Edit <i className="fa-solid fa-pen-to-square ms-1"></i>
                                                            </button>
                                                            <section class="card-title badge rounded-pill text-bg-primary text-center ms-2">Approved</section>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    )
                                }
                            </section>
                        </>
                }
            </section>
        </section>
    );
}

export default TestimonialDashboard;