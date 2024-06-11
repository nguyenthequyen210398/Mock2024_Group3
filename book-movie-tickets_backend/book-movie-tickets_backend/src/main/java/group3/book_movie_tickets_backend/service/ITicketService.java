package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.TicketDto;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;

public interface ITicketService {
    @Transactional
    void create(TicketDto form);


    Page<TicketDto> getAll(int pageNo, int pageSize, String sortBy, String sortDir);

    TicketDto getById(Integer id);

    void updateById(Integer id, TicketDto form);

    void deleteById(Integer id);
}
