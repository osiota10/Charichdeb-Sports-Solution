import { Outlet, NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CompanyInformationContext, UserInfoContext } from "../../App";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import Offcanvas from 'react-bootstrap/Offcanvas';


function DashboardSideBar({ logout, isAuthenticated }) {
    const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    };

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navigate = useNavigate();
    // setTimeout(() => {
    //     if (!isAuthenticated) {
    //         logout_user()
    //         return navigate('/login')
    //     }
    // }, 600000)

    const CurrentUserInfo = useContext(UserInfoContext)
    const companyInfo = useContext(CompanyInformationContext)
    const [fix, seFix] = useState(false)

    function handleFixNavBar() {
        if (window.scrollY >= 10) {
            seFix(true)
        } else {
            seFix(false)
        }
    }

    window.addEventListener('scroll', handleFixNavBar)

    // Offcanvas
    const [showOffcanvas, setOffcanvasShow] = useState(false);
    const handleOffcanvasClose = () => setOffcanvasShow(false);
    const handleOffcanvasShow = () => setOffcanvasShow(true);
    return (
        <section>
            <>
                <nav className={'navbar fixed-top navbar-expand-lg bg-primary'} >
                    <div class="container-fluid">
                        <section className="hstack">
                            <button className="navbar-toggler" type="button" aria-controls="offcanvasNavbar" onClick={handleOffcanvasShow}>
                                <i className="fa-solid fa-bars text-white fs-3"></i>
                            </button>
                        </section>

                        <Offcanvas
                            id="offcanvasNavbar"
                            show={showOffcanvas}
                            onHide={handleOffcanvasClose}
                            backdrop="static"
                            responsive="lg"
                            tabIndex="-1"
                            className={screenWidth < 991 ? "text-bg-dark" : null}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title className="text-secondary">{companyInfo.company_name}</Offcanvas.Title>
                            </Offcanvas.Header>

                            <Offcanvas.Body className="d-flex flex-column align-items-around">
                                <div className="navbar-nav flex-grow-1 pe-3" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                            <NavLink to="/dashboard" end className='nav-link' aria-current="page"><i class="fa-solid fa-house-user"></i> Dashboard</NavLink>
                                        </li>

                                        <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                            <NavLink to="/dashboard/testimonials" className='nav-link' aria-current="page"><i className="fa-solid fa-pen-to-square fs-6"></i> Testimonials</NavLink>
                                        </li>

                                        <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                            <NavLink to="/dashboard/edit-profile" className='nav-link' aria-current="page"><i className="fa-solid fa-pen-to-square fs-6"></i> Edit Profile</NavLink>
                                        </li>
                                    </ul>
                                </div>

                                <section className="d-lg-none .d-xl-block">
                                    <Link className='btn btn-outline-secondary text-decoration-none me-1' to="#" onClick={logout_user}>Logout</Link>
                                </section>
                            </Offcanvas.Body>
                        </Offcanvas>

                        <div className="btn-group" >
                            <section className="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                                <span className="text-white me-1">Welcome {CurrentUserInfo.last_name}!</span>
                                <a   ><img src={CurrentUserInfo.get_photo_url} className="rounded-circle mx-auto" width="50" height="50" alt="..." /></a>
                            </section>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-start" aria-labelledby="dropdownMenuButton2">
                                <li><Link class="dropdown-item" to="/dashboard/edit-profile">Edit Profile</Link></li>
                                <li><a class="dropdown-item" href="#" onClick={logout_user}>Sign Out</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
            <section className="pt-12 bg-light min-vh-100" >
                <Outlet />
            </section>
            {redirect ? <Navigate to='/login' /> : null}
        </section>

    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(DashboardSideBar);