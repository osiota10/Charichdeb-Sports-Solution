import { Outlet, NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CompanyInformationContext, UserInfoContext } from "../../App";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";


const pic = {
    url: "https://cdn.pixabay.com/photo/2021/05/20/11/58/beauty-6268460_1280.jpg",
}

function DashboardSideBar({ logout, isAuthenticated }) {
    const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    };

    const navigate = useNavigate();
    setTimeout(() => {
        if (!isAuthenticated) {
            logout_user()
            return navigate('/login')
        }
    }, 3600)

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
    return (
        <section>
            <>
                <nav className={'navbar fixed-top navbar-expand-lg bg-primary'} >
                    <div class="container-fluid">
                        <section className="hstack">
                            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                <i className="fa-solid fa-bars text-white fs-3"></i>
                                {/* <span className="navbar-toggler-icon"></span> */}
                            </button>

                        </section>



                        <div className="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title text-secondary" id="offcanvasNavbarLabel">Charichdeb Sports Solution</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body ">
                                <div className="navbar-nav justify-content-center flex-grow-1 pe-3" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item me-3">
                                            <NavLink to="/dashboard" end className='nav-link' aria-current="page">Dashboard</NavLink>
                                        </li>

                                        <li className="nav-item me-3">
                                            <NavLink to="/dashboard/edit-profile" className='nav-link' aria-current="page">Edit Profile</NavLink>
                                        </li>
                                    </ul>
                                </div>

                                <span className="d-lg-none .d-xl-block">
                                    <Link className='btn btn-outline-secondary text-decoration-none me-1' to="#" onClick={logout_user}>Logout</Link>
                                </span>
                            </div>
                        </div>
                        <div class="btn-group" >
                            <section class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                                <span className="text-white me-1">Welcome {CurrentUserInfo.last_name}!</span>
                                <a   ><img src={pic.url} class="rounded-circle mx-auto" width="50" height="50" alt="..." /></a>
                            </section>

                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-start" aria-labelledby="dropdownMenuButton2">
                                <li><Link class="dropdown-item" to="/dashboard/edit-profile">Edit Profile</Link></li>
                                <li><a class="dropdown-item" href="#" onClick={logout_user}>Sign Out</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
            <section className="mt-12" >
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