package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.entity.Ticket;
import group3.book_movie_tickets_backend.repository.ITicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService implements ITicketService {
    @Autowired
    private ITicketRepository iTicketRepository;

    @Override
    public void create(Ticket ticket) {
        iTicketRepository.save(ticket);
    }

    @Override
    public List<Ticket> getAll() {
        return iTicketRepository.findAll();
    }

    @Override
    public Ticket findById(Integer id) {
        return iTicketRepository.findById(id).orElse(null);
    }

    @Override
    public void updateById(Integer id, Ticket ticket) {
        ticket.setId(id);
        iTicketRepository.save(ticket);
    }

    @Override
    public void deleteById(Integer id) {
        Ticket ticket = findById(id);
        iTicketRepository.delete(ticket);
    }
}
