import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css';
import {Nav} from "react-bootstrap"; // Import custom CSS file

const Sidebar = () => {
    return (
        <div className="col-2 p-0 d-flex flex-column" style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Left Sidebar/Menu */}
            <Nav className="flex-column p-3 shadow-sm rounded-3 h-100">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `nav-link text-dark mb-2 d-flex align-items-center p-2 rounded transition-shadow ${isActive ? 'active' : ''}`}
                >
                    <i className="bi bi-speedometer2 me-2 fs-4"></i>
                    <span className="fs-5">Dashboard</span>
                </NavLink>
                <NavLink
                    to="/admin/movie-management"
                    className={({ isActive }) => `nav-link text-dark mb-2 d-flex align-items-center p-2 rounded transition-shadow ${isActive ? 'active' : ''}`}
                >
                    <i className="bi bi-film me-2 fs-4"></i>
                    <span className="fs-5">Movie</span>
                </NavLink>
                <NavLink
                    to="/ticket-management"
                    className={({ isActive }) => `nav-link text-dark mb-2 d-flex align-items-center p-2 rounded transition-shadow ${isActive ? 'active' : ''}`}
                >
                    <i className="bi bi-ticket me-2 fs-4"></i>
                    <span className="fs-5">Ticket</span>
                </NavLink>
                {/* Add more menu items as needed */}
            </Nav>
        </div>
    );
};

export default Sidebar;
