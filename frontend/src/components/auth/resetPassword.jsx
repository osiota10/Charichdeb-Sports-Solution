import { reset_password } from "../../actions/auth";
import { useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

function ResetPassword({ reset_password, error }) {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (error !== "User with given email does not exist") {
            reset_password(email);
            setRequestSent(true)
        }
    };


    return (
        <section className="container py-6 reg-forms">
            <section className="row">
                <Link to="/" className="text-decoration-none">
                    <header className="text-center mb-5">
                        <img src="..." alt="" width="80" height="80" class="mx-auto" />
                        <h4>Charichdeb Sports Solution</h4>
                    </header>
                </Link>

                <section className="col-lg-5 mx-auto">
                    <div className="card px-6 py-6 mx-auto bg-light">

                        <h4 className="text-center">Reset Password</h4>
                        {
                            requestSent
                                ?
                                <div className="alert alert-primary mt-2" role="alert">
                                    Instructions to reset your password has be sent to your <span className="fw-bold"> email</span>
                                </div>
                                :
                                null
                        }

                        <form className="mt-3" onSubmit={e => onSubmit(e)}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control inputfield"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    placeholder="johnsmith@example.com"
                                    value={email}
                                    onChange={e => onChange(e)}
                                    required
                                />
                                {error ?
                                    <small className="text-danger fw-bold">
                                        {error}
                                    </small>
                                    :
                                    null}
                            </div>
                            <button type="submit" class="btn btn-primary form-control">Reset Password</button>
                        </form>
                    </div>
                </section>
            </section>
        </section>
    );
}

const mapStateToProps = state => ({
    error: state.auth.error
});

export default connect(mapStateToProps, { reset_password })(ResetPassword);