package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.entity.Movie;

import java.util.List;

public interface IMovieService {
    void create(Movie movie);

    List<Movie> getAll();

    Movie findById(Integer id);

    void updateById(Integer id, Movie movie);

    void deleteById(Integer id);

}
