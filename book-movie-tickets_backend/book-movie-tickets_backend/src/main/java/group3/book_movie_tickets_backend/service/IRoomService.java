package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.RoomDto;
import group3.book_movie_tickets_backend.form.RoomFilterForm;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;

public interface IRoomService {
    @Transactional
    void create(RoomDto form);

    Page<RoomDto> getAll(RoomFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir);

    RoomDto getById(Integer id);

    void updateById(Integer id, RoomDto form);

    void deleteById(Integer id);
}
