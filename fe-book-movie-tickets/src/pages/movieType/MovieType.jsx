import { useEffect, useState } from 'react';
import { Button, Card, Form, Table } from 'react-bootstrap';
import axios from 'axios';

function MovieType() {
    const [movieTypes, setMovieTypes] = useState([]);
    const [newMovieTypeName, setNewMovieTypeName] = useState('');
    const [updateMovieTypeName, setUpdateMovieTypeName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [updateMovieTypeId, setUpdateMovieTypeId] = useState(null);

    useEffect(() => {
        fetchMovieTypes();
    }, [pageNo, pageSize]);

    const fetchMovieTypes = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/movieTypes', {
                params: {
                    pageNo,
                    pageSize
                }
            });
            setMovieTypes(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addOrUpdateMovieType = async () => {
        try {
            if (updateMovieTypeId) {
                // Confirm update
                const confirmUpdate = window.confirm('Are you sure you want to update this movie type?');
                if (!confirmUpdate) return;

                // Update movie type
                await axios.put(`http://localhost:8080/api/v1/movieTypes/${updateMovieTypeId}`, {
                    name: updateMovieTypeName
                });
                setUpdateMovieTypeId(null);
                setUpdateMovieTypeName('');
            } else {
                // Create new movie type
                const response = await axios.post('http://localhost:8080/api/v1/movieTypes', {
                    name: newMovieTypeName
                });
                const newMovieType = response.data;
                setMovieTypes(prevMovieTypes => [...prevMovieTypes, newMovieType]);
                setNewMovieTypeName('');
            }
            fetchMovieTypes();
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteMovieType = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this movie type?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/movieTypes/${id}`);
                fetchMovieTypes();
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
                    <h1 className="text-dark text-lg-start">Movie Type Management</h1>
                </div>
            </div>
            <div className="row mt-0">
                <div className="col-4 mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">
                                {updateMovieTypeId ? 'Update Movie Type' : 'Create New Movie Type'}
                            </Card.Title>
                            <Form>
                                <Form.Group className="mb-3" controlId="movieTypeName">
                                    <Form.Label>Movie Type Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter movie type name"
                                        value={updateMovieTypeId ? updateMovieTypeName : newMovieTypeName}
                                        onChange={(e) => updateMovieTypeId ? setUpdateMovieTypeName(e.target.value) : setNewMovieTypeName(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={addOrUpdateMovieType}>
                                    {updateMovieTypeId ? 'Update Movie Type' : 'Add Movie Type'}
                                </Button>
                                {updateMovieTypeId && (
                                    <Button
                                        variant="secondary"
                                        onClick={() => setUpdateMovieTypeId(null)}
                                        className="ms-2"
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-8">
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center fs-1 mb-4">Movie Type List</Card.Title>
                            <Table bordered hover className="mt-4">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {movieTypes.length > 0 ? (
                                    movieTypes.map((movieType) => (
                                        <tr key={movieType.id}>
                                            <td>{movieType.id}</td>
                                            <td>{movieType.name}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    onClick={() => {
                                                        setUpdateMovieTypeId(movieType.id);
                                                        setUpdateMovieTypeName(movieType.name);
                                                    }}
                                                    className="me-2"
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => deleteMovieType(movieType.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">No movie types found</td>
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

export default MovieType;
