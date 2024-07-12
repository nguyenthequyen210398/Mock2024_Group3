package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.MovieDto;
import group3.book_movie_tickets_backend.dto.ShowtimeDto;
import group3.book_movie_tickets_backend.form.MovieFilterForm;
import group3.book_movie_tickets_backend.form.ShowtimeCreateForm;
import group3.book_movie_tickets_backend.form.ShowtimeFilterForm;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;

public interface IShowtimeService {
    @Transactional
    void create(ShowtimeCreateForm form);

    Page<ShowtimeDto> getAll(ShowtimeFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir);

    ShowtimeDto getById(Integer id);

    void updateById(Integer id, ShowtimeDto form);

    void deleteById(Integer id);
}
