import { useEffect, useState } from 'react';
import { Button, Card, Form, Table } from 'react-bootstrap';
import axios from 'axios';

function SeatManagement() {
    const [seats, setSeats] = useState([]);
    const [newSeat, setNewSeat] = useState({ row: '', col: '', roomId: '', typeId: '' });
    const [updateSeat, setUpdateSeat] = useState({ id: null, row: '', col: '', roomId: '', typeId: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [rooms, setRooms] = useState([]);
    const [seatTypes, setSeatTypes] = useState([]);

    useEffect(() => {
        fetchSeats();
        fetchRooms();
        fetchSeatTypes();
    }, [pageNo, pageSize]);

    const fetchSeats = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/seats', {
                params: {
                    pageNo,
                    pageSize,
                    sortBy: 'id', // Default sort by ID
                    sortDir: 'asc' // Default sort direction
                }
            });
            setSeats(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/rooms');
            setRooms(response.data.content);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchSeatTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/seatTypes');
            setSeatTypes(response.data.content);
        } catch (error) {
            setError(error.message);
        }
    };

    const addOrUpdateSeat = async () => {
        try {
            if (updateSeat.id) {
                // Confirm update
                const confirmUpdate = window.confirm('Are you sure you want to update this seat?');
                if (!confirmUpdate) return;

                // Update seat
                await axios.put(`http://localhost:8080/api/v1/seats/${updateSeat.id}`, {
                    row: updateSeat.row,
                    col: updateSeat.col,
                    roomId: updateSeat.roomId,
                    typeId: updateSeat.typeId
                });
                setUpdateSeat({ id: null, row: '', col: '', roomId: '', typeId: '' });
            } else {
                // Create new seat
                await axios.post('http://localhost:8080/api/v1/seats', {
                    row: newSeat.row,
                    col: newSeat.col,
                    room: newSeat.roomId,
                    type: newSeat.typeId
                });
                setNewSeat({ row: '', col: '', roomId: '', typeId: '' });
            }
            fetchSeats();
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteSeat = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this seat?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/seats/deleteById/${id}`);
                fetchSeats();
            } catch (error) {
                setError(error.message);
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="mt-0">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="text-dark text-lg-start">Seat Management</h1>
                </div>
            </div>
            <div className="row mt-0">
                <div className="col-md-4 mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">
                                {updateSeat.id ? 'Update Seat' : 'Create New Seat'}
                            </Card.Title>
                            <Form>
                                <Form.Group className="mb-3" controlId="seatRow">
                                    <Form.Label>Row</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter row number"
                                        value={updateSeat.id ? updateSeat.row : newSeat.row}
                                        onChange={(e) => updateSeat.id ? setUpdateSeat({ ...updateSeat, row: e.target.value }) : setNewSeat({ ...newSeat, row: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="seatCol">
                                    <Form.Label>Column</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter column number"
                                        value={updateSeat.id ? updateSeat.col : newSeat.col}
                                        onChange={(e) => updateSeat.id ? setUpdateSeat({ ...updateSeat, col: e.target.value }) : setNewSeat({ ...newSeat, col: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="seatRoom">
                                    <Form.Label>Room</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={updateSeat.id ? updateSeat.roomId : newSeat.roomId}
                                        onChange={(e) => updateSeat.id ? setUpdateSeat({ ...updateSeat, roomId: e.target.value }) : setNewSeat({ ...newSeat, roomId: e.target.value })}
                                    >
                                        <option value="">Select Room</option>
                                        {rooms.map((room) => (
                                            <option key={room.id} value={room.id}>
                                                {room.number}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="seatType">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={updateSeat.id ? updateSeat.typeId : newSeat.typeId}
                                        onChange={(e) => updateSeat.id ? setUpdateSeat({ ...updateSeat, typeId: e.target.value }) : setNewSeat({ ...newSeat, typeId: e.target.value })}
                                    >
                                        <option value="">Select Type</option>
                                        {seatTypes.map((seatType) => (
                                            <option key={seatType.id} value={seatType.id}>
                                                {seatType.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" onClick={addOrUpdateSeat}>
                                    {updateSeat.id ? 'Update Seat' : 'Add Seat'}
                                </Button>
                                {updateSeat.id && (
                                    <Button
                                        variant="secondary"
                                        onClick={() => setUpdateSeat({ id: null, row: '', col: '', roomId: '', typeId: '' })}
                                        className="ms-2"
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-8">
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center fs-1 mb-4">Seat List</Card.Title>
                            <Table bordered hover className="mt-4">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Row</th>
                                    <th>Column</th>
                                    <th>Room</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {seats.length > 0 ? (
                                    seats.map((seat) => (
                                        <tr key={seat.id}>
                                            <td>{seat.id}</td>
                                            <td>{seat.row}</td>
                                            <td>{seat.col}</td>
                                            <td>{seat.roomNumber}</td>
                                            <td>{seat.typeName}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    onClick={() => {
                                                        setUpdateSeat({ id: seat.id, row: seat.row, col: seat.col, roomId: seat.roomId, typeId: seat.typeId });
                                                    }}
                                                    className="me-2"
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => deleteSeat(seat.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No seats found</td>
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
            </div>
        </div>
    );
}

export default SeatManagement;
