import { useContext, useState } from "react";
import { UserInfoContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const CurrentUserInfo = useContext(UserInfoContext)

    const [formData, setFormData] = useState({
        first_name: CurrentUserInfo.first_name,
        last_name: CurrentUserInfo.last_name,
        email: CurrentUserInfo.email,
        phone_number: CurrentUserInfo.phone_number
    });

    const { first_name, last_name, email, phone_number } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const navigate = useNavigate();

    const onSubmit = e => {
        e.preventDefault();

        // declare the data fetching function
        const fetchData = async () => {
            if (localStorage.getItem('access')) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };

                const body = JSON.stringify({ first_name, last_name, email, phone_number });

                try {
                    const res = await axios.put(`${process.env.REACT_APP_API_URL}/auth/users/me/`, body, config);

                } catch (err) {
                    console.error("User not authenticated");
                }
            } else {
                console.error("User not authenticated");
            }
        }

        fetchData()

        setTimeout(() => {
            navigate('/dashboard')
        }, 2000)
    };

    return (
        <div class="mt-3">
            <h2 class="text-center">Edit my Profile</h2>
            <div>
                <form class="row" onSubmit={e => onSubmit(e)}>
                    <div class="col-lg-9 mx-auto">
                        <div class="col-md-12 mb-3">
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
                        <div class="col-md-12 mb-3">
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
                        <div class="col-md-12 mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input
                                type="email"
                                class="form-control inputfield"
                                id="email"
                                aria-describedby="emailHelp"
                                name="email"
                                value={email}
                                disabled
                                required
                            />
                        </div>
                        <div class="col-md-12 mb-3">
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

                        <div class="col-12 mt-3">
                            <button type="submit" class="btn btn-primary form-control">Update Profile</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;