import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => setSidebarVisible(prev => !prev);

    return (
        <div className="d-flex flex-column" style={{ height: '100vh' }}>
            <Header onToggleSidebar={toggleSidebar} />
            <div className="d-flex flex-grow-1">
                {sidebarVisible && <Sidebar />}
                <div className="flex-grow-1 p-3">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
