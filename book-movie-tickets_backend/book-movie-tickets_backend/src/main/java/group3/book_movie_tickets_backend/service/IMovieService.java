package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.MovieDto;
import group3.book_movie_tickets_backend.form.MovieCreateForm;
import group3.book_movie_tickets_backend.form.MovieFilterForm;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IMovieService {
    @Transactional
    void create(MovieCreateForm form);

    Page<MovieDto> getAll(MovieFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir);

    MovieDto getById(Integer id);

    void updateById(Integer id, MovieDto form);

    void deleteById(Integer id);

    List<MovieDto> getAllShowing();

    List<MovieDto> getAllComing();
}
