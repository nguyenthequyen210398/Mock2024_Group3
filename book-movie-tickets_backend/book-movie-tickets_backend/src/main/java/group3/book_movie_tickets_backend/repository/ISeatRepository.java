package group3.book_movie_tickets_backend.repository;

import group3.book_movie_tickets_backend.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ISeatRepository extends JpaRepository<Seat, Integer> {
    @Query(value = "SELECT * FROM ticket_booking.seats where id = :seatId",nativeQuery = true)
    Seat getSeatBySeatId(Integer seatId);
}
