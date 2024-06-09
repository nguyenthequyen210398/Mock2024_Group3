package group3.book_movie_tickets_backend.repository;

import group3.book_movie_tickets_backend.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITicketRepository extends JpaRepository<Ticket, Integer> {
}
