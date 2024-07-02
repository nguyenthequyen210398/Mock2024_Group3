import React from 'react';
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
        productionCompany
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
