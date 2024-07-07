package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.SeatDto;
import group3.book_movie_tickets_backend.entity.Seat;
import group3.book_movie_tickets_backend.repository.ISeatRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class SeatService implements ISeatService {
    @Autowired
    private ISeatRepository repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    @Transactional
    public void create(SeatDto form) {
        Seat emp = mapper.map(form, Seat.class);
        repository.save(emp);
    }

    @Override
    public Page<SeatDto> getAll(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Seat> SeatPage = repository.findAll(pageable);
        return SeatPage.map(Seat -> mapper.map(Seat, SeatDto.class));
    }

    @Override
    public SeatDto getById(Integer id) {
        return mapper.map(repository.findById(id).orElse(null), SeatDto.class);
    }

    @Override
    public void updateById(Integer id, SeatDto form) {
        Seat Seat = mapper.map(form, Seat.class);
        Seat.setId(id);
        repository.save(Seat);
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public String updateStatus(SeatDto form) {
        try{
            Seat seat = repository.getSeatBySeatId(form.getId());
            seat.setSeatStatus(form.getSeatStatus());
            repository.save(seat);
            return "Successfully";
        }catch (Exception e){
            e.printStackTrace();
            return "Unsucessfully";
        }

    }
}
