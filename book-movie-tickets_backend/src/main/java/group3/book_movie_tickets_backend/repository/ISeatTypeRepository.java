package group3.book_movie_tickets_backend.repository;

import group3.book_movie_tickets_backend.entity.SeatType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISeatTypeRepository extends JpaRepository <SeatType ,Integer> {
    Page<SeatType> findAll(Specification<SeatType> spec, Pageable pageable);
}
