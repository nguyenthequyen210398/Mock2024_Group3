package group3.book_movie_tickets_backend.repository;

import group3.book_movie_tickets_backend.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ITicketRepository extends JpaRepository<Ticket, Integer>, JpaSpecificationExecutor<Ticket> {
}
