import { useState, useEffect } from "react";
import { reset_password_confirm } from "../../actions/auth";
import { connect } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from "react";
import { CompanyInformationContext } from "../../App";
import { myStyle } from "./login";
import LoaderIcon from "../dashboard/components/loader";

function ResetPasswordConfirm({ match, reset_password_confirm, error, status }) {
    const companyInfo = useContext(CompanyInformationContext)
    const [loading, setLoading] = useState(false);

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const { uid } = useParams();
    const { token } = useParams();
    const navigate = useNavigate()

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true)

        async function resetPasswordConfirmHandler() {
            try {
                await reset_password_confirm(uid, token, new_password, re_new_password);
                // handle successful reset
            } catch (error) {
                // handle reset error
            } finally {
                setLoading(false);
            }
        }

        resetPasswordConfirmHandler()
    };

    useEffect(() => {
        if (status === 204) {
            handleShow()
        }
    }, [status]);

    setTimeout(() => {
        if (show) {
            return navigate('/login')
        }
    }, 5000)

    // console.log(error)

    return (
        <section style={myStyle}>
            <section class="container py-6 reg-forms min-vh-100">
                <section class="row">
                    <Link to="/" className="text-decoration-none">
                        <header className="text-center mb-5">
                            <img src={companyInfo.get_logo_url} alt="" width="80" height="80" className="mx-auto" />
                            <h4 className="text-white">Charichdeb Sports Solution</h4>
                        </header>
                    </Link>

                    <section class="col-lg-5 mx-auto">
                        <div class="card px-4 py-6 mx-auto bg-light">
                            <form onSubmit={e => onSubmit(e)} class="mt-3">
                                <h5 class="text-center">Enter New Password</h5>
                                {/* {
                                    error
                                        ?

                                        <div class="alert alert-danger mt-2" role="alert">
                                            Password Reset Link has been used <Link className="text-decoration-none fw-bold" to="/login">Back to Login</Link>
                                        </div>
                                        :
                                        null
                                } */}
                                <div class="mb-1">
                                    <label for="password1" class="form-label">New Password</label>
                                    <input
                                        type="password"
                                        class="form-control inputfield"
                                        id="password1"
                                        aria-describedby="emailHelp"
                                        name="new_password"
                                        value={new_password}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    {error ?
                                        <small className="text-danger">
                                            {error.new_password}
                                            {error.non_field_errors}
                                        </small>
                                        :
                                        null}
                                </div>

                                <div class="mb-3">
                                    <label for="password2" class="form-label">Confirm New Password</label>
                                    <input
                                        type="password"
                                        class="form-control inputfield"
                                        id="password2"
                                        aria-describedby="emailHelp"
                                        name="re_new_password"
                                        value={re_new_password}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    {error ?
                                        <small className="text-danger">
                                            {error.new_password}
                                            {error.non_field_errors}
                                        </small>
                                        :
                                        null}
                                </div>

                                <section className="d-grid">
                                    <button
                                        type="submit"
                                        class={loading ? 'btn btn-primary disabled' : 'btn btn-primary'}>

                                        {loading
                                            ?
                                            <LoaderIcon />
                                            :
                                            null
                                        }
                                        Create New Password
                                    </button>
                                </section>
                            </form>
                        </div>
                    </section>
                </section>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Password Reset Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You have successfully set a new password for your Profile.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="btn btn-outline-primary" onClick={handleClose}>
                            Close
                        </Button>
                        <Link className="btn btn-primary" to="/login">Login</Link>
                    </Modal.Footer>
                </Modal>
            </section>
        </section>
    );
}

const mapStateToProps = state => ({
    error: state.auth.error,
    status: state.auth.status,
});
export default connect(mapStateToProps, { reset_password_confirm })(ResetPasswordConfirm);