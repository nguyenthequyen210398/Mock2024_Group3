import React, { useEffect, useState } from "react";
import { useGetListDataAPI } from "../api/cinemaApi";
import { toDay } from "../utils/date";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function MovieIsShowing() {
    // const [movies, setMovies] = useGetListDataAPI(`https://66794dd518a459f6394f1eec.mockapi.io/cinema`);
    const [movies, setMovies] = useGetListDataAPI(`http://localhost:8080/api/v1/movies/showing`);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const movieComing = movies.filter(item => item.releaseDate <= toDay);

    const handleWatchTrailer = (trailerUrl) => {
        window.open(trailerUrl, '_blank'); // Open YouTube trailer in a new window/tab
    };

    // Logic for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = movieComing.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div className="movie-showing">
                <h2>Phim Đang Chiếu</h2>

                <div className="movie-list">
                    {currentItems.map((movie, index) => (
                        <div key={index} className="movie-item">
                            <img src={movie.imageUrl} alt={movie.title} />
                            <p className="movie-title">{movie.title}</p>
                            <div className="overlay">
                                <button onClick={() => handleWatchTrailer(movie.trailer)}>Trailer</button>
                                <button><Link to={`/ticket-purchase/${movie.id}`} className="details-link">Mua vé</Link></button>
                                <button><Link to={`/movie/${movie.id}`} className="details-link">Xem chi tiết</Link></button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination buttons */}
                <div className="pagination">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentItems.length < itemsPerPage || indexOfLastItem >= movieComing.length}>Next</button>
                </div>
            </div>
        </>
    );
}

export default MovieIsShowing;
