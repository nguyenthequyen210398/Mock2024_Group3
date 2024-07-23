import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Table, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';

function RoomManagement() {
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateRoomId, setUpdateRoomId] = useState(null);
    const [updateRoomName, setUpdateRoomName] = useState('');

    useEffect(() => {
        fetchRooms();
    }, [pageNo, pageSize]);

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/rooms', {
                params: {
                    pageNo,
                    pageSize
                }
            });
            setRooms(response.data.content || []);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addRoom = async () => {
        try {
            const newRoom = { number: newRoomName };
            await axios.post('http://localhost:8080/api/v1/rooms', newRoom, {
                headers: { 'Content-Type': 'application/json' }
            });
            setNewRoomName('');
            setToastMessage('Room added successfully!');
            setShowToast(true);
            fetchRooms(); // Refresh the room list
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteRoom = async (id) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/rooms/deleteById/${id}`);
                fetchRooms();
                setToastMessage('Room deleted successfully!');
                setShowToast(true);

                setTimeout(() => {
                    setShowToast(false);
                }, 2000);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const openUpdateModal = (room) => {
        setUpdateRoomId(room.id);
        setUpdateRoomName(room.number);
        setShowUpdateModal(true);
    };

    const updateRoom = async () => {
        try {
            const updatedRoom = { number: updateRoomName };
            await axios.put(`http://localhost:8080/api/v1/rooms/${updateRoomId}`, updatedRoom, {
                headers: { 'Content-Type': 'application/json' }
            });

            setUpdateRoomName('');
            setShowUpdateModal(false);
            setToastMessage('Room updated successfully!');
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
                fetchRooms(); // Refresh the room list
            }, 2000);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="mt-4">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="text-dark text-lg-start">Room Management</h1>
                </div>
            </div>
            <div className="row mt-0">
                <div className="col-md-4 mb-4" >
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title className="text-center">{showUpdateModal ? 'Update Room' : 'Create New Room'}</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId={showUpdateModal ? "updateRoomName" : "newRoomName"}>
                            <Form.Label>Room Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter room name"
                                value={showUpdateModal ? updateRoomName : newRoomName}
                                onChange={(e) => showUpdateModal ? setUpdateRoomName(e.target.value) : setNewRoomName(e.target.value)}
                            />
                        </Form.Group>
                        {showUpdateModal ? (
                            <>
                                <Button variant="primary" onClick={updateRoom}>
                                    Update Room
                                </Button>
                                <Button variant="secondary" onClick={() => setShowUpdateModal(false)} className="ms-2">
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button variant="primary" onClick={addRoom}>
                                Add Room
                            </Button>
                        )}
                    </Form>
                </Card.Body>
            </Card>
                </div>
            <div className="col-md-8 mb-4" >

            <Card>
                <Card.Body>
                    <Card.Title className="text-center">Room List</Card.Title>
                    <Table bordered hover className="mt-4">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rooms.length > 0 ? (
                            rooms.map((room) => (
                                <tr key={room.id}>
                                    <td>{room.id}</td>
                                    <td>{room.number}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            onClick={() => openUpdateModal(room)}
                                            className="me-2"
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => deleteRoom(room.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No rooms found</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>

                    <div className="d-flex justify-content-center mt-4">
                        <Button onClick={() => setPageNo(Math.max(0, pageNo - 1))} disabled={pageNo === 0}>
                            Previous
                        </Button>
                        {[...Array(totalPages).keys()].map((pageNum) => (
                            <Button
                                key={pageNum}
                                onClick={() => setPageNo(pageNum)}
                                active={pageNum === pageNo}
                            >
                                {pageNum + 1}
                            </Button>
                        ))}
                        <Button onClick={() => setPageNo(Math.min(totalPages - 1, pageNo + 1))} disabled={pageNo >= totalPages - 1}>
                            Next
                        </Button>
                    </div>
                </Card.Body>
            </Card>
                </div>

            <ToastContainer position="top-end" className="p-3">
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={2000}
                    autohide
                    style={{
                        backgroundColor: '#28a745', /* Green color */
                        color: 'white', /* White text */
                    }}
                >
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
        </div>
    );
}

export default RoomManagement;
