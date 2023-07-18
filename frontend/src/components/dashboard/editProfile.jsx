import { useContext, useState } from "react";
import { UserInfoContext } from "../../App";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function EditProfile() {
    const CurrentUserInfo = useContext(UserInfoContext)

    const [loading, setLoading] = useState(false);

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        first_name: CurrentUserInfo.first_name,
        last_name: CurrentUserInfo.last_name,
        phone_number: CurrentUserInfo.phone_number,
        date_of_birth: CurrentUserInfo.date_of_birth,
        height: CurrentUserInfo.height,
        weight: CurrentUserInfo.weight,
        gender: CurrentUserInfo.gender,
        sport: CurrentUserInfo.sport,
        home_address: CurrentUserInfo.home_address,
        local_govt: CurrentUserInfo.local_govt,
        state_of_origin: CurrentUserInfo.state_of_origin,
        nationality: CurrentUserInfo.nationality,
        image: CurrentUserInfo.image,
        get_photo_url: CurrentUserInfo.get_photo_url
    });

    const { first_name, last_name, phone_number, date_of_birth, height, weight, gender, sport, home_address, local_govt, state_of_origin, nationality } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Update Profile Pic
    const [profilePicFile, setProfilePicFile] = useState([]);

    // Update Profile Pic input
    const onProfilePicChange = e => setProfilePicFile(e.target.files[0]);

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true)

        // declare the data Submit function
        const submitData = async () => {
            if (localStorage.getItem('access')) {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };

                const formData = new FormData();
                formData.append('first_name', first_name);
                formData.append('last_name', last_name);
                formData.append('phone_number', phone_number);
                formData.append('date_of_birth', date_of_birth);
                formData.append('height', height);
                formData.append('weight', weight);
                formData.append('gender', gender);
                formData.append('sport', sport);
                formData.append('home_address', home_address);
                formData.append('local_govt', local_govt);
                formData.append('state_of_origin', state_of_origin);
                formData.append('nationality', nationality);
                formData.append('image', profilePicFile);

                try {
                    const res = await axios.put(`${process.env.REACT_APP_API_URL}/auth/users/me/`, formData, config);
                    if (res.status === 200) {
                        handleShow()
                        setLoading(false)
                    }
                } catch (err) {
                    console.error("User not authenticated");
                    setLoading(false)
                }
            } else {
                console.error("User not authenticated");
                setLoading(false)
            }
        }

        submitData()
    };

    return (
        <div class="container mt-3 pb-5">
            <h2 class="text-center">Edit Profile</h2>
            <div>
                <form class="row" onSubmit={e => onSubmit(e)}>
                    <div class="col-lg-9 mx-auto">
                        <section className="row g-3">
                            <section className="col-12 mt-5">
                                <h5 className="text-center">Profile Picture</h5>
                            </section>
                            <section>
                                <img src={CurrentUserInfo.get_photo_url} class="d-flex justify-content-center align-items-center rounded-circle mx-auto" width="200" height="200" alt="..." />

                            </section>
                            <div class="col-12 input-group mb-3">
                                <input
                                    type="file"
                                    class="form-control"
                                    id="inputGroupFile02"
                                    name="image"
                                    onChange={e => onProfilePicChange(e)}
                                />
                                <label class="input-group-text" for="inputGroupFile02">Upload</label>
                            </div>
                            <section className="col-12 mt-5">
                                <h5 className="text-center">Personal Information</h5>
                            </section>
                            <div class="col-md-6">
                                <label for="first_name" class="form-label">First Name</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="first_name"
                                    name="first_name"
                                    value={first_name}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="last_name" class="form-label">Last Name</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="last_name"
                                    name="last_name"
                                    value={last_name}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="phone_number" class="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="phone_number"
                                    aria-describedby="emailHelp"
                                    name="phone_number"
                                    value={phone_number}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="gender" class="form-label">Gender</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="gender"
                                    name="gender"
                                    value={gender}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="date_of_birth" class="form-label">Date of Birth <small className="text-primary fw-bold">(YYYY-MM-DD)</small></label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="date_of_birth"
                                    name="date_of_birth"
                                    value={date_of_birth}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="sport" class="form-label">Sport</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="sport"
                                    name="sport"
                                    value={sport}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="height" class="form-label">Height(m)</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="height"
                                    name="height"
                                    value={height}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="weight" class="form-label">Weight(kg)</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="weight"
                                    name="weight"
                                    value={weight}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <section className="col-12 mt-5">
                                <h5 className="text-center">Contact Address</h5>
                            </section>
                            <div class="col-12">
                                <label for="home_address" class="form-label">Home Address</label>
                                <textarea
                                    class="form-control"
                                    id="home_address"
                                    rows="4"
                                    onChange={e => onChange(e)}
                                    name="home_address"
                                    value={home_address}
                                    required
                                ></textarea>
                            </div>
                            <div class="col-md-6">
                                <label for="local_govt" class="form-label">Local Government</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="local_govt"
                                    name="local_govt"
                                    value={local_govt}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="state_of_origin" class="form-label">State of Origin</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="state_of_origin"
                                    name="state_of_origin"
                                    value={state_of_origin}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="nationality" class="form-label">Nationality</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="nationality"
                                    name="nationality"
                                    value={nationality}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                        </section>

                        <div className="d-grid mt-5">
                            <button type="submit"
                                className={loading ? 'btn btn-primary disabled' : 'btn btn-primary'}>

                                {loading
                                    ?
                                    <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                    :
                                    null
                                }
                                Update Profile
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Profile Updated</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You have successfully updated your Profile
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-outline-primary" onClick={handleClose}>
                        Close
                    </Button>
                    <Link className="btn btn-primary" to="/dashboard">Dashboard</Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditProfile;