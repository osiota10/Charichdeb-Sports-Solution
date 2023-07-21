import { useContext, useEffect, useState, useCallback } from "react";
import { UserInfoContext } from "../../App";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ToastMessage from "../cards/toastMsg";
import LoaderIcon from "./components/loader";


function DashboardHome({ onProfileRefresh }) {
    const CurrentUserInfo = useContext(UserInfoContext)

    //List Sport Stat
    const fetchStatData = useCallback(async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/sport-stat`, config);
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

    //Age Calculator
    const calculateAge = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();

        // Check if the user's birthday hasn't occurred yet this year
        if (today.getMonth() < dob.getMonth() ||
            (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
            age--;
        }

        return age;
    };

    const [sportStat, setSportStat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalState, setModalstate] = useState('')
    const [formSuccessState, setFormSuccessState] = useState('')

    // Toast
    const [showToast, setShowToast] = useState(false);
    const handleToastShow = () => setShowToast(true);
    const handleToastClose = () => setShowToast(false);

    // Modal
    const [showModal, setShowModal] = useState(false);
    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    //Delete item
    const [itemToDelete, setItemToDelete] = useState({
        event: '',
        pb: '',
    })

    const handleDeleteitem = (item) => {
        setModalstate('Delete')
        handleModalShow()
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
                    setFormSuccessState('deleted')
                    handleModalClose()
                    handleToastShow()
                }

            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        } else {
            console.error("User not authenticated");
        }
    };

    // Add Sport Stat
    const handleAddStat = () => {
        setModalstate('Add')
        handleModalShow()
    }

    const [formAddData, setFormAddData] = useState({
        event: '',
        pb: '',
    });

    const { event, pb } = formAddData;
    const onChange = e => setFormAddData({ ...formAddData, [e.target.name]: e.target.value });

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
                        setLoading(false)
                        setFormSuccessState('added')
                        handleModalClose()
                        handleToastShow()
                        setFormAddData({
                            event: '',
                            pb: '',
                        })
                        const updatedStats = await fetchStatData();
                        setSportStat(updatedStats);
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

    useEffect(() => {
        fetchStatData().then((data) => setSportStat(data));
    }, [fetchStatData, onProfileRefresh]);

    // Edit Stat
    const [formEditData, setFormEditData] = useState({
        id: '',
        event: '',
        pb: '',
    });

    const handleEdit = (item) => {
        setModalstate('Edit')
        handleModalShow()
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
                        handleModalClose()
                        setFormSuccessState('edited')
                        handleToastShow()
                        const updatedStats = await fetchStatData();
                        setSportStat(updatedStats);
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

                        <section className="table-responsive p-2">
                            <table className="table ">
                                <thead className="table-primary">
                                    <tr>
                                        <th scope="col" colspan="2" className="text-center">Bio-Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Age:</td>
                                        <td>{calculateAge(CurrentUserInfo.date_of_birth)} years</td>
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
                        <section class="table-responsive mt-2 p-2">
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
                                    onClick={() => handleAddStat()}>
                                    Add Event
                                </button>
                            </section>
                        </section>
                    </section>
                </section>
            </section>

            <Modal
                show={showModal}
                onHide={handleModalClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            modalState === "Add"
                                ?
                                'Add Event and PB'
                                :
                                null
                        }

                        {
                            modalState === "Edit"
                                ?
                                'Edit Event/Pb'
                                :
                                null
                        }

                        {
                            modalState === "Delete"
                                ?
                                'Delete Event/Pb'
                                :
                                null
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        modalState === "Add"
                            ?
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
                                                <LoaderIcon />
                                                :
                                                null
                                            }
                                            Add
                                        </button>
                                    </div>
                                </section>
                            </form>
                            :
                            null
                    }

                    {
                        modalState === "Edit"
                            ?
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
                                                <LoaderIcon />
                                                :
                                                null
                                            }
                                            Submit
                                        </button>
                                    </section>
                                </section>
                            </form>
                            :
                            null
                    }

                    {
                        modalState === "Delete"
                            ?
                            <section>
                                Are you sure you want to delete
                                <span className="text-primary"> {itemToDelete.event} </span>
                                with a Pb of <span className="text-primary">{itemToDelete.pb}</span>?
                                Action cannot be undone.
                            </section>
                            :
                            null
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="btn btn-outline-primary" onClick={handleModalClose}>
                        Close
                    </Button>
                    {
                        modalState === "Delete"
                            ?
                            <Button variant={loading ? 'btn btn-danger disabled' : 'btn btn-danger'} onClick={handleDeleteClick}>
                                {loading
                                    ?
                                    <LoaderIcon />
                                    :
                                    null
                                }

                                Delete
                            </Button>
                            :
                            null
                    }
                </Modal.Footer>
            </Modal>

            {/* Toast Message */}
            {showToast
                ?
                <ToastMessage
                    show={showToast}
                    onClose={handleToastClose}
                    message={`Event/Pb Successfully ${formSuccessState === 'edited' ? 'updated' : ''} ${formSuccessState === 'deleted' ? 'Delete' : ''} ${formSuccessState === 'added' ? 'Added' : ''}`}
                    variant="success"
                />
                :
                null
            }
        </section>
    );
}

export default DashboardHome;