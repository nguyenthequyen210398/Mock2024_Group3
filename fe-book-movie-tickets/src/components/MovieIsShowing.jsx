import React, { useState } from "react";
import { useGetListDataAPI } from "../api/cinemaApi";
import { toDay } from "../utils/date";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function MovieIsShowing() {
    const [movies, setMovies] = useGetListDataAPI(`https://66794dd518a459f6394f1eec.mockapi.io/cinema`);
    const movieComing = movies.filter(item => item.releaseDate <= toDay);

    const handleWatchTrailer = (trailerUrl) => {
        window.open(trailerUrl, '_blank'); // Open YouTube trailer in a new window/tab
    };


    return (
        <>
            <div className="movie-showing">
                <h2>Phim Đang Chiếu</h2>

                <div className="movie-list">
                    {movieComing.map((movie, index) => (
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
            </div>
        </>
    );
}

export default MovieIsShowing;
