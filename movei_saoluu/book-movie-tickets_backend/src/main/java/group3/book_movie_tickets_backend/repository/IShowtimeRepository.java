package group3.book_movie_tickets_backend.repository;

import group3.book_movie_tickets_backend.entity.Showtimes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IShowtimeRepository  extends JpaRepository<Showtimes,Integer> {
    Page<Showtimes> findAll(Specification<Showtimes> spec, Pageable pageable);
}
