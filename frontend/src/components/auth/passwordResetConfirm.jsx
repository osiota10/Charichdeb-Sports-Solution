import { useState } from "react";
import { reset_password_confirm } from "../../actions/auth";
import { connect } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom";

function ResetPasswordConfirm({ match, reset_password_confirm, error }) {
    const [requestSent, setRequestSent] = useState(false);
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

        reset_password_confirm(uid, token, new_password, re_new_password);

        if (error === null) {
            setRequestSent(true);
        }
    };

    setTimeout(() => {
        if (requestSent) {
            return navigate('/login')
        }
    }, 3000)

    // console.log(error)

    return (
        <section class="container py-6 reg-forms">
            <section class="row">
                <Link to="/" className="text-decoration-none">
                    <header className="text-center mb-5">
                        <img src="..." alt="" width="80" height="80" class="mx-auto" />
                        <h4>Charichdeb Sports Solution</h4>
                    </header>
                </Link>

                <section class="col-lg-5 mx-auto">
                    <div class="card px-6 py-6 mx-auto bg-light">
                        <form onSubmit={e => onSubmit(e)} class="mt-3">
                            <h5 class="text-center">Enter New Password</h5>
                            {
                                requestSent
                                    ?
                                    <div class="alert alert-primary mt-2" role="alert">
                                        You have successfully reset your password
                                    </div>
                                    :
                                    null
                            }
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
                            <button type="submit" class="btn btn-primary form-control">Create New Password</button>
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
export default connect(mapStateToProps, { reset_password_confirm })(ResetPasswordConfirm);