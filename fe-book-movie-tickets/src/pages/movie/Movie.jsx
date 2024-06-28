import  { useState } from 'react';
import Table from 'react-bootstrap/Table';
import {Button, Modal, Card, Dropdown} from 'react-bootstrap';

function Movie() {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [search, setSearch] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sortByType, setSortByType] = useState('Mặc định'); // Initial sort type

    // Mock data, replace with your actual employee data
    const employees = [
        { id: 1, fullName: 'John Doe', username: 'johndoe', address: '123 Main St', age: 30 },
        { id: 2, fullName: 'Jane Smith', username: 'janesmith', address: '456 Elm St', age: 25 }
    ];

    const openModalWithData = (emp) => {
        setSelectedEmployee(emp);
        setShowDetailModal(true);
    };

    const openEditModal = (emp) => {
        setSelectedEmployee(emp);
        setShowEditModal(true);
    };

    const deleteById = (id) => {
        // Implement delete logic here
        console.log(`Deleting employee with ID ${id}`);
        // Close delete modal after deletion
        setShowDeleteModal(false);
    };

    const getPageNumbers = () => {
        // Mock logic for pagination, replace with actual logic
        return [1, 2, 3]; // Example: 3 pages
    };

    const prevPage = () => {
        // Implement previous page logic
        console.log('Previous page');
    };

    const nextPage = () => {
        // Implement next page logic
        console.log('Next page');
    };

    const gotoPage = (pageNum) => {
        // Implement go to page logic
        console.log(`Go to page ${pageNum}`);
    };

    const searchBy = () => {
        // Implement search logic
        console.log(`Searching for ${search}`);
    };

    const sortTableBy = (type, field, order) => {
        // Implement sorting logic
        console.log(`Sorting by ${type}`);
        setSortByType(type);
    };

    return (
        <div className="container mt-5">
            <Card className="col-10 mx-auto">
                <Card.Body>
                    <Card.Title className="text-center fs-1 mb-4">Movie List</Card.Title>
                    <div className="container">
                        <div className="row my-4 ">
                            <div className="col-6 p-0">
                                {/* Sort button */}
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Sort By
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="col-6 p-0">
                                {/* Search Bar */}
                                <div className="input-group">
                                    <input type="search" className="form-control " placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={search} onChange={(e) => setSearch(e.target.value)} />
                                    <Button onClick={searchBy} className="btn btn-sm btn-primary">Search</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Employee Table */}
                    <Table striped bordered hover className="mt-4">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>User name</th>
                            <th>Address</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map(emp => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.fullName}</td>
                                <td>{emp.username}</td>
                                <td>{emp.address}</td>
                                <td>{emp.age}</td>
                                <td>
                                    <Button onClick={() => openModalWithData(emp)} variant="light">View</Button>
                                    <Button onClick={() => openEditModal(emp)} variant="primary" style={{ marginLeft: '10px' }}>Edit</Button>
                                    <Button onClick={() => setSelectedEmployee(emp) && setShowDeleteModal(true)} variant="danger" style={{ marginLeft: '10px' }}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    {/* Pagination */}
                    <nav aria-label="BSB Pagination 1 Example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item"><a className="page-link" onClick={prevPage}>Previous</a></li>
                            {getPageNumbers().map((i) => (
                                <li key={i} className={`page-item ${i === 1 ? 'active' : ''}`}><a className="page-link" onClick={() => gotoPage(i)}>{i}</a></li>
                            ))}
                            <li className="page-item"><a className="page-link" onClick={nextPage}>Next</a></li>
                        </ul>
                    </nav>
                </Card.Body>
            </Card>
            {/* Modals */}
            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit An Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
            </Modal>

            {/* Detail Modal */}
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Employee: {selectedEmployee?.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailModal(false)}>Close</Button>
                    <Button variant="primary" onClick={() => { setShowEditModal(true); setShowDetailModal(false); }}>Update</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete An Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to delete the employee: {selectedEmployee?.fullName}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Close</Button>
                    <Button variant="danger" onClick={() => { deleteById(selectedEmployee?.id); setShowDeleteModal(false); }}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Movie;
