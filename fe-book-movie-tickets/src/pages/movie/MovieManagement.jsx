import React, { useEffect, useState } from 'react';
import {Button, Modal, Card, Dropdown, Nav} from 'react-bootstrap';
import axios from 'axios';
import Movie from '../../components/Movie.jsx';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function MovieManagement() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [search, setSearch] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [sortByType, setSortByType] = useState('id');
    const [sortDir, setSortDir] = useState('asc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [currentSort, setCurrentSort] = useState('Sort By'); // Add state to manage current sort display


    // State for new movie fields
    const [newMovieName, setNewMovieName] = useState('');
    const [newMovieReleaseYear, setNewMovieReleaseYear] = useState('');
    const [newMovieDescription, setNewMovieDescription] = useState('');
    const [newMovieRating, setNewMovieRating] = useState('');
    const [newMovieStarring, setNewMovieStarring] = useState('');
    const [newMovieDirectedBy, setNewMovieDirectedBy] = useState('');
    const [newMovieProductionCompany, setNewMovieProductionCompany] = useState('');
    const [newMovieCountry, setNewMovieCountry] = useState('');
    const [newMovieLanguage, setNewMovieLanguage] = useState('');
    const [newMovieStatus, setNewMovieStatus] = useState('');
    const [newMovieRunningTime, setNewMovieRunningTime] = useState('');
    const [newMovieScreenplayBy, setNewMovieScreenplayBy] = useState('');
    const [newMovieImgLink, setNewMovieImgLink] = useState('');


    // State for updated movie fields
    const [updatedMovieName, setUpdatedMovieName] = useState('');
    const [updatedMovieReleaseYear, setUpdatedMovieReleaseYear] = useState('');
    const [updatedMovieDescription, setUpdatedMovieDescription] = useState('');
    const [updatedMovieRating, setUpdatedMovieRating] = useState('');
    const [updatedMovieStarring, setUpdatedMovieStarring] = useState('');
    const [updatedMovieDirectedBy, setUpdatedMovieDirectedBy] = useState('');
    const [updatedMovieProductionCompany, setUpdatedMovieProductionCompany] = useState('');
    const [updatedMovieImgLink, setUpdatedMovieImgLink] = useState('');



    useEffect(() => {
        fetchMovies();
    }, [pageNo, pageSize, sortByType, sortDir]);

    const fetchMovies = async (search = '') => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/movies`, {
                params: {
                    pageNo,
                    pageSize,
                    sortBy: sortByType,
                    sortDir,
                    search
                }
            });
            setMovies(response.data.content);
            setTotalPages(response.data.totalPages);
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
        // Populate state with current movie data for editing
        setUpdatedMovieName(movie.name);
        setUpdatedMovieReleaseYear(movie.releaseYear);
        setUpdatedMovieDescription(movie.description);
        setUpdatedMovieRating(movie.rating);
        setUpdatedMovieStarring(movie.starring);
        setUpdatedMovieDirectedBy(movie.directedBy);
        setUpdatedMovieProductionCompany(movie.productionCompany);
        setUpdatedMovieImgLink(movie.imgLink)
    };

    const deleteById = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/movies/${id}`);
            setMovies(movies.filter(movie => movie.id !== id));
            setShowDeleteModal(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const updateMovie = async () => {
        const { id } = selectedMovie;
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/movies/${id}`, {
                name: updatedMovieName,
                releaseYear: updatedMovieReleaseYear,
                description: updatedMovieDescription,
                rating: updatedMovieRating,
                starring: updatedMovieStarring,
                directedBy: updatedMovieDirectedBy,
                productionCompany: updatedMovieProductionCompany,
                imgLink: updatedMovieImgLink
            });
            const updatedMovie = response.data;
            // Update the movie in the local state
            setMovies(movies.map(movie => movie.id === id ? updatedMovie : movie));
            setShowEditModal(false); // Close the edit modal
        } catch (error) {
            setError(error.message);
        }
    };
    const handleSortChange = (sortBy, sortDir) => {
        setSortByType(sortBy);
        setSortDir(sortDir);
        setCurrentSort(`${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} ${sortDir === 'asc' ? 'Ascending' : 'Descending'}`);
        fetchMovies(search, sortBy, sortDir);
    };
    const prevPage = () => {
        if (pageNo > 0) {
            setPageNo(pageNo - 1);
        }
    };

    const nextPage = () => {
        if (pageNo < totalPages - 1) {
            setPageNo(pageNo + 1);
        }
    };

    const gotoPage = (pageNum) => {
        setPageNo(pageNum - 1);
    };

    const searchBy = () => {
        console.log(`Searching for ${search}`);
        fetchMovies(search);
    };
    const addMovie = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/movies', {
                name: newMovieName,
                releaseYear: newMovieReleaseYear,
                description: newMovieDescription,
                rating: newMovieRating,
                starring: newMovieStarring,
                directedBy: newMovieDirectedBy,
                productionCompany: newMovieProductionCompany,
                country: newMovieCountry,
                language: newMovieLanguage,
                status: newMovieStatus,
                runningTime: newMovieRunningTime,
                screenplayBy: newMovieScreenplayBy,
                imgLink: newMovieImgLink
                // Add other fields for the new movie as needed
            });
            const newMovie = response.data;
            setMovies([...movies, newMovie]); // Add new movie to current movies array
            setShowAddModal(false); // Close the add movie modal
            fetchMovies(); // Refresh movie list after adding
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Optional: Show a loading indicator
    }

    if (error) {
        return <p>Error: {error}</p>; // Optional: Show an error message
    }

    return (
        <div className="mt-0">
            <div className="row mt-0">
                <div className="col-2 p-2 d-flex flex-column vh-100">
                    {/* Left Sidebar/Menu */}
                    <Nav className="flex-column  p-3 shadow-sm rounded vh-100">

                        <Nav.Link href="#" className="text-dark mb-2" onClick={() => console.log('Menu Item 1 clicked')}>
                            <i className="bi bi-speedometer2 me-2"></i> Dashboard
                        </Nav.Link>
                        <Nav.Link href="/movie-management" className="text-dark mb-2" >
                            <i className="bi bi-film me-2"></i> Movie
                        </Nav.Link>
                        <Nav.Link href="#" className="text-dark mb-2" onClick={() => console.log('Menu Item 3 clicked')}>
                            <i className="bi bi-ticket me-2"></i> Ticket
                        </Nav.Link>
                        {/* Add more menu items as needed */}
                    </Nav>
                </div>

                <div className="col-10">
                    <Card className="col-10 mx-auto">
                        <Card.Body>
                            <Card.Title className="text-center fs-1 mb-4">Movie List</Card.Title>
                            {/* Add Movie Button */}
                            <div className="text-end mb-3">
                                <Button variant="success" onClick={() => setShowAddModal(true)}>
                                    Add New Movie
                                </Button>
                            </div>
                            <div className="container mx-auto">
                                <div className="row my-4">
                                    <div className="col-6 p-0">
                                        {/* Sort button */}
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                {currentSort}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleSortChange('id', 'asc')}>Id Ascending</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleSortChange('id', 'desc')}>Id Descending</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleSortChange('name', 'asc')}>Name Ascending</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleSortChange('name', 'desc')}>Name Descending</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleSortChange('releaseYear', 'asc')}>Release Year Ascending</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleSortChange('releaseYear', 'desc')}>Release Year Descending</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="col-6 p-0">
                                        {/* Search Bar */}
                                        <div className="input-group">
                                            <input
                                                type="search"
                                                className="form-control "
                                                placeholder="Search"
                                                aria-label="Search"
                                                aria-describedby="search-addon"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                            <Button onClick={searchBy} className="btn btn-sm btn-primary">
                                                Search
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Movie Table */}
                            <table className="table  table-bordered mt-4 ">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Release Year</th>
                                    <th>Description</th>
                                    <th>Rating</th>
                                    <th>Starring</th>
                                    <th>Directed By</th>
                                    <th>Production Company</th>
                                    <th>img</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {movies.length > 0 ? (
                                    movies.map((movie) => (
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
                                        <td colSpan="9" className="text-center">
                                            No movies found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="d-flex justify-content-center mt-4">
                                <Button onClick={prevPage} disabled={pageNo === 0}>Previous</Button>
                                {[...Array(totalPages).keys()].map((pageNum) => (
                                    <Button
                                        key={pageNum}
                                        onClick={() => gotoPage(pageNum + 1)}
                                        active={pageNum === pageNo}
                                    >
                                        {pageNum + 1}
                                    </Button>
                                ))}
                                <Button onClick={nextPage} disabled={pageNo >= totalPages - 1}>Next</Button>
                            </div>
                        </Card.Body>
                    </Card>

                </div>
            </div>

            {/* Modals */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} dialogClassName="modal-lg">
                {/* Use 'dialogClassName="modal-lg"' to make the modal larger */}
                <Modal.Header closeButton>
                    <Modal.Title>Add New Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="newMovieName" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="newMovieName"
                                value={newMovieName}
                                onChange={(e) => setNewMovieName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newMovieImgLink" className="form-label"> Image</label>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    id="newMovieImgLink"
                                    value={newMovieImgLink}
                                    onChange={(e) => setNewMovieImgLink(e.target.value)}
                                    type="url"
                                    placeholder="Enter image URL"
                                />
                                <label className="input-group-text" htmlFor="inputGroupFile01">
                                    Upload
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="inputGroupFile01"
                                    style={{ display: 'none' }} // Hide the file input initially
                                    onChange={(e) => setNewMovieImgLink(e.target.value)}

                                />
                            </div>
                        </div>



                        <div className="mb-3">
                            <label htmlFor="newMovieReleaseYear" className="form-label">
                                Release Year
                            </label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="newMovieReleaseYear"
                                value={newMovieReleaseYear}
                                onChange={(e) => setNewMovieReleaseYear(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newMovieDescription" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="newMovieDescription"
                                rows="3"
                                value={newMovieDescription}
                                onChange={(e) => setNewMovieDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newMovieRating" className="form-label">
                                Rating
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="newMovieRating"
                                value={newMovieRating}
                                onChange={(e) => setNewMovieRating(e.target.value)}
                            />
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="newMovieStarring" className="form-label">
                                    Starring
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newMovieStarring"
                                    value={newMovieStarring}
                                    onChange={(e) => setNewMovieStarring(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="newMovieDirectedBy" className="form-label">
                                    Directed By
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newMovieDirectedBy"
                                    value={newMovieDirectedBy}
                                    onChange={(e) => setNewMovieDirectedBy(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="newMovieProductionCompany" className="form-label">
                                    Production Company
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newMovieProductionCompany"
                                    value={newMovieProductionCompany}
                                    onChange={(e) => setNewMovieProductionCompany(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="newMovieCountry" className="form-label">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newMovieCountry"
                                    value={newMovieCountry}
                                    onChange={(e) => setNewMovieCountry(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="newMovieLanguage" className="form-label">
                                    Language
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newMovieLanguage"
                                    value={newMovieLanguage}
                                    onChange={(e) => setNewMovieLanguage(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="newMovieStatus" className="form-label">
                                    Status
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newMovieStatus"
                                    value={newMovieStatus}
                                    onChange={(e) => setNewMovieStatus(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="newMovieRunningTime" className="form-label">
                                    Running Time
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newMovieRunningTime"
                                    value={newMovieRunningTime}
                                    onChange={(e) => setNewMovieRunningTime(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="newMovieScreenplayBy" className="form-label">
                                    Screenplay By
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newMovieScreenplayBy"
                                    value={newMovieScreenplayBy}
                                    onChange={(e) => setNewMovieScreenplayBy(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Add more fields for the new movie attributes as needed */}

                        {/* Modal Footer */}
                        <Modal.Footer className="justify-content-center">
                            <Button variant="secondary" size="lg" onClick={() => setShowAddModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" size="lg" onClick={addMovie}>
                                Add Movie
                            </Button>
                        </Modal.Footer>

                    </form>
                </Modal.Body>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="updatedMovieName" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="updatedMovieName"
                                value={updatedMovieName}
                                onChange={(e) => setUpdatedMovieName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="updatedMovieImgLink" className="form-label"> Image</label>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    id="updatedMovieImgLink"
                                    value={updatedMovieImgLink}
                                    onChange={(e) => setUpdatedMovieImgLink(e.target.value)}
                                    type="url"
                                    placeholder="Enter image URL"
                                />
                                <label className="input-group-text" htmlFor="inputGroupFile01">
                                    Upload
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="inputGroupFile01"
                                    style={{ display: 'none' }} // Hide the file input initially
                                    onChange={(e) => setUpdatedMovieImgLink(e.target.value)}

                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="updatedMovieReleaseYear" className="form-label">
                                Release Year
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="updatedMovieReleaseYear"
                                value={updatedMovieReleaseYear}
                                onChange={(e) => setUpdatedMovieReleaseYear(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="updatedMovieDescription" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="updatedMovieDescription"
                                rows="3"
                                value={updatedMovieDescription}
                                onChange={(e) => setUpdatedMovieDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="updatedMovieRating" className="form-label">
                                Rating
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="updatedMovieRating"
                                value={updatedMovieRating}
                                onChange={(e) => setUpdatedMovieRating(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="updatedMovieStarring" className="form-label">
                                Starring
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="updatedMovieStarring"
                                value={updatedMovieStarring}
                                onChange={(e) => setUpdatedMovieStarring(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="updatedMovieDirectedBy" className="form-label">
                                Directed By
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="updatedMovieDirectedBy"
                                value={updatedMovieDirectedBy}
                                onChange={(e) => setUpdatedMovieDirectedBy(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="updatedMovieProductionCompany" className="form-label">
                                Production Company
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="updatedMovieProductionCompany"
                                value={updatedMovieProductionCompany}
                                onChange={(e) => setUpdatedMovieProductionCompany(e.target.value)}
                            />
                        </div>
                        {/* Add more fields for the updated movie attributes as needed */}

                        {/* Modal Footer */}
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={updateMovie}>
                                Update Movie
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Detail Modal */}
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Movie Details: {selectedMovie?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-start">
                    {selectedMovie?.imgLink && (
                        <div className="mt-3">
                            <img src={selectedMovie.imgLink} alt="Movie Poster" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                        </div>
                    )}
                    <p><strong>ID:</strong> {selectedMovie?.id}</p>
                    <p><strong>Name:</strong> {selectedMovie?.name}</p>
                    <p><strong>Release Year:</strong> {selectedMovie?.releaseYear}</p>
                    <p><strong>Description:</strong> {selectedMovie?.description}</p>
                    <p><strong>Rating:</strong> {selectedMovie?.rating}</p>
                    <p><strong>Starring:</strong> {selectedMovie?.starring}</p>
                    <p><strong>Directed By:</strong> {selectedMovie?.directedBy}</p>
                    <p><strong>Production Company:</strong> {selectedMovie?.productionCompany}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setShowEditModal(true);
                            setShowDetailModal(false);
                        }}
                    >
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* Delete Modal */}
            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete the movie: {selectedMovie?.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteById(selectedMovie?.id);
                            setShowDeleteModal(false);
                        }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
}

export default MovieManagement;

