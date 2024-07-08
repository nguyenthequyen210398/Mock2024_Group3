import React, { useState, useEffect } from 'react';
import '../movie/movie.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';


const SeatSelector = ({
    scheduleData,
    selectedDate,
    selectedTimeSlot,
    selectedSeats,
    onSeatSelect,
}) => {
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        // Tìm ghế cho thời gian và rạp chiếu đã chọn
        if (selectedDate && selectedTimeSlot) {
            const foundSeats = scheduleData
                .find((movie) => movie.date === selectedDate)
                .timeSlots.find(
                    (slot) =>
                        slot.time === selectedTimeSlot.time &&
                        slot.cinema === selectedTimeSlot.cinema
                ).seats;
            setSeats(foundSeats);
        }
    }, [selectedDate, selectedTimeSlot, scheduleData]);

    // Nhóm các ghế theo hàng
    const seatsByRow = {};
    seats.forEach((seat) => {
        const { row } = seat;
        if (!seatsByRow[row]) {
            seatsByRow[row] = [];
        }
        seatsByRow[row].push(seat);
    });

    // Xử lý việc chọn ghế
    const handleSeatSelect = (seat) => {
        // Kiểm tra nếu ghế đã có trạng thái 'reserved' thì không cho phép chọn
        if (seat.status === 'reserved') {
            return;
        }
        onSeatSelect(seat);
    };

    if (!selectedDate || !selectedTimeSlot) {
        return <div>Vui lòng chọn ngày và khung giờ trước khi chọn ghế.</div>;
    }

    return (
        <div className='selector-seat'>
            <h2>Chọn ghế ngồi:</h2>
            <p>
                Khung giờ: {selectedTimeSlot.time} - Rạp chiếu:{' '}
                {selectedTimeSlot.cinema}
            </p>
            <div className="seat-selector">
                {/* Render các ghế được nhóm theo hàng */}
                {Object.keys(seatsByRow).map((row) => (
                    <div key={row} className="seat-row">
                        <ul className="seats">

                            {seatsByRow[row].map((seat, index) => (
                                <li
                                    key={index}
                                    className={`seat ${seat.status === 'available'
                                        ? 'available'
                                        : seat.status === 'reserved'
                                            ? 'reserved'
                                            : 'selected'
                                        } ${selectedSeats.find((s) => s.id === seat.id)
                                            ? 'selected'
                                            : ''
                                        }`}
                                    onClick={() => handleSeatSelect(seat)}
                                >
                                    <FontAwesomeIcon icon={faCouch} />
                                    {`${seat.row}${seat.seatNumber}`}{' '}
                                    {/* Hiển thị hàng + số ghế */}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>


        </div>
    );
};

export default SeatSelector;
