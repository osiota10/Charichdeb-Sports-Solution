import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../App";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ToastMessage from "../cards/toastMsg";


function DashboardHome() {
    const CurrentUserInfo = useContext(UserInfoContext)

    const [sportStat, setSportStat] = useState([]);
    const [loading, setLoading] = useState(false);

    // Toast
    const [showToast, setShowToast] = useState(false);
    const handleButtonClick = () => setShowToast(true);
    const handleToastClose = () => setShowToast(false);

    // Add Sport Stat
    const [showAdd, setAddShow] = useState(false);
    const handleAddClose = () => setAddShow(false);
    const handleAddShow = () => setAddShow(true);
    const [formAddData, setFormAddData] = useState({
        event: '',
        pb: '',
    });
    const { event, pb } = formAddData;
    const onChange = e => setFormAddData({ ...formAddData, [e.target.name]: e.target.value });

    //Delete item
    const [itemToDelete, setItemToDelete] = useState({
        event: '',
        pb: '',
    })
    const [showDelete, setDeleteShow] = useState(false);
    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);
    const [deleteSuccess, setDeleteSuccess] = useState(false)

    const handleDeleteitem = (item) => {
        handleDeleteShow()
        setItemToDelete(item)
    }

    // Handle delete button click
    const handleDeleteClick = async () => {
        setLoading(true)
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}/sport-stat/${itemToDelete.id}`, config);
                setSportStat(sportStat.filter((i) => i.id !== itemToDelete.id));
                if (res.status === 204) {
                    setLoading(false)
                    handleDeleteClose()
                    setDeleteSuccess(true)
                }

            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        } else {
            console.error("User not authenticated");
        }
    };

    // Add Sport Stat Success
    const [showAddSuccess, setAddSuccessShow] = useState(false);
    const handleAddSuccessClose = () => setAddSuccessShow(false);
    const handleAddSuccessShow = () => setAddSuccessShow(true);

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

                const body = JSON.stringify({ event, pb });

                try {
                    const res = await axios.post(`${process.env.REACT_APP_API_URL}/sport-stat`, body, config);
                    if (res.status === 201) {
                        handleAddClose()
                        handleAddSuccessShow()
                        setLoading(false)
                    }

                } catch (err) {
                    console.error("User not authenticated");
                    setLoading(false)
                }
            } else {
                console.error("User not authenticated");
            }
        }

        submitData()
    };

    // Edit Form
    const [showEditModal, setShowEditModal] = useState(false);
    const handleShowEditModalClose = () => setShowEditModal(false);
    const handleShowEditModalShow = () => setShowEditModal(true);

    const [formEditData, setFormEditData] = useState({
        id: '',
        event: '',
        pb: '',
    });

    //List Sport Stat
    const fetchData = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                axios.get(`${process.env.REACT_APP_API_URL}/sport-stat`, config)
                    .then(res => {
                        setSportStat(res.data)
                    })
            } catch (err) {
                console.error("User not authenticated");
            }
        } else {
            console.error("User not authenticated");
        }
    }

    useEffect(() => {
        fetchData()
    }, []);


    // Edit
    const handleEdit = (item) => {
        handleShowEditModalShow()
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
                    const res = await axios.put(`${process.env.REACT_APP_API_URL}/sport-stat/${formEditData.id}`, body, config);
                    setLoading(false)

                    if (res.status === 200) {
                        handleShowEditModalClose()
                        handleButtonClick()
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
        <section className="container pb-6">
            <section className="row g-8">
                <section className="col-lg-6">
                    <section className="card">
                        <section className="text-center mt-4">
                            <img src={CurrentUserInfo.get_photo_url} class="d-flex justify-content-center align-items-center rounded-circle mx-auto mb-2" width="150" height="150" alt="..." />
                            <h4>{CurrentUserInfo.last_name} {CurrentUserInfo.first_name}</h4>
                            <p className="badge rounded-pill text-bg-primary">{CurrentUserInfo.sport}</p>
                        </section>

                        <section className="table-responsive mt-4 p-2">
                            <table className="table ">
                                <thead className="table-primary">
                                    <tr>
                                        <th scope="col" colspan="2" className="text-center">Bio-Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Age:</td>
                                        <td>26 yrs</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{CurrentUserInfo.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender:</td>
                                        <td>{CurrentUserInfo.gender}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone Number:</td>
                                        <td>{CurrentUserInfo.phone_number}</td>
                                    </tr>
                                    <tr>
                                        <td>Height:</td>
                                        <td>{CurrentUserInfo.height}m</td>
                                    </tr>
                                    <tr>
                                        <td>Weight:</td>
                                        <td>{CurrentUserInfo.weight}kg</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="table mt-4">
                                <thead className="table-primary">
                                    <tr>
                                        <th scope="col" colspan="2" className="text-center">Contact Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Home Address:</td>
                                        <td>{CurrentUserInfo.home_address}</td>
                                    </tr>
                                    <tr>
                                        <td>Local Govt.:</td>
                                        <td>{CurrentUserInfo.local_govt}</td>
                                    </tr>
                                    <tr>
                                        <td>State of Origin:</td>
                                        <td>{CurrentUserInfo.state_of_origin}</td>
                                    </tr>
                                    <tr>
                                        <td>Nationality:</td>
                                        <td>{CurrentUserInfo.nationality}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </section>
                </section>


                <section className="col-lg-6">
                    <section className="card sport-stat">
                        <h2 className="text-center mt-4">Sports Stat</h2>
                        <section class="table-responsive mt-5 p-2">
                            <table class="table ">
                                <thead class="table-primary">
                                    <tr>
                                        <th scope="col" colspan="3" class="text-center">Events and PBs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sportStat.map(item =>
                                        <tr>
                                            <td>{item.event}:</td>
                                            <td>{item.pb}</td>
                                            <td>
                                                <span className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(item)}>Edit</span>
                                                <span className="btn btn-danger btn-sm" onClick={() => handleDeleteitem(item)}>Delete</span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <section className="d-grid gap-2 col-6 mx-auto mb-4">
                                <button
                                    className="d-grid btn btn-primary"
                                    onClick={handleAddShow}>
                                    Add Event
                                </button>
                            </section>
                        </section>
                    </section>
                </section>
            </section>


            {/* Add Sport Stat */}
            <Modal
                show={showAdd}
                onHide={handleAddClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Event and PB</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e => onAddSubmit(e)}>
                        <section className="row g-3">
                            <div class="col-12">
                                <label for="event" class="form-label">Event</label>
                                <input
                                    type="text"
                                    class="form-control inputfield bg-light"
                                    id="event"
                                    name="event"
                                    value={event}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-12">
                                <label for="pb" class="form-label">PB</label>
                                <input
                                    type="text"
                                    class="form-control inputfield bg-light"
                                    id="pb"
                                    name="pb"
                                    value={pb}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div className="d-grid mt-3">
                                <button
                                    type="submit"
                                    className={loading ? 'btn btn-primary disabled' : 'btn btn-primary'}>

                                    {loading
                                        ?
                                        <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                        :
                                        null
                                    }
                                    Add
                                </button>
                            </div>
                        </section>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-outline-primary" onClick={handleAddClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Sport Stat Success Message */}
            {showAddSuccess
                ?
                <ToastMessage
                    show={showAddSuccess}
                    onClose={handleToastClose}
                    message="Event/Pb Successfully Added"
                    variant="success"
                />
                :
                null
            }


            {/* Edit form */}
            <Modal
                show={showEditModal}
                onHide={handleShowEditModalClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Event/Pb
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={e => onEditSubmit(e)}>
                        <section className="row g-3">
                            <div class="col-12">
                                <label for="event" class="form-label">Event</label>
                                <input
                                    type="text"
                                    class="form-control inputfield bg-light"
                                    id="event"
                                    name="event"
                                    value={formEditData.event}
                                    onChange={handleEditFormInputChange}
                                    required />
                            </div>
                            <div class="col-12">
                                <label for="pb" class="form-label">PB</label>
                                <input
                                    type="text"
                                    class="form-control inputfield bg-light"
                                    id="pb"
                                    name="pb"
                                    value={formEditData.pb}
                                    onChange={handleEditFormInputChange}
                                    required />
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
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="btn btn-danger" onClick={handleShowEditModalClose} >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit form success */}
            {showToast
                ?
                <ToastMessage
                    show={showToast}
                    onClose={handleToastClose}
                    message="Event/Pb Successfully updated"
                    variant="success"
                />
                :
                null
            }

            {/* Delete Sport Stat */}
            <Modal
                show={showDelete}
                onHide={handleDeleteClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete
                    <span className="text-primary"> {itemToDelete.event} </span>
                    with a Pb of <span className="text-primary">{itemToDelete.pb}</span>?
                    Action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-primary" onClick={handleDeleteClose}>
                        Close
                    </Button>
                    <Button variant={loading ? 'btn btn-danger disabled' : 'btn btn-danger'} onClick={handleDeleteClick}>
                        {loading
                            ?
                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            :
                            null
                        }

                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Success Message */}
            {deleteSuccess
                ?
                <ToastMessage
                    show={deleteSuccess}
                    onClose={handleToastClose}
                    message="Event/Pb Successfully deleted"
                    variant="success"
                />
                :
                null
            }
        </section>
    );
}

export default DashboardHome;