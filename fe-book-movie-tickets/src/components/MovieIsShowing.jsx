import { useState } from 'react';
import '../../src/main.scss';
import { useGetListDataAPI } from '../api/cinemaApi';
import { toDay } from '../utils/date';
function MovieIsShowing() {

    const [movies, Setmovies] = useGetListDataAPI(`https://66794dd518a459f6394f1eec.mockapi.io/cinema`);
    const movieIsShowing = movies.filter(item => item.releaseDate <= toDay)

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

    const handleWatchTrailer = (trailerUrl) => {
        window.open(trailerUrl, '_blank'); // Mở trang trailer YouTube trong cửa sổ/tab mới
    };

    const handleViewDetails = () => {
        // Xử lý khi người dùng click vào nút xem chi tiết phim
        console.log(`Đang xem chi tiết của phim: ${currentMovie.title}`);
    };



    return (
        <>

            <div className="movie-showing">
                <h2>Phim đang chiếu</h2>

                <div className="movie-list">
                    {movieIsShowing.map((movie, index) => (
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
                                    <button onClick={() => handleWatchTrailer(movie.trailer)}>Trailer</button>
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
export default MovieIsShowing;