import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css';
import { Nav } from "react-bootstrap"; // Import custom CSS file

const Sidebar = () => {
    return (
        <div className="col-2 p-0 d-flex flex-column" style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Left Sidebar/Menu */}
            <Nav className="flex-column p-3 shadow-sm rounded-3 h-100">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) => `nav-link text-dark mb-2 d-flex align-items-center p-2 rounded transition-shadow ${isActive ? 'active text-white' : ''}`}
                >
                    <i className="bi bi-speedometer2 me-2 fs-4"></i>
                    <span className="fs-5">Dashboard</span>
                </NavLink>
                <NavLink
                    to="/admin/movie-management"
                    className={({ isActive }) => `nav-link text-dark mb-2 d-flex align-items-center p-2 rounded transition-shadow ${isActive ? 'active text-white' : ''}`}
                >
                    <i className="bi bi-film me-2 fs-4"></i>
                    <span className="fs-5">Movie</span>
                </NavLink>
                <NavLink
                    to="/admin/movie-types"
                    className={({ isActive }) => `nav-link text-dark mb-2 d-flex align-items-center p-2 rounded transition-shadow ${isActive ? 'active text-white' : ''}`}
                >
                    <i className="bi bi-tag me-2 fs-4"></i>
                    <span className="fs-5">Movie Type</span>
                </NavLink>
                <NavLink
                    to="/admin/ticket-management"
                    className={({ isActive }) => `nav-link text-dark mb-2 d-flex align-items-center p-2 rounded transition-shadow ${isActive ? 'active text-white' : ''}`}
                >
                    <i className="bi bi-ticket me-2 fs-4"></i>
                    <span className="fs-5">Ticket</span>
                </NavLink>
                <NavLink
                    to="/admin/accounts"
                    className={({ isActive }) => `nav-link text-dark mb-2 d-flex align-items-center p-2 rounded transition-shadow ${isActive ? 'active text-white' : ''}`}
                >
                    <i className="bi bi-people me-2 fs-4"></i>
                    <span className="fs-5">Account Management</span>
                </NavLink>
                <NavLink
                    to="/admin/rooms"
                    className={({ isActive }) => `nav-link text-dark mb-2 d-flex align-items-center p-2 rounded transition-shadow ${isActive ? 'active text-white' : ''}`}
                >
                    <i className="bi bi-door-open me-2 fs-4"></i>
                    <span className="fs-5">Room Management</span>
                </NavLink>
                <NavLink
                    to="/admin/seats"
                    className={({ isActive }) => `nav-link text-dark mb-2 d-flex align-items-center p-2 rounded transition-shadow ${isActive ? 'active text-white' : ''}`}
                >
                    <i className="bi bi-grid-1x2 me-2 fs-4"></i> {/* Replace with an appropriate icon */}
                    <span className="fs-5">Seat Management</span>
                </NavLink>
                <NavLink
                    to="/admin/seat-types"
                    className={({ isActive }) => `nav-link text-dark mb-2 d-flex align-items-center p-2 rounded transition-shadow ${isActive ? 'active text-white' : ''}`}
                >
                    <i className="bi bi-layout-sidebar me-2 fs-4"></i>
                    <span className="fs-5">Seat Type Management</span>
                </NavLink>
            </Nav>
        </div>
    );
};

export default Sidebar;
