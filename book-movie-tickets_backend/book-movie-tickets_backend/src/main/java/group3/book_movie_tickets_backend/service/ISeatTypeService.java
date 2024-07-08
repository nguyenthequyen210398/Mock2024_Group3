package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.SeatTypeDto;

import group3.book_movie_tickets_backend.form.SeatTypeCreateForm;
import group3.book_movie_tickets_backend.form.SeatTypeFilterForm;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;

public interface ISeatTypeService {
    @Transactional
    void create(SeatTypeCreateForm form);

    Page<SeatTypeDto> getAll(SeatTypeFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir);

    SeatTypeDto getById(Integer id);

    void updateById(Integer id, SeatTypeDto form);

    void deleteById(Integer id);
}
