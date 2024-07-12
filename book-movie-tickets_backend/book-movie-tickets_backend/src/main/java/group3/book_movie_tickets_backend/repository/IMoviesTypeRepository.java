package group3.book_movie_tickets_backend.repository;

import group3.book_movie_tickets_backend.entity.MovieTypes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMoviesTypeRepository extends JpaRepository<MovieTypes, Integer> {
    Page<MovieTypes> findAll(Specification<MovieTypes> spec, Pageable pageable);

    MovieTypes findByName(String name);
}
