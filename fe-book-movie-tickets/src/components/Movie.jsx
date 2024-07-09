import { Button } from 'react-bootstrap';

const Movie = ({
                   movie,
                   openModalWithData,
                   openEditModal,
                   setSelectedMovie,
                   setShowDeleteModal,
                   deleteById
               }) => {
    const {
        id,
        name,
        releaseYear,
        description,
        rating,
        starring,
        directedBy,
        productionCompany,
        imgLink
    } = movie;

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{releaseYear}</td>
            <td>{description}</td>
            <td>{rating}</td>
            <td>{starring}</td>
            <td>{directedBy}</td>
            <td>{productionCompany}</td>
            <td>
                {imgLink && (
                    <img
                        src={imgLink}
                        alt=""
                        style={{ maxWidth: '100px', maxHeight: '150px' }} // Adjust dimensions as needed
                    />
                )}
            </td>

            <td className="d-flex justify-content-center">
                <Button onClick={() => openModalWithData(movie)} variant="light" className="me-2">
                    View
                </Button>
                <Button onClick={() => openEditModal(movie)} variant="primary" className="me-2">
                    Edit
                </Button>
                <Button onClick={() => {
                    setSelectedMovie(movie);
                    setShowDeleteModal(true);
                }} variant="danger">
                    Delete
                </Button>
            </td>
        </tr>
    );
}

export default Movie;
