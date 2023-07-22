import { Outlet, Link, NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CompanyInformationContext } from "../../App";
import Offcanvas from 'react-bootstrap/Offcanvas';


function NavBar() {
    const companyInfo = useContext(CompanyInformationContext)
    const [fix, seFix] = useState(false)

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
        <>
            <nav className={fix ? 'navbar fixed-top navbar-expand-lg scroll-navbar' : 'navbar fixed-top navbar-expand-lg'} >
                <div class="container-fluid">

                    <Link to="/" className='navbar-brand d-flex align-items-center'>
                        <img src={companyInfo.get_logo_url} alt="Logo" width="50" height="50" className="d-inline-block align-text-top me-1" />
                        <h6 className="text-white">Charichdeb <br />Sports Solution</h6>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" onClick={handleOffcanvasShow}>
                        <i className="fa-solid fa-bars text-white fs-3"></i>
                        {/* <span className="navbar-toggler-icon"></span> */}
                    </button>

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

                        <Offcanvas.Body >
                            <div className="navbar-nav justify-content-center flex-grow-1 pe-3" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                        <NavLink to="/" className='nav-link' aria-current="page">Home</NavLink>
                                    </li>

                                    <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                        <NavLink to="/about" className='nav-link' aria-current="page">About</NavLink>
                                    </li>
                                    <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                        <NavLink to="/services" className='nav-link'>Services</NavLink>
                                    </li>
                                    <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                        <NavLink to="/athletes" className='nav-link'>Athletes</NavLink>
                                    </li>
                                    <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                        <NavLink to="/testimonials" className='nav-link'>Testimonials</NavLink>
                                    </li>
                                    <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                        <NavLink to="/contact" className='nav-link'>Contact</NavLink>
                                    </li>
                                </ul>
                                <span className="vstack d-lg-none .d-xl-block mt-3">
                                    <Link className='btn btn-outline-secondary text-decoration-none mb-3' to="/login" onClick={handleOffcanvasClose}>Log In</Link>
                                    <Link className='btn btn-secondary text-decoration-none' to="/signup" onClick={handleOffcanvasClose}>Sign Up</Link>
                                </span>
                            </div>
                            <span className="d-none d-lg-block">
                                <Link className='btn btn-outline-secondary text-decoration-none me-1' to="/login">Log In</Link>
                                <Link className='btn btn-secondary text-decoration-none' to="/signup">Sign Up</Link>
                            </span>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default NavBar;