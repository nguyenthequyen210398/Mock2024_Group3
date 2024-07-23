package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.MovieDto;
import group3.book_movie_tickets_backend.dto.MoviesTypeDto;
import group3.book_movie_tickets_backend.form.MovieFilterForm;
import group3.book_movie_tickets_backend.form.MovieTypesFilterForm;
import group3.book_movie_tickets_backend.form.MoviesTypesCreateForm;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;

public interface IMovieTypesService {

    @Transactional
    public MoviesTypeDto create(MoviesTypesCreateForm form) ;

    Page<MoviesTypeDto> getAll(MovieTypesFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir);

    MoviesTypeDto getById(Integer id);

    void updateById(Integer id, MoviesTypeDto form);

    void deleteById(Integer id);
}
