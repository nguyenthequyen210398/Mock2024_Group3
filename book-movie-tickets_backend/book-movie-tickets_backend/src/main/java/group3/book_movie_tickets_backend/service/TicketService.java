package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.TicketDto;
import group3.book_movie_tickets_backend.entity.Ticket;
import group3.book_movie_tickets_backend.repository.ITicketRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class TicketService implements ITicketService {
    @Autowired
    private ITicketRepository repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    @Transactional
    public void create(TicketDto form) {
        Ticket emp = mapper.map(form, Ticket.class);
        repository.save(emp);
    }

    @Override
    public Page<TicketDto> getAll(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Ticket> TicketPage = repository.findAll(pageable);
        return TicketPage.map(Ticket -> mapper.map(Ticket, TicketDto.class));
    }

    @Override
    public TicketDto getById(Integer id) {
        return mapper.map(repository.findById(id).orElse(null), TicketDto.class);
    }

    @Override
    public void updateById(Integer id, TicketDto form) {
        Ticket Ticket = mapper.map(form, Ticket.class);
        Ticket.setId(id);
        repository.save(Ticket);
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
