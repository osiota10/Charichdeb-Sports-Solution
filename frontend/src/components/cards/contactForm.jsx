import { useState } from "react";
import axios from "axios";

function ContactForm() {
    const [formData, setFormData] = useState({
        full_name: '',
        location: '',
        email: '',
        phone_number: '',
        message: '',
    });

    const { full_name, location, email, phone_number, message } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        // declare the data fetching function
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            const body = JSON.stringify({ full_name, location, email, phone_number, message });

            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/contact-us`, body, config);

            } catch (err) {
                console.error("User not authenticated");
            }
        }

        fetchData()

        // setTimeout(() => {
        //     navigate('/dashboard')
        // }, 2000)
    };

    return (
        <section className="bg-light py-10">
            <section className="container">
                <section className="row">
                    <section className="col-lg-10 mx-auto">
                        <header className="text-center mb-8">
                            <h2>Contact Form</h2>
                        </header>

                        <form class="row g-3" onSubmit={e => onSubmit(e)}>
                            <div class="col-md-6">
                                <label for="full_name" class="form-label">Full Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="full_name"
                                    placeholder="E.g John Smith"
                                    onChange={e => onChange(e)}
                                    name="full_name"
                                    value={full_name}
                                    required
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="location" class="form-label">Location</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="location"
                                    placeholder="E.g Asaba, Nigeria"
                                    onChange={e => onChange(e)}
                                    name="location"
                                    value={location}
                                    required
                                />
                            </div>

                            <div class="col-md-6">
                                <label for="email" class="form-label">Email</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    placeholder="E.g johnsmith@example.com"
                                    onChange={e => onChange(e)}
                                    name="email"
                                    value={email}
                                    required
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="phone_number" class="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="phone_number"
                                    placeholder="E.g +234XXXXXXXXX"
                                    onChange={e => onChange(e)}
                                    name="phone_number"
                                    value={phone_number}
                                    required
                                />
                            </div>

                            <div class="col-md-12">
                                <label for="message" class="form-label">Message</label>
                                <textarea
                                    class="form-control"
                                    id="message"
                                    rows="4"
                                    placeholder="Enter a Message..."
                                    onChange={e => onChange(e)}
                                    name="message"
                                    value={message}
                                    required
                                ></textarea>
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