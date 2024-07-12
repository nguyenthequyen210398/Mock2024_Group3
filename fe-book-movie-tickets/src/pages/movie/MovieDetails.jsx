// File: MovieDetails.jsx

import React from 'react';
import { Link, useParams } from 'react-router-dom'; // Để lấy tham số từ URL
import { useGetListDataAPI } from '../../api/cinemaApi';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

import './MovieDetails.scss';

const MovieDetails = () => {
    const { id } = useParams(); // Lấy id phim từ URL params
    const [movie, setMovie] = useGetListDataAPI(`https://66794dd518a459f6394f1eec.mockapi.io/cinema/${id}`);
    console.log(movie)

    if (!movie) {
        return <div>Không tìm thấy thông tin cho phim này.</div>;
    }

    return (
        <div>
            <Header />
            <div className="movie-details">
                <h2>{movie.title}</h2>
                <img src={movie.imageUrl} alt={movie.title} />
                <p><strong>Mô tả:
                    chờ up date  chờ up date  chờ up date
                    chờ up date chờ up date chờ up date
                    chờ up date  chờ up date  chờ up date  chờ up date
                    chờ up date  chờ up date  chờ up date  chờ up date</strong></p>
                <p><strong>Đạo diễn:</strong> {movie.director}</p>
                <p><strong>Diễn viên:</strong> </p>
                <p><strong>Thể loại:</strong> {movie.genre}</p>
                <p><strong>Quốc gia:</strong> {movie.country}</p>
                <p><strong>Ngày công chiếu:</strong> {movie.releaseDate}</p>
                <p><strong>Thời lượng:</strong> {movie.duration} phút</p>
                <p><strong>Đánh giá:</strong> /10</p>
                <p><strong>Trailer:</strong> <a href={movie.trailer} target="_blank" rel="noopener noreferrer">Xem trailer</a></p>
                <Link to={`/ticket-purchase/${movie.id}`} ><button className="buy-ticket-button">
                    <i class="fa fa-hand-o-right"> Đặt vé tại đây</i>
                </button></Link>
            </div>

            <Footer />
        </div>

    );
};

export default MovieDetails;
