import {useState} from "react";


function ForgotPassword() {
    const [forgotPasswordForm, setForgotPasswordForm] = useState({
        email: '',
        code: '',
    });
    const [sendEmail, setSendEmail] = useState(false);
    const [error, setError] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', forgotPasswordForm);
    };

    const giveCode = () => {
        // Simulate sending code to email (setSendEmail to true in real scenario)
        setSendEmail(true);
    };

    const returnLogin = () => {
        // Redirect or handle returning to login page
        console.log('Returning to login');
    };

    const clearError = () => {
        setError(false);
    };

    /*    const returnLogin = () => {
            // Redirect or handle returning to login page
            console.log('Returning to login');
        };*/



    return (
        <section className="py-3 py-md-5 py-xl-8">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="mb-5">
                            <h2 className="display-5 fw-bold text-center">Send Code</h2>
                            <p className="text-center m-0">Typing your new password.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 ">
                        <div className="row gy-5 justify-content-center">
                            <div className="col-12">
                                <form onSubmit={onSubmit}>
                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="email"
                                                className="form-control border-0 border-bottom rounded-0"
                                                id="email"
                                                placeholder="name@example.com"
                                                required
                                                value={forgotPasswordForm.email}
                                                onChange={(e) =>
                                                    setForgotPasswordForm({
                                                        ...forgotPasswordForm,
                                                        email: e.target.value,
                                                    })
                                                }
                                                onFocus={clearError}
                                            />
                                            <label htmlFor="email" className="form-label">
                                                Email
                                            </label>
                                        </div>
                                    </div>
                                    {sendEmail && (
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control border-0 border-bottom rounded-0"
                                                    id="code"
                                                    placeholder="code"
                                                    required
                                                    value={forgotPasswordForm.code}
                                                    onChange={(e) =>
                                                        setForgotPasswordForm({
                                                            ...forgotPasswordForm,
                                                            code: e.target.value,
                                                        })
                                                    }
                                                    onFocus={clearError}
                                                />
                                                <label htmlFor="code" className="form-label">
                                                    Code
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                    <div className="col-12">
                                        {error && (
                                            <div className="text-danger">Wrong email or Code</div>
                                        )}
                                        {!sendEmail && (
                                            <div className="d-grid">
                                                <button
                                                    type="button"
                                                    className="btn btn-lg btn-dark rounded-0 fs-6"
                                                    onClick={giveCode}
                                                >
                                                    Send CODE
                                                </button>
                                            </div>
                                        )}
                                        {sendEmail && (
                                            <div className="text-success">
                                                Code sent to email successfully!
                                            </div>
                                        )}
                                        {sendEmail && (
                                            <div className="d-grid">
                                                <button
                                                    type="submit"
                                                    className="btn btn-lg btn-dark rounded-0 fs-6"
                                                >
                                                    Change password
                                                </button>
                                            </div>
                                        )}
                                        <div className="d-grid">
                                            <button
                                                type="button"
                                                className="btn btn-lg btn-light rounded-0 fs-6 mt-3"
                                                onClick={returnLogin}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-12  d-flex align-items-center">
                                <div className="col-12 col-lg-2 d-flex align-items-center justify-content-center gap-3 flex-lg-column">

                                    <div>or</div>

                                </div>
                                <div className="d-flex gap-3 flex-column w-100 ">
                                    <a href="#!" className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google text-danger" viewBox="0 0 16 16">
                                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                                        </svg>
                                        <span className="ms-2 fs-6 flex-grow-1">Continue with Google</span>
                                    </a>
                                    <a href="#!" className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-apple text-dark" viewBox="0 0 16 16">
                                            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
                                        </svg>
                                        <span className="ms-2 fs-6 flex-grow-1">Continue with Apple</span>
                                    </a>
                                    <a href="#!" className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook text-primary" viewBox="0 0 16 16">
                                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                        </svg>
                                        <span className="ms-2 fs-6 flex-grow-1">Continue with Facebook</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword;
