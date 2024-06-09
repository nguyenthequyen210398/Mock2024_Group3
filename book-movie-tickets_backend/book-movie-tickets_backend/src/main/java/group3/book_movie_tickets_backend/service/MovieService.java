package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.entity.Movie;
import group3.book_movie_tickets_backend.repository.IMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService implements IMovieService {
    @Autowired
    private IMovieRepository iMovieRepository;

    @Override
    public void create(Movie movie) {
        iMovieRepository.save(movie);
    }

    @Override
    public List<Movie> getAll() {
        return iMovieRepository.findAll();
    }

    @Override
    public Movie findById(Integer id) {
        return iMovieRepository.findById(id).orElse(null);
    }

    @Override
    public void updateById(Integer id, Movie movie) {
        movie.setId(id);
        iMovieRepository.save(movie);
    }

    @Override
    public void deleteById(Integer id) {
        Movie movie = findById(id);
        iMovieRepository.delete(movie);
    }


}
