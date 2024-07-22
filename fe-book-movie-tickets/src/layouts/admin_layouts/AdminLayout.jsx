import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-3">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
