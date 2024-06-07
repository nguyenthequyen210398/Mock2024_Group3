// import LoginButton from '../../components/LoginButton';
import './auth.scss';

function LogIn() {
  return (
    <>
      <div className="wrapper">
        <div className="text-center text-success fs-1 brand d-flex flex-column">
          <i className="fa-solid fa-shield-cat me-2"></i>Cinema Star
        </div>
        <div className="p-3 mt-3">
          <div className="form-field d-flex align-items-center">
            <i className="ms-2 fa-solid fa-user"></i>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Tài khoản"
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <i className="ms-2 fa-solid fa-lock"></i>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Mật khẩu"
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember-me"
              checked
            />
            <label className="form-check-label" for="remember-me">
              Ghi nhớ
            </label>
          </div>

          <button
            id="btn-login"
            type="button"
            className="btn text-light mt-4"
            href="/"
          >
            Đăng nhập
          </button>
        </div>

        <div className="text-center fs-6 mt-5">
          <button className="fs-6" to={'/reset-password'}>
            Quên mật khẩu?
          </button>{' '}
          or{' '}
          <button className="fs-6" to={'/register'}>
            Đăng ký
          </button>
        </div>
      </div>

      <div id="toast-container"></div>
    </>
  );
}

export default LogIn;
