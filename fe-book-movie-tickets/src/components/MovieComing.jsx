import { useState } from "react";
import { useGetListDataAPI } from "../api/cinemaApi";

function MovieComing() {

    const [movies, Setmovies] = useGetListDataAPI(`https://66794dd518a459f6394f1eec.mockapi.io/cinema`);

    const [showOverlay, setShowOverlay] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null);

    const handleMouseEnter = (movie) => {
        setCurrentMovie(movie);
        setShowOverlay(true);
    };

    const handleMouseLeave = () => {
        setShowOverlay(false);
    };

    const handleBuyTicket = () => {
        // Xử lý khi người dùng click vào nút mua vé
        console.log(`Đã mua vé cho phim: ${movies.title}`);
    };

    const handleWatchTrailer = () => {
        // Xử lý khi người dùng click vào nút xem trailer
        console.log(`Đang xem trailer của phim: ${movies.title}`);
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
                    {movies.map((movie, index) => (
                        <div
                            key={index}
                            className="movie-item"
                            onMouseEnter={() => handleMouseEnter(movie)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img src={movie.imageUrl} alt={movie.title} />
                            {showOverlay && currentMovie === movie && (
                                <div className="overlay">
                                    <button onClick={handleBuyTicket}>Mua vé</button>
                                    <button onClick={handleWatchTrailer}>Trailer</button>
                                    <button onClick={handleViewDetails}>Xem chi tiết</button>
                                </div>
                            )}
                            <p className="movie-title">{movie.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default MovieComing;