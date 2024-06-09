package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.entity.Seat;

import java.util.List;

public interface ISeatService {
    void create(Seat seat);

    List<Seat> getAll();

    Seat findById(Integer id);

    void updateById(Integer id, Seat seat);

    void deleteById(Integer id);
}
