import { useContext, useEffect, useState, useCallback } from "react";
import { UserInfoContext } from "../../App";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import parse from 'html-react-parser';
import Alert from 'react-bootstrap/Alert';

const TestimonialDashboard = () => {
    const CurrentUserInfo = useContext(UserInfoContext)
    const [testimonials, setTestimonial] = useState([])
    const isTestimonial = Object.keys(testimonials).length === 0
    const [loading, setLoading] = useState(false);

    const fetchTestimonialData = useCallback(async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard-testimonials`, config);
                return res.data;
            } catch (err) {
                console.error("User not authenticated");
                return [];
            }
        } else {
            console.error("User not authenticated");
            return [];
        }
    }, []); // The empty dependency array ensures the function is memoized

    useEffect(() => {
        fetchTestimonialData().then((data) => setTestimonial(data));
    }, [fetchTestimonialData]) // Re-fetch testimonial data whenever onEditSubmit is called

    // Show Modal
    const [showModal, setShowModal] = useState(false);
    const handleShowModalClose = () => setShowModal(false);
    const handleShowModalShow = () => setShowModal(true);

    // Check Modal type
    const [isEditModal, setIsEditModal] = useState(false);

    // Edit Functionality
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
                        const updatedTestimonials = await fetchTestimonialData();
                        setTestimonial(updatedTestimonials);
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

    // Add Functionality
    const handleAdd = () => {
        handleShowModalShow()
        setIsEditModal(false)
    }

    const [formAddData, setFormAddData] = useState({
        designation: '',
        body: '',
    });
    const { designation, body } = formAddData;
    const onAddChange = e => setFormAddData({ ...formAddData, [e.target.name]: e.target.value });

    const onAddSubmit = e => {
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

                const body = JSON.stringify(formAddData);

                try {
                    const res = await axios.post(`${process.env.REACT_APP_API_URL}/dashboard-testimonials`, body, config);
                    setLoading(false)

                    if (res.status === 201) {
                        handleShowModalClose()
                        const updatedTestimonials = await fetchTestimonialData();
                        setTestimonial(updatedTestimonials);
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


    return (
        <section className="container">
            <h2 class="text-center mb-4">Testimonials</h2>
            {
                isTestimonial
                    ?
                    null
                    :
                    <Alert variant="info" className="fw-bold">
                        You can only add one Testimonial. Click on edit to make necessary changes
                    </Alert>
            }

            <section className={`d-block btn btn-primary py-6 ${isTestimonial ? null : 'disabled'}`} onClick={() => handleAdd()}>
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
                                                            <small class="card-title badge rounded-pill text-bg-primary ">{item.designation}</small>
                                                        </section>
                                                    </div>
                                                    <div class="col-lg-8">
                                                        <div>
                                                            <i class="fa-solid fa-quote-left text-primary fs-4"></i>
                                                            <p class="card-text">{parse(`${item.body}`)}</p>
                                                            <i class="fa-solid fa-quote-right text-primary d-flex justify-content-end fs-4"></i>
                                                        </div>
                                                        <button className="justify-content-end btn btn-primary" onClick={() => handleEdit(item)}>
                                                            Edit <i className="fa-solid fa-pen-to-square ms-1"></i>
                                                        </button>
                                                        <section
                                                            className={`card-title badge rounded-pill ms-2 
                                                            ${item.is_featured === false ? "text-bg-warning" : "text-bg-primary"}`}
                                                        >
                                                            {
                                                                item.is_featured === false
                                                                    ?
                                                                    'Pending Approval'
                                                                    :
                                                                    'Approved'
                                                            }
                                                        </section>
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
                        <form onSubmit={e => onAddSubmit(e)}>
                            <section className="row g-3">
                                <div class="col-12">
                                    <label for="designation" class="form-label">Designation</label>
                                    <input
                                        type="text"
                                        class="form-control inputfield bg-light"
                                        id="designation"
                                        name="designation"
                                        placeholder="E.g Men's 100m"
                                        value={designation}
                                        onChange={onAddChange}
                                        required />
                                </div>
                                <div class="col-12">
                                    <label for="body" class="form-label">Body</label>
                                    <textarea
                                        class="form-control inputfield bg-light"
                                        id="body"
                                        rows="4"
                                        onChange={onAddChange}
                                        placeholder="Write testimony here"
                                        name="body"
                                        value={body}
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