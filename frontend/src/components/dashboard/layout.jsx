import DashboardSideBar from "./navBar";
import DashboardFooter from "./footer";
import useAuth from "./components/authCheck";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";


const DashboardLayout = () => {
    const authenticated = useAuth()

    // Show Modal
    const [showModal, setShowModal] = useState(false);
    const handleShowModalClose = () => setShowModal(false);
    const handleShowModalShow = () => setShowModal(true);

    useEffect(() => {
        // If the user is authenticated, show the modal
        if (authenticated) {
            handleShowModalClose();
        } else {
            // If the user is not authenticated, close the modal
            handleShowModalShow();
        }
    }, [authenticated]);

    return (
        <section>
            <DashboardSideBar />

            <DashboardFooter />

            <Modal
                show={showModal}
                onHide={handleShowModalClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body className="text-center fs-5">
                    Login session has expired
                    <section className='d-flex justify-content-center mt-2'>
                        <Link className="btn btn-primary" to="/login" onClick={handleShowModalClose}>Login</Link>
                    </section>
                </Modal.Body>
            </Modal>
        </section>
    )
};

export default DashboardLayout;