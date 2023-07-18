import { useContext } from "react";
import { UserInfoContext } from "../../App";

const TestimonialDashboard = () => {
    const CurrentUserInfo = useContext(UserInfoContext)

    return (
        <section className="container">
            <h2 class="text-center mb-4">Testimonials</h2>

            <section className="d-block btn btn-primary py-6">
                Add Testimonials <i className="fa-solid fa-plus ms-1"></i>
            </section>

            <section className="d-block btn btn-outline-primary py-6 mt-4">
                Edit Testimonials <i className="fa-solid fa-pen-to-square ms-1"></i>
            </section>

            <section className="py-8">
                <section className='row row-cols-1 row-cols-lg-1 g-6 justify-content-center'>
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
                                        <section class="card-title badge rounded-pill text-bg-primary text-center">Approved</section>
                                        <div>
                                            <i class="fa-solid fa-quote-left text-primary fs-4"></i>
                                            <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, quis. Ut repellat adipisci suscipit omnis sit magnam necessitatibus aut ex. Quam eos nostrum tenetur sunt, quas omnis voluptatum magnam minus.</p>
                                            <i class="fa-solid fa-quote-right text-primary d-flex justify-content-end fs-4"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </section>
        </section>
    );
}

export default TestimonialDashboard;