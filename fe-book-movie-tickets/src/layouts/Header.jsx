
import '../main.scss'
import { UserOutlined  } from '@ant-design/icons';
function Header() {
    const handleLogin = () => {
        // Xử lý hành động khi người dùng nhấp vào nút đăng nhập
        console.log('Đăng nhập clicked');
    }
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
                <div className="header__login">
                    <button onClick={handleLogin}><UserOutlined /> Đăng nhập</button>
                    
                </div>
            </header>


        </>


    )

}

export default Header;