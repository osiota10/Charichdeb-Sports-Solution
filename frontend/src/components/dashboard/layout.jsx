import DashboardSideBar from "./navBar";
import DashboardFooter from "./footer";
import useAuth from "./components/authCheck";
import { useState, useLayoutEffect, createContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import axios from "axios";

export const UserInfoContext = createContext(null);

// declare the data fetching function
export const fetchData = async () => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        };

        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/users/me/`,
                config
            );
            return res.data;
        } catch (err) {
            console.error("User not authenticated");
            return [];
        }
    } else {
        console.error("User not authenticated");
        return [];
    }
};

const DashboardLayout = () => {
    const [userInfo, setUserInfo] = useState([]);
    const authenticated = useAuth();

    useLayoutEffect(() => {
        //User Info
        fetchData().then((data) => setUserInfo(data));
    }, []);

    return (
        <section>
            <UserInfoContext.Provider value={userInfo}>
                <DashboardSideBar />

                <DashboardFooter />
            </UserInfoContext.Provider>

            <Modal show={!authenticated} backdrop="static" keyboard={false}>
                <Modal.Body className="text-center fs-5">
                    Login session has expired
                    <section className="d-flex justify-content-center mt-2">
                        <Link className="btn btn-primary" to="/login">
                            Login
                        </Link>
                    </section>
                </Modal.Body>
            </Modal>
        </section>
    );
};

export default DashboardLayout;
