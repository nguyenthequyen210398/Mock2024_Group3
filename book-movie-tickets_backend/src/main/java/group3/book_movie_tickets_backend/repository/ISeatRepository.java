package group3.book_movie_tickets_backend.repository;

import group3.book_movie_tickets_backend.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISeatRepository extends JpaRepository<Seat, Integer> {
}
