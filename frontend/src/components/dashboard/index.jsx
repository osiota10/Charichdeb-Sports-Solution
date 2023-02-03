import { useContext, useEffect, useState } from "react";
import { UserInfoContext, EventContext } from "../../App";
import EventCard from "../cards/eventCard";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


function DashboardHome() {
    const CurrentUserInfo = useContext(UserInfoContext)
    const EventList = useContext(EventContext)

    const [sportStat, setSportStat] = useState([]);

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

    // Add Sport Stat Success
    const [showAddSuccess, setAddSuccessShow] = useState(false);
    const handleAddSuccessClose = () => setAddSuccessShow(false);
    const handleAddSuccessShow = () => setAddSuccessShow(true);

    const onAddSubmit = e => {
        e.preventDefault();

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
                    }

                } catch (err) {
                    console.error("User not authenticated");
                }
            } else {
                console.error("User not authenticated");
            }
        }

        submitData()
    };



    useEffect(() => {
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

        fetchData()
    }, [onAddSubmit]);

    // window.location.reload(true);
    // console.log(sportStat)
    return (
        <section className="container">
            <section className="row g-8">
                <section className="col-lg-4">
                    <section className="text-center mt-2">
                        <img src={CurrentUserInfo.get_photo_url} class="d-flex justify-content-center align-items-center rounded-circle mx-auto" width="250" height="250" alt="..." />
                        <h4>{CurrentUserInfo.last_name} {CurrentUserInfo.first_name}</h4>
                        <p className="badge rounded-pill text-bg-primary">{CurrentUserInfo.sport}</p>
                    </section>

                    <section className="table-responsive mt-4">
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

                <section className="col-lg-4 px-2">
                    <h2 className="text-center mb-4">Upcoming Events</h2>
                    {Object.keys(EventList).length === 0
                        ?
                        <h6>No Upcoming Events</h6>
                        :
                        <>
                            {EventList.slice(0, 2).map(item =>
                                <section className="mb-5"><EventCard key={item.id} title={item.title} body={item.safe_body_html} image={item.get_image_url} date={item.event_date} /></section>
                            )}
                        </>
                    }
                </section>

                <section className="col-lg-4">
                    <h2 className="text-center">Sports Stat</h2>
                    <section class="table-responsive mt-5">
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
                                            <span className="btn btn-primary btn-sm me-2">Edit</span>
                                            <span className="btn btn-danger btn-sm">Delete</span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <section className="d-grid gap-2 col-6 mx-auto mb-4">
                            <button className="d-grid btn btn-primary" onClick={handleAddShow}>Add Event</button>
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
                            <div class="col-12 mt-3">
                                <button type="submit" class="btn btn-primary form-control">Add</button>
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
            <Modal
                show={showAddSuccess}
                onHide={handleAddSuccessClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Event successfully added</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="btn btn-outline-primary" onClick={handleAddSuccessClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default DashboardHome;