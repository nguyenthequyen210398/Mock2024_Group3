import React from 'react';
import '../../components/movie/movie.scss';

const Confirmation = ({ selectedDate, selectedTimeSlot, selectedSeats }) => {
    return (
        <div className="confirmation-container">
            <h2>Xác nhận đặt vé:</h2>
            <p>Ngày chiếu: {selectedDate}</p>
            <p>
                Khung giờ: {selectedTimeSlot.time} - Rạp chiếu: {selectedTimeSlot.cinema}
            </p>
            <p>Ghế đã chọn:</p>
            <ul>
                {selectedSeats.map((seat) => (
                    <li key={seat.id}>
                        {seat.row}-{seat.seatNumber}
                    </li>
                ))}
            </ul>
            <button onClick={() => alert('Đặt vé thành công!')}>
                Xác nhận đặt vé
            </button>
        </div>
    );
};

export default Confirmation;
