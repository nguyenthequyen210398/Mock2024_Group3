package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.SeatDto;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;

public interface ISeatService {
    @Transactional
    void create(SeatDto form);


    Page<SeatDto> getAll(int pageNo, int pageSize, String sortBy, String sortDir);

    SeatDto getById(Integer id);

    void updateById(Integer id, SeatDto form);

    void deleteById(Integer id);

    String updateStatus(SeatDto form);
}
