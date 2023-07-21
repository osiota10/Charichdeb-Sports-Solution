import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../actions/auth";
import { connect } from 'react-redux';
import { useContext } from "react";
import { CompanyInformationContext } from "../../App";
import LoaderIcon from "../dashboard/components/loader";

const pic = {
    url: 'http://www.highreshdwallpapers.com/wp-content/uploads/2014/01/Athletic-Running-HD-Image.jpg'
}

export const myStyle = {
    backgroundImage: `linear-gradient(0deg, rgba(0, 61, 43, 0.5), rgba(0, 61, 43, 0.5)), url(${pic.url})`,
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundAttachment: 'fixed'

};

function Login({ login, isAuthenticated, error }) {
    const [loading, setLoading] = useState(false);
    const companyInfo = useContext(CompanyInformationContext)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmit = e => {
        e.preventDefault();
        setLoading(true)

        async function loginHandler() {
            try {
                await login(email, password);
                // handle successful login
            } catch (error) {
                // handle login error
            } finally {
                setLoading(false);
            }
        }

        loginHandler()
    };


    if (isAuthenticated) {
        return <Navigate to='/dashboard' replace={true} />
    }

    return (
        <section style={myStyle}>
            <section class="container py-10 reg-forms">
                <div class="row">
                    <Link to="/" className="text-decoration-none">
                        <header className="text-center mb-5">
                            <img src={companyInfo.get_logo_url} alt="" width="80" height="80" className="mx-auto" />
                            <h4 className="text-white">Charichdeb Sports Solution</h4>
                        </header>
                    </Link>

                    <section class="col-xl-5 mx-auto">
                        <section className="card px-4 py-6 mx-auto bg-light" >
                            <h3 className="text-center">Login</h3>
                            {error ?
                                <div className="alert alert-danger fw-bold mt-3" role="alert">
                                    Invalid email/password
                                </div>
                                :
                                null}

                            <form className="mt-1" onSubmit={e => onSubmit(e)}>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" className="form-control inputfield" id="email" aria-describedby="emailHelp"
                                        name="email" value={email} onChange={e => onChange(e)} required />
                                </div>

                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" class="form-control inputfield" id="exampleInputPassword1"
                                        name="password" value={password} onChange={e => onChange(e)}
                                        minLength='6' required />
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                        <label class="form-check-label" for="exampleCheck1"><small class="fw-bold">Remember
                                            Login</small></label>
                                    </div>
                                    <div>
                                        <Link to="/reset-password" class="text-end text-decoration-none fw-bold"><small>Forgot
                                            Password?</small></Link>
                                    </div>
                                </div>

                                <section className="d-grid">
                                    <button type="submit"
                                        className={loading ? 'btn btn-primary disabled' : 'btn btn-primary'}>

                                        {loading
                                            ?
                                            <LoaderIcon />
                                            :
                                            null
                                        }

                                        Login
                                    </button>
                                </section>

                                <div class="mt-3">
                                    <p class="text-center">Don't have an account? <Link to="/signup" class="fw-bold text-decoration-none">Create
                                        Account</Link></p>
                                </div>
                            </form>
                        </section>
                    </section>
                </div>
            </section>
        </section>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
});

export default connect(mapStateToProps, { login })(Login);