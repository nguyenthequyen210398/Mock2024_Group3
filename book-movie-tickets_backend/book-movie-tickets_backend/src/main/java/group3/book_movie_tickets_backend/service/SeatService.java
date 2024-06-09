package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.entity.Seat;
import group3.book_movie_tickets_backend.repository.ISeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService implements ISeatService {
    @Autowired
    private ISeatRepository repository;

    @Override
    public void create(Seat seat) {
        repository.save(seat);
    }

    @Override
    public List<Seat> getAll() {
        return repository.findAll();
    }

    @Override
    public Seat findById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void updateById(Integer id, Seat seat) {
        seat.setId(id);
        repository.save(seat);
    }

    @Override
    public void deleteById(Integer id) {
        Seat seat = findById(id);
        repository.delete(seat);
    }
}
