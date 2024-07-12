import React, { useState } from 'react';
// import DateTimeSlotSelector from './DateTimeSlotSelector';
// import SeatSelector from './SeatSelector';
// import Confirmation from './Confirmation';
// import { scheduleData } from './scheduleData'; // Import dữ liệu lịch chiếu từ file scheduleData

import { scheduleData } from "../../api/dataTest";
import DateTimeSlotSelector from "../../components/movie/DateTimeSlotSelector";
import Confirmation from "./Confirmation";
import SeatSelector from '../../components/seat/SeatSelector';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { useParams } from 'react-router-dom';
import { useGetListDataAPI } from '../../api/cinemaApi';


const TicketPurchase = () => {
    const { id } = useParams();
    const [movie, setMovie] = useGetListDataAPI(`http://localhost:8080/api/v1/movies/get-by-id/${id}`);

    const [selectedDate, setSelectedDate] = useState(null); // Ngày chiếu được chọn
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Khung giờ chiếu được chọn
    const [selectedSeats, setSelectedSeats] = useState([]); // Danh sách ghế đã chọn

    const handleDateTimeSlotSelect = (date, timeSlot) => {
        setSelectedDate(date);
        setSelectedTimeSlot(timeSlot);
        setSelectedSeats([]); // Reset danh sách ghế khi chọn ngày hoặc khung giờ mới
    };

    const handleSeatSelect = (seat) => {
        const isSelected = selectedSeats.find((s) => s.id === seat.id);
        if (isSelected) {
            setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    return (
        <>
            <Header />
            <div >
                <h1>Đặt vé xem phim: {movie.title}</h1>
                <DateTimeSlotSelector
                    scheduleData={scheduleData}
                    onDateTimeSlotSelect={handleDateTimeSlotSelect}
                />

                {selectedDate && selectedTimeSlot && (
                    <SeatSelector
                        scheduleData={scheduleData}
                        selectedDate={selectedDate}
                        selectedTimeSlot={selectedTimeSlot}
                        selectedSeats={selectedSeats}
                        onSeatSelect={handleSeatSelect}
                    />
                )}

                {selectedDate && selectedTimeSlot && selectedSeats.length > 0 && (
                    <Confirmation
                        selectedDate={selectedDate}
                        selectedTimeSlot={selectedTimeSlot}
                        selectedSeats={selectedSeats}
                    />
                )}
            </div>

            <Footer />


        </>
    );
};





export default TicketPurchase;
