// scheduleData.js
export const scheduleData = [
  {
    date: '2024-07-01',
    movieTitle: 'Avengers: Endgame',
    timeSlots: [
      { time: '00:00', cinema: 'Cinema A', seats: generateSeats() },
      { time: '13:30', cinema: 'Cinema B', seats: generateSeats() },
      { time: '18:00', cinema: 'Cinema C', seats: generateSeats() },
    ],
  },
  {
    date: '2024-07-07',
    movieTitle: 'Avengers: Endgame',
    timeSlots: [
      { time: '09:00', cinema: 'Cinema A', seats: generateSeats() },
      { time: '13:30', cinema: 'Cinema B', seats: generateSeats() },
      { time: '18:00', cinema: 'Cinema C', seats: generateSeats() },
    ],
  },
  {
    date: '2024-07-08',
    movieTitle: 'Avengers: Endgame',
    timeSlots: [
      { time: '00:03', cinema: 'Cinema A', seats: generateSeats() },
      { time: '13:30', cinema: 'Cinema B', seats: generateSeats() },
      { time: '18:00', cinema: 'Cinema C', seats: generateSeats() },
    ],
  },
  {
    date: '2024-07-09',
    movieTitle: 'Avengers: Endgame',
    timeSlots: [
      { time: '09:00', cinema: 'Cinema A', seats: generateSeats() },
      { time: '13:30', cinema: 'Cinema B', seats: generateSeats() },
      { time: '18:00', cinema: 'Cinema C', seats: generateSeats() },
    ],
  },
  {
    date: '2024-07-10',
    movieTitle: 'Avengers: Endgame',
    timeSlots: [
      { time: '09:00', cinema: 'Cinema A', seats: generateSeats() },
      { time: '13:30', cinema: 'Cinema B', seats: generateSeats() },
      { time: '18:00', cinema: 'Cinema C', seats: generateSeats() },
    ],
  },
  {
    date: '2024-07-11',
    movieTitle: 'Avengers: Endgame',
    timeSlots: [
      { time: '09:00', cinema: 'Cinema A', seats: generateSeats() },
      { time: '13:30', cinema: 'Cinema B', seats: generateSeats() },
      { time: '18:00', cinema: 'Cinema C', seats: generateSeats() },
    ],
  },
  {
    date: '2024-07-12',
    movieTitle: 'Avengers: Endgame',
    timeSlots: [
      { time: '09:00', cinema: 'Cinema A', seats: generateSeats() },
      { time: '13:30', cinema: 'Cinema B', seats: generateSeats() },
      { time: '18:00', cinema: 'Cinema C', seats: generateSeats() },
    ],
  },
  {
    date: '2024-07-13',
    movieTitle: 'Avengers: Endgame',
    timeSlots: [
      { time: '09:00', cinema: 'Cinema A', seats: generateSeats() },
      { time: '13:30', cinema: 'Cinema B', seats: generateSeats() },
      { time: '18:00', cinema: 'Cinema C', seats: generateSeats() },
    ],
  },
  {
    date: '2024-07-14',
    movieTitle: 'Avengers: Endgame',
    timeSlots: [
      { time: '09:00', cinema: 'Cinema A', seats: generateSeats() },
      { time: '13:30', cinema: 'Cinema B', seats: generateSeats() },
      { time: '18:00', cinema: 'Cinema C', seats: generateSeats() },
    ],
  },
  {
    date: '2024-07-15',
    movieTitle: 'Avengers: Endgame',
    timeSlots: [
      { time: '09:00', cinema: 'Cinema A', seats: generateSeats() },
      { time: '13:30', cinema: 'Cinema B', seats: generateSeats() },
      { time: '18:00', cinema: 'Cinema C', seats: generateSeats() },
    ],
  },
  // Các entry khác của lịch chiếu
];

function generateSeats() {
  const seats = [];
  const statuses = ['available', 'reserved'];

  for (let i = 1; i <= 150; i++) {
    const randomStatusIndex = Math.floor(Math.random() * statuses.length);
    const status = statuses[randomStatusIndex];

    seats.push({
      id: i,
      row: String.fromCharCode(65 + Math.floor((i - 1) / 15)),
      seatNumber: ((i - 1) % 15) + 1,
      status: status,
    });
  }

  return seats;
}
