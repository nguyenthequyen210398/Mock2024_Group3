package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.MoviesTypeDto;
import group3.book_movie_tickets_backend.dto.TicketDto;
import group3.book_movie_tickets_backend.dto.UserDetailDto;
import group3.book_movie_tickets_backend.form.MovieTypesFilterForm;
import group3.book_movie_tickets_backend.form.UserDetailFilterForm;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;

public interface IUserDetailService {
    @Transactional
    void create(UserDetailDto form);

    Page<UserDetailDto> getAll(UserDetailFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir);

    UserDetailDto getById(Integer id);

    void updateById(Integer id, UserDetailDto form);

    void deleteById(Integer id);
}
