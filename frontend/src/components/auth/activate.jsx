import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../actions/auth';
import { myStyle } from './login';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CompanyInformationContext } from "../../App";
import LoaderIcon from '../dashboard/components/loader';

const Activate = ({ verify, error, status }) => {
    const [loading, setLoading] = useState(false);
    const companyInfo = useContext(CompanyInformationContext)
    const [verified, setVerified] = useState(false);

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { uid } = useParams();
    const { token } = useParams();
    const navigate = useNavigate()

    const verify_account = e => {
        setLoading(true);
        // const uid = match.params.uid;
        // const token = match.params.token;
        async function verifyHandler() {
            try {
                await verify(uid, token);
                setVerified(true);
                // handle successful login
            } catch (error) {
                // handle login error
            } finally {
                setLoading(false);
            }
        }

        verifyHandler()
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
    console.log(error)
    return (
        <section style={myStyle}>
            <section className="container py-6 reg-forms min-vh-100">
                <section className="row">
                    <Link to="/" className="text-decoration-none">
                        <header className="text-center mb-5">
                            <img src={companyInfo.get_logo_url} alt="" width="80" height="80" className="mx-auto" />
                            <h4 className="text-white">Charichdeb Sports Solution</h4>
                        </header>
                    </Link>

                    <section className="col-lg-5 mx-auto">
                        <div className="card px-6 py-6 mx-auto bg-light">

                            <h4 className="text-center">Verify your Account</h4>
                            {
                                error
                                    ?

                                    <div class="alert alert-danger mt-2" role="alert">
                                        {error.token} {error.detail} <br /><Link className="text-decoration-none fw-bold" to="/login">Back to Login</Link>
                                    </div>
                                    :
                                    null
                            }

                            <section className='d-grid'>
                                <button
                                    onClick={verify_account}
                                    type='button'
                                    className={loading ? 'btn btn-primary mt-2 disabled' : 'btn btn-primary mt-2'}
                                >
                                    {loading
                                        ?
                                        <LoaderIcon />
                                        :
                                        null
                                    }
                                    Click here to Verify
                                </button>
                            </section>
                        </div>
                    </section>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Account Activated</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Your Account has been successfully activated
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="btn btn-outline-primary" onClick={handleClose}>
                                Close
                            </Button>
                            <Link className="btn btn-primary" to="/login">Login</Link>
                        </Modal.Footer>
                    </Modal>
                </section>
            </section >
        </section>
    );
};

const mapStateToProps = state => ({
    error: state.auth.error,
    status: state.auth.status,
});

export default connect(mapStateToProps, { verify })(Activate);