
function ResetPassword() {

    return (
        <>
            <div className="wrapper">
                <div className="text-center text-success fs-1 brand d-flex flex-column mt-3">
                    <i className="fa-solid fa-shield-cat me-2"></i>Cinema Star
                </div>
                <div className="p-3 mt-3">
                    <p className="text-dark">Nhập vào email để lấy lại mật khẩu</p>
                    <div className="form-field d-flex align-items-center">
                        <i className="ms-2 fa-solid fa-envelope"></i>
                        <input type="email" name="email" id="email" placeholder="Nhập vào email" />
                    </div>
                    <button id="btn-send-email" type="button" className="btn text-light mt-3">Gửi</button>
                </div>
            </div>
            <div id="toast-container"></div>
        </>
    )
}

export default ResetPassword;