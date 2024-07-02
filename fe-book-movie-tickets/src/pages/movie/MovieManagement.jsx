import Table from 'react-bootstrap/Table';
import { Button, Modal, Card, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import {useEffect, useState} from "react";
import Movie from "../../components/Movie.jsx";

function MovieManagement() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [search, setSearch] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sortByType, setSortByType] = useState('Mặc định'); // Initial sort type
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/movies');
            setMovies(response.data.content);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const openModalWithData = (movie) => {
        setSelectedMovie(movie);
        setShowDetailModal(true);
    };

    const openEditModal = (movie) => {
        setSelectedMovie(movie);
        setShowEditModal(true);
    };

    const deleteById = (id) => {
        // Implement delete logic here
        console.log(`Deleting movie with ID ${id}`);
        // Close delete modal after deletion
        setShowDeleteModal(false);
    };

    const getPageNumbers = () => {
        // Mock logic for pagination, replace with actual logic based on totalPages from API response
        return [1]; // Example: 1 page
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

    if (loading) {
        return <p>Loading...</p>; // Optional: Show a loading indicator
    }

    if (error) {
        return <p>Error: {error}</p>; // Optional: Show an error message
    }

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

                    {/* Movie Table */}
                    <Table striped bordered hover className="mt-4">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Release Year</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {movies?.length > 0 ? (
                            movies.map(movie => (
                                <Movie
                                    key={movie.id}
                                    movie={movie}
                                    openModalWithData={openModalWithData}
                                    openEditModal={openEditModal}
                                    setSelectedMovie={setSelectedMovie}
                                    setShowDeleteModal={setShowDeleteModal}
                                    deleteById={deleteById}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No movies found</td>
                            </tr>
                        )}
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
                    <Modal.Title>Edit Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Form for editing movie details */}
                    <p>Implement edit form here</p>
                </Modal.Body>
            </Modal>

            {/* Detail Modal */}
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Movie Details: {selectedMovie?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display movie details */}
                    <p>ID: {selectedMovie?.id}</p>
                    <p>Name: {selectedMovie?.name}</p>
                    <p>Release Year: {selectedMovie?.releaseYear}</p>
                    <p>Description: {selectedMovie?.description}</p>
                    {/* Add other fields as needed */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailModal(false)}>Close</Button>
                    <Button variant="primary" onClick={() => { setShowEditModal(true); setShowDetailModal(false); }}>Edit</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to delete the movie: {selectedMovie?.name}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Close</Button>
                    <Button variant="danger" onClick={() => { deleteById(selectedMovie?.id); setShowDeleteModal(false); }}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MovieManagement;
