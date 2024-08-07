
import { Link } from 'react-router-dom';
import '../main.scss'
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
function Header() {

    return (
        <>
            {/* 
            <div className="header">

                <img src="../../src/assets/logo.jpg" alt="Los Angeles" className="d-block" style={{ width: "100%" }} />

            </div> */}

            <header className="header">
                <div className="header__logo">
                    <img src="../../src/assets/logo.jpg" alt="Logo" />
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Thể loại</button>
                    <div class="dropdown-content">
                        <a href="#">Kinh dị </a>
                        <a href="#">Hành động</a>
                        <a href="#">Hài kịch</a>
                    </div>
                </div>
                <div className="header__search">
                    <input type="text" placeholder="Nhập tên phim..." />
                    <button><SearchOutlined /></button>
                </div>
                <div className="header__login">
                    {/* <button onClick={handleLogin}><UserOutlined /> Đăng nhập</button> */}
                    <Link className="header__login" to={"/login"}> <UserOutlined /> Đăng nhập</Link> or <Link to={"/register"}>Đăng ký</Link>

                </div>
            </header>


        </>


    )

}

export default Header;