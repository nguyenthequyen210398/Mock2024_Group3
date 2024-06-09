package group3.book_movie_tickets_backend.repository;

import group3.book_movie_tickets_backend.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMovieRepository extends JpaRepository<Movie, Integer> {
}
