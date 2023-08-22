import DashboardSideBar from "./navBar";
import DashboardFooter from "./footer";
import useAuth from "./components/authCheck";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";


const DashboardLayout = () => {
    const authenticated = useAuth()

    return (
        <section>
            <DashboardSideBar />

            <DashboardFooter />

            <Modal
                show={!authenticated}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body className="text-center fs-5">
                    Login session has expired
                    <section className='d-flex justify-content-center mt-2'>
                        <Link className="btn btn-primary" to="/login">Login</Link>
                    </section>
                </Modal.Body>
            </Modal>
        </section>
    )
};

export default DashboardLayout;