import { useState, useContext } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CompanyInformationContext } from "../../App";
import LoaderIcon from "../dashboard/components/loader";

function ContactForm() {
    const [loading, setLoading] = useState(false);
    const companyInfo = useContext(CompanyInformationContext)

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        setLoading(true)

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
                setLoading(false)
                if (res.status === 201) {
                    handleShow()
                    setFormData({
                        full_name: '',
                        location: '',
                        email: '',
                        phone_number: '',
                        message: '',
                    })
                }
            } catch (err) {
                console.error("User not authenticated");
            }
        }
        fetchData()
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
                                <button type="submit"
                                    class={loading ? 'btn btn-primary disabled' : 'btn btn-primary'}>

                                    {loading
                                        ?
                                        <LoaderIcon />
                                        :
                                        null
                                    }

                                    Send Message
                                </button>
                            </div>
                        </form>
                    </section>
                </section>
            </section>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thank you</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Thank you for contacting us. Our Business Development Representative will get in touch with you as soon as possible.
                    If you would like to speak to someone immediately, feel free to email us at <span className="fw-bold">{companyInfo.email}</span> or call at <span className="fw-bold">{companyInfo.telephone}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default ContactForm;