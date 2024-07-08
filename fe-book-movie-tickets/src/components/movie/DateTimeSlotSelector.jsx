import React, { useState, useEffect } from 'react';
import './movie.scss';

const DateTimeSlotSelector = ({ scheduleData, onDateTimeSlotSelect }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [displayedDates, setDisplayedDates] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setDisplayedDates(getDates(currentDate, 4));

        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getDates = (startDate, numDays) => {
        const dates = [];
        let currentDate = new Date(startDate);
        for (let i = 0; i < numDays; i++) {
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTimeSlot(null);
        onDateTimeSlotSelect(date, null);

        if (!scheduleData || scheduleData.length === 0) {
            return;
        }

        const movieByDate = {};
        scheduleData.forEach((movie) => {
            movieByDate[movie.date] = movie;
        });

        const currentMovie = movieByDate[date];
        if (!currentMovie) {
            return;
        }

        const filteredTimeSlots = currentMovie.timeSlots.filter((slot) => {
            const startTime = new Date(`${date}T${slot.time}`);
            const endTime = new Date(startTime.getTime() - 40 * 60 * 1000); // Thời gian kết thúc trước 40 phút
            return endTime < new Date();
        });

        if (filteredTimeSlots.length === 0) {
            setSelectedTimeSlot(currentMovie.timeSlots[0]);
        } else {
            setSelectedTimeSlot(filteredTimeSlots[0]);
        }
    };

    const handleTimeSlotSelect = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
        onDateTimeSlotSelect(selectedDate, timeSlot);
    };

    const showPreviousDays = () => {
        const currentDisplayedDates = [...displayedDates];
        const firstDisplayedDate = currentDisplayedDates[0];
        const prevDate = new Date(firstDisplayedDate);
        prevDate.setDate(prevDate.getDate() - 1);

        const newDisplayedDates = getDates(prevDate.toISOString().split('T')[0], 4);
        setDisplayedDates(newDisplayedDates);
    };

    const showNextDays = () => {
        const currentDisplayedDates = [...displayedDates];
        const lastDisplayedDate =
            currentDisplayedDates[currentDisplayedDates.length - 1];
        const nextDate = new Date(lastDisplayedDate);
        nextDate.setDate(nextDate.getDate() + 1);

        const newDisplayedDates = getDates(nextDate.toISOString().split('T')[0], 4);
        setDisplayedDates(newDisplayedDates);
    };

    if (!scheduleData || scheduleData.length === 0) {
        return <div>Không có lịch chiếu nào.</div>;
    }

    return (
        <div>
            <h2>Chọn ngày và khung giờ chiếu:</h2>

            <div className="current-date-time">
                <p>Ngày và giờ hiện tại: {currentDateTime.toLocaleString()}</p>
            </div>

            <div className="date-selector">
                <h3>Chọn ngày chiếu:</h3>
                <ul>
                    {displayedDates.map((date, index) => {
                        const currentMovie = scheduleData.find(
                            (movie) => movie.date === date
                        );
                        const movieTitle = currentMovie
                            ? currentMovie.movieTitle
                            : 'Chưa có lịch chiếu';

                        const disabled =
                            currentMovie &&
                            currentMovie.timeSlots.every((slot) => {
                                const startTime = new Date(`${date}T${slot.time}`);
                                const endTime = new Date(startTime.getTime() - 40 * 60 * 1000); // Thời gian kết thúc trước 40 phút
                                return endTime < new Date();
                            });

                        return (
                            <li key={index}>
                                <button
                                    onClick={() => handleDateSelect(date)}
                                    disabled={disabled}
                                >
                                    {date} - {movieTitle}
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <div className="navigation">
                    <button
                        onClick={showPreviousDays}
                        disabled={
                            displayedDates[0] ===
                            getDates(new Date().toISOString().split('T')[0], 4)[0]
                        }
                    >
                        &laquo; Trước
                    </button>
                    <button onClick={showNextDays}>Sau &raquo;</button>
                </div>
            </div>

            {selectedDate && (
                <div className="time-slot-selector">
                    <h3>Chọn khung giờ chiếu ngày {selectedDate}:</h3>
                    <ul>
                        {scheduleData
                            .find((movie) => movie.date === selectedDate)
                            .timeSlots.map((slot, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handleTimeSlotSelect(slot)}
                                        disabled={
                                            new Date(`${selectedDate}T${slot.time}`) < new Date()
                                        }
                                    >
                                        {slot.time} - {slot.cinema}
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DateTimeSlotSelector;
