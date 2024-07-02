import {useState} from "react";
import './ChangePassword.scss';
import {Button} from "react-bootstrap";

function ChangePassword() {
    const [passwordForm, setPasswordForm] = useState({
        password: '',
        rePassword: '',
    });
    const [error, setError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (passwordForm.password !== passwordForm.rePassword) {
            setError('Passwords do not match');
            return;
        }
        // Handle form submission logic here
        console.log('Form submitted:', passwordForm);
        // Clear form fields
        setPasswordForm({
            password: '',
            rePassword: '',
        });
    };

    const clearError = () => {
        setError('');
    };

    const returnLogin = () => {
        // Redirect or handle returning to login page
        console.log('Returning to login');
    };

    return (
        <section className="py-3 py-md-5 py-xl-8">
            <div className="container">
                <div className="row">
                    <div className="col-12 ">
                        <div className="mb-5">
                            <h2 className="display-5 fw-bold text-center">Change Password</h2>
                            <p className="text-center m-0">Typing your new password.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12  col-lg-10 col-xl-8">
                        <div className="row gy-5 justify-content-center">
                            <div className="col-12 col-lg-5">
                                <form onSubmit={onSubmit}>
                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="password"
                                                className="form-control border-0 border-bottom rounded-0"
                                                name="oldPassword"
                                                id="oldPassword"
                                                value={passwordForm.password}
                                                placeholder="Old Password"
                                                required
                                                onChange={(e) =>
                                                    setPasswordForm({
                                                        ...passwordForm,
                                                        password: e.target.value,
                                                    })
                                                }
                                                onFocus={clearError}
                                            />
                                            <label htmlFor="password" className="form-label">Old Password</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="password"
                                                className="form-control border-0 border-bottom rounded-0"
                                                name="newPassword"
                                                id="newPassword"
                                                value={passwordForm.password}
                                                placeholder="New Password"
                                                required
                                                onChange={(e) =>
                                                    setPasswordForm({
                                                        ...passwordForm,
                                                        password: e.target.value,
                                                    })
                                                }
                                                onFocus={clearError}
                                            />
                                            <label htmlFor="password" className="form-label">New Password</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="password"
                                                className="form-control border-0 border-bottom rounded-0"
                                                name="rePassword"
                                                id="rePassword"
                                                value={passwordForm.rePassword}
                                                placeholder="Re-Password"
                                                required
                                                onChange={(e) =>
                                                    setPasswordForm({
                                                        ...passwordForm,
                                                        rePassword: e.target.value,
                                                    })
                                                }
                                                onFocus={clearError}
                                            />
                                            <label htmlFor="rePassword" className="form-label">Re-Password</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        {error && <div className="text-danger">{error}</div>}
                                        <div className="d-grid">
                                            <Button type="submit" className="btn btn-lg btn-dark rounded-0 fs-6">Change Password</Button>
                                        </div>
                                        <div className="d-grid">
                                            <Button  onClick={returnLogin} className="btn btn-lg btn-light rounded-0 fs-6 mt-3">Cancel</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default ChangePassword;
