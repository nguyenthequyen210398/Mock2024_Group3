import React, { useState } from "react";
import { useGetListDataAPI } from "../api/cinemaApi";
import { toDay } from "../utils/date";

function MovieComing() {
    const [movies, setMovies] = useGetListDataAPI(`https://66794dd518a459f6394f1eec.mockapi.io/cinema`);
    const movieComing = movies.filter(item => item.releaseDate > toDay);

    const handleWatchTrailer = (trailerUrl) => {
        window.open(trailerUrl, '_blank'); // Mở trang trailer YouTube trong cửa sổ/tab mới
    };
    const handleBuyTicket = () => {
        // Xử lý khi người dùng click vào nút mua vé
        console.log(`Đã mua vé cho phim: ${movies.title}`);
    };

    const handleViewDetails = () => {
        // Xử lý khi người dùng click vào nút xem chi tiết phim
        console.log(`Đang xem chi tiết của phim: ${currentMovie.title}`);
    };

    return (
        <>
            <div className="movie-showing">
                <h2>Phim sắp chiếu</h2>

                <div className="movie-list">
                    {movieComing.map((movie, index) => (
                        <div key={index} className="movie-item">
                            <img src={movie.imageUrl} alt={movie.title} />
                            <p className="movie-title">{movie.title}</p>
                            <div className="overlay">
                                <button onClick={() => handleWatchTrailer(movie.trailer)}>Trailer</button>
                                <button onClick={handleBuyTicket}>Mua vé</button>
                                <button onClick={handleViewDetails}>Xem chi tiết</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MovieComing;
