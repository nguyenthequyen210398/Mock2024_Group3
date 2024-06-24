import './auth.scss'
function ChangePassword() {
    return (
        <>
            <div class="wrapper">
                <div class="text-center text-success fs-1 brand d-flex flex-column mt-3">
                    <i class="fa-solid fa-shield-cat me-2"></i>Cinema Star
                </div>
                <div class="p-3 mt-3">
                    <div class="form-field d-flex align-items-center">
                        <i class="ms-2 fa-solid fa-lock"></i>
                        <input type="className" name="className" id="className" placeholder="Mật khẩu mới" />
                    </div>
                    <div class="form-field d-flex align-items-center">
                        <i class="ms-2 fa-solid fa-lock"></i>
                        <input type="className" name="re-className" id="re-className" placeholder="Nhập lại mật khẩu" />
                    </div>
                    <button id="btn-change-className" type="button" class="btn text-light mt-3">Đổi mật khẩu</button>
                </div>
            </div>
            <div id="toast-container"></div>
        </>
    )
}

export default ChangePassword;