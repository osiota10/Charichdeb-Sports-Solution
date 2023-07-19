import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../App";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TestimonialDashboard = () => {
    const CurrentUserInfo = useContext(UserInfoContext)
    const [testimonials, setTestimonial] = useState([])
    const isTestimonial = Object.keys(testimonials).length === 0
    const [loading, setLoading] = useState(false);

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

    // Show Modal
    const [showModal, setShowModal] = useState(false);
    const handleShowModalClose = () => setShowModal(false);
    const handleShowModalShow = () => setShowModal(true);

    // Check Modal type
    const [isEditModal, setIsEditModal] = useState(false);

    // Edit
    const [formEditData, setFormEditData] = useState({
        designation: '',
        body: '',
    });

    const handleEdit = (item) => {
        handleShowModalShow()
        setIsEditModal(true)
        setFormEditData(item)
    }

    const handleEditFormInputChange = (event) => {
        const { name, value } = event.target;
        setFormEditData({ ...formEditData, [name]: value });
    };

    const onEditSubmit = e => {
        e.preventDefault();
        setLoading(true)

        const submitData = async () => {
            if (localStorage.getItem('access')) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };

                const body = JSON.stringify(formEditData);

                try {
                    const res = await axios.put(`${process.env.REACT_APP_API_URL}/dashboard-testimonials`, body, config);
                    setLoading(false)

                    if (res.status === 200) {
                        handleShowModalClose()
                        // handleButtonClick()
                    }
                } catch (err) {
                    console.log(err);
                    setLoading(false)
                }
            } else {
                console.error("User not authenticated");
            }
        }

        submitData()
    };

    // Add
    const handleAdd = () => {
        handleShowModalShow()
        setIsEditModal(false)
    }

    return (
        <section className="container">
            <h2 class="text-center mb-4">Testimonials</h2>

            <section className={isTestimonial ? "d-block btn btn-primary py-6" : "d-block btn btn-primary py-6 "} onClick={() => handleAdd()}>
                Add Testimonials <i className="fa-solid fa-plus ms-1"></i>
            </section>

            <section className="py-8">
                {
                    isTestimonial
                        ?
                        <h4 className="text-center">No Testimonial</h4>
                        :
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
                                                        <button className="justify-content-end btn btn-primary" onClick={() => handleEdit(item)}>
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
                }
            </section>

            <Modal
                show={showModal}
                onHide={handleShowModalClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isEditModal ? 'Edit Testimonial' : 'Add Testimonial'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {isEditModal
                        ?
                        <form onSubmit={e => onEditSubmit(e)}>
                            <section className="row g-3">
                                <div class="col-12">
                                    <label for="designation" class="form-label">Designation</label>
                                    <input
                                        type="text"
                                        class="form-control inputfield bg-light"
                                        id="designation"
                                        name="designation"
                                        value={formEditData.designation}
                                        onChange={handleEditFormInputChange}
                                        required />
                                </div>
                                <div class="col-12">
                                    <label for="body" class="form-label">Body</label>
                                    <textarea
                                        class="form-control inputfield bg-light"
                                        id="body"
                                        rows="4"
                                        onChange={handleEditFormInputChange}
                                        name="body"
                                        value={formEditData.body}
                                        required
                                    ></textarea>
                                </div>
                                <section className="d-grid">
                                    <button
                                        type="submit"
                                        className={loading ? 'btn btn-primary disabled' : 'btn btn-primary'}
                                    >
                                        {loading
                                            ?
                                            <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                            :
                                            null
                                        }
                                        Submit
                                    </button>
                                </section>
                            </section>
                        </form>
                        :
                        'Add'
                    }
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="btn btn-danger" onClick={handleShowModalClose} >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default TestimonialDashboard;