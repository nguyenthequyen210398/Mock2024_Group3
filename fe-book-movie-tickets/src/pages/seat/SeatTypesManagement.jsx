import { useEffect, useState, useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';

function SeatTypesManagement() {
    const [seatTypes, setSeatTypes] = useState([]);
    const [newSeatTypeName, setNewSeatTypeName] = useState('');
    const [newSeatTypePrice, setNewSeatTypePrice] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [updateName, setUpdateName] = useState('');
    const [updatePrice, setUpdatePrice] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const createCardRef = useRef(null);

    useEffect(() => {
        fetchSeatTypes();
    }, [pageNo, pageSize]);

    const fetchSeatTypes = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/seatTypes', {
                params: {
                    pageNo,
                    pageSize
                }
            });
            setSeatTypes(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (isUpdating) {
            await updateSeatType();
        } else {
            await addSeatType();
        }
    };

    const addSeatType = async () => {
        try {
            await axios.post('http://localhost:8080/api/v1/seatTypes', {
                name: newSeatTypeName,
                price: parseFloat(newSeatTypePrice)
            });
            fetchSeatTypes();
            setNewSeatTypeName('');
            setNewSeatTypePrice('');
            alert('Seat Type added successfully');
            if (createCardRef.current) {
                createCardRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            setError(error.message);
            alert('Failed to add Seat Type');
        }
    };

    const deleteSeatType = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this seat type?');
        if (!confirmed) return;

        try {
            await axios.delete(`http://localhost:8080/api/v1/seatTypes/${id}`);
            fetchSeatTypes();
            alert('Seat Type deleted successfully');
        } catch (error) {
            setError(error.message);
            alert('Failed to delete Seat Type');
        }
    };

    const openUpdateModal = (seatType) => {
        setUpdateId(seatType.id);
        setUpdateName(seatType.name);
        setUpdatePrice(seatType.price);
        setIsUpdating(true);
        setShowUpdateModal(true);
    };

    const updateSeatType = async () => {
        try {
            await axios.put(`http://localhost:8080/api/v1/seatTypes/${updateId}`, {
                name: updateName,
                price: parseFloat(updatePrice)
            });
            fetchSeatTypes();
            setShowUpdateModal(false);
            alert('Seat Type updated successfully');
            setIsUpdating(false);
            if (createCardRef.current) {
                createCardRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            setError(error.message);
            alert('Failed to update Seat Type');
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
                    <h1 className="text-dark text-lg-start">Seat Type Management</h1>
                </div>
            </div>
    <div className="row mt-0">
                <div className="col-md-4 mb-4" ref={createCardRef}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">
                                {isUpdating ? 'Update Seat Type' : 'Create New Seat Type'}
                            </Card.Title>
                            <Form>
                                <Form.Group className="mb-3" controlId="seatTypeName">
                                    <Form.Label>Seat Type Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter seat type name"
                                        value={isUpdating ? updateName : newSeatTypeName}
                                        onChange={(e) => isUpdating ? setUpdateName(e.target.value) : setNewSeatTypeName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="seatTypePrice">
                                    <Form.Label>Seat Type Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter seat type price"
                                        value={isUpdating ? updatePrice : newSeatTypePrice}
                                        onChange={(e) => isUpdating ? setUpdatePrice(e.target.value) : setNewSeatTypePrice(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleSubmit}>
                                    {isUpdating ? 'Update' : 'Add Seat Type'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-8 mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title className="text-center fs-1 mb-4">Seat Type List</Card.Title>
                            <table className="table table-bordered mt-4">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {seatTypes.length > 0 ? (
                                    seatTypes.map((seatType) => (
                                        <tr key={seatType.id}>
                                            <td>{seatType.id}</td>
                                            <td>{seatType.name}</td>
                                            <td>{(seatType.price ? seatType.price.toFixed(2) : 'N/A')}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    onClick={() => openUpdateModal(seatType)}
                                                    className="me-2"
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => deleteSeatType(seatType.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            No seat types found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>

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
                                <Button
                                    onClick={() => setPageNo(Math.min(totalPages - 1, pageNo + 1))}
                                    disabled={pageNo >= totalPages - 1}
                                >
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

export default SeatTypesManagement;
