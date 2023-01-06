

function ContactForm() {
    return (
        <section className="bg-light py-10">

            <section className="container">
                <section className="row">
                    <section className="col-lg-10 mx-auto">
                        <header className="text-center mb-8">
                            <h2>Contact Form</h2>
                            <p>Lorem ipsum dolor sit amet</p>
                        </header>

                        <form class="row g-3">
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="inputEmail4" placeholder="E.g John Smith" />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Location</label>
                                <input type="text" class="form-control" id="inputEmail4" placeholder="E.g Asaba, Nigeria" />
                            </div>

                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Email</label>
                                <input type="email" class="form-control" id="inputEmail4" placeholder="E.g johnsmith@example.com" />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Phone Number</label>
                                <input type="number" class="form-control" id="inputEmail4" placeholder="E.g +234XXXXXXXXX" />
                            </div>

                            <div class="col-md-12">
                                <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter a Message..."></textarea>
                            </div>


                            <div class="col-12 d-grid">
                                <button type="submit" class="btn btn-primary ">Submit</button>
                            </div>
                        </form>
                    </section>
                </section>
            </section>
        </section>
    );
}

export default ContactForm;