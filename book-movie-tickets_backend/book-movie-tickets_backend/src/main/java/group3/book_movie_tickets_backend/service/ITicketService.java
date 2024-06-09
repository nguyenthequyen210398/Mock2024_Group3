package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.entity.Ticket;

import java.util.List;

public interface ITicketService {
    void create(Ticket ticket);

    List<Ticket> getAll();

    Ticket findById(Integer id);

    void updateById(Integer id, Ticket ticket);

    void deleteById(Integer id);
}
