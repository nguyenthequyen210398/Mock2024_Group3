import { Button } from 'react-bootstrap';

const Movie = ({ movie, openModalWithData, openEditModal, setSelectedMovie, setShowDeleteModal, deleteById }) => {
    const { id, name, releaseYear, description } = movie;

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{releaseYear}</td>
            <td>{description}</td>
            <td>
                <Button onClick={() => openModalWithData(movie)} variant="light">View</Button>
                <Button onClick={() => openEditModal(movie)} variant="primary" style={{ marginLeft: '10px' }}>Edit</Button>
                <Button onClick={() => { setSelectedMovie(movie); setShowDeleteModal(true); }} variant="danger" style={{ marginLeft: '10px' }}>Delete</Button>
            </td>
        </tr>
    );
}

export default Movie;
