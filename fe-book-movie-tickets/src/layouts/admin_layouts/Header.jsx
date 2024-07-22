import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = ({ onToggleSidebar }) => {
    const [searchVisible, setSearchVisible] = React.useState(false);

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm">
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    {/* Toggle Sidebar Button */}
                    <button className="btn btn-light me-3" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
                        <i className="bi bi-list fs-4"></i>
                    </button>

                    {/* Navbar Links */}
                    <div className="d-flex">
                        <a href="../../index3.html" className="nav-link">Home</a>
                        <a href="quanlymonhoc.html" className="nav-link ms-3">Quản lý môn học</a>
                    </div>
                </div>

                <ul className="navbar-nav ms-auto d-flex align-items-center">
                    {/* Search Button */}
                    <li className="nav-item position-relative me-3">
                        <a className="nav-link" href="#" role="button" onClick={toggleSearch}>
                            <i className="bi bi-search fs-4"></i>
                        </a>
                        {searchVisible && (
                            <div className="position-absolute end-0 p-3 bg-light shadow-sm rounded">
                                <form className="d-flex">
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                    />
                                    <button className="btn btn-outline-primary" type="submit">
                                        <i className="bi bi-search"></i>
                                    </button>
                                    <button className="btn btn-outline-secondary ms-2" type="button" onClick={toggleSearch}>
                                        <i className="bi bi-x"></i>
                                    </button>
                                </form>
                            </div>
                        )}
                    </li>

                    {/* Chat Dropdown Menu */}
                    <li className="nav-item dropdown me-3">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i className="bi bi-chat-dots fs-4"></i>
                            <span className="badge bg-danger">3</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {/* Dropdown Items */}
                        </ul>
                    </li>

                    {/* Notifications Dropdown Menu */}
                    <li className="nav-item dropdown me-3">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i className="bi bi-bell fs-4"></i>
                            <span className="badge bg-warning">15</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {/* Dropdown Items */}
                        </ul>
                    </li>

                    {/* Fullscreen Button */}
                    <li className="nav-item me-3">
                        <a className="nav-link" href="#" role="button">
                            <i className="bi bi-fullscreen fs-4"></i>
                        </a>
                    </li>

                    {/* Control Sidebar Button */}
                    <li className="nav-item">
                        <a className="nav-link" href="#" role="button">
                            <i className="bi bi-grid fs-4"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;