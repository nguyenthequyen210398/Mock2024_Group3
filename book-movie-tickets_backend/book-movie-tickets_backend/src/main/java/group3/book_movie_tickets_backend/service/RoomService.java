package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.RoomDto;
import group3.book_movie_tickets_backend.entity.Room;
import group3.book_movie_tickets_backend.entity.Seat;
import group3.book_movie_tickets_backend.form.RoomFilterForm;
import group3.book_movie_tickets_backend.repository.IRoomRepository;
import group3.book_movie_tickets_backend.repository.ISeatRepository;
import group3.book_movie_tickets_backend.specification.RoomSpecification;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService implements IRoomService {

    @Autowired
    private IRoomRepository repository;
    @Autowired
    private ISeatRepository seatRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    @Transactional
    public void create(RoomDto form) {
        if (form == null) {
            throw new IllegalArgumentException("RoomDto must not be null");
        }
        Room room = mapper.map(form, Room.class);
        repository.save(room);
    }
    @Override
    public Page<RoomDto> getAll(RoomFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir) {
        Specification<Room> spec = RoomSpecification.buildSpec(form);
        Sort sort = Sort.Direction.ASC.name().equalsIgnoreCase(sortDir) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Room> roomPage = repository.findAll(spec, pageable);
        return roomPage.map(room -> {
            RoomDto dto = mapper.map(room, RoomDto.class);
            List<Integer> seatIds = room.getSeat().stream().map(Seat::getId).collect(Collectors.toList());
            dto.setSeatIds(seatIds);
            return dto;
        });
    }

    @Override
    public RoomDto getById(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("ID must not be null");
        }
        return repository.findById(id)
                .map(room -> {
                    RoomDto dto = mapper.map(room, RoomDto.class);
                    List<Integer> seatIds = room.getSeat().stream().map(Seat::getId).collect(Collectors.toList());
                    dto.setSeatIds(seatIds);
                    return dto;
                })
                .orElseThrow(() -> new RuntimeException("Room not found with ID: " + id));
    }

    @Override
    @Transactional
    public void updateById(Integer id, RoomDto form) {
        if (id == null || form == null) {
            throw new IllegalArgumentException("ID and RoomDto must not be null");
        }
        Room room = mapper.map(form, Room.class);
        room.setId(id);

        // Fetch seat entities from seat IDs and set them to room
        List<Seat> seats = seatRepository.findAllById(form.getSeatIds()); // Adjust according to your repository method
        room.setSeat(seats);

        repository.save(room);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("ID must not be null");
        }
        if (!repository.existsById(id)) {
            throw new RuntimeException("Room not found with ID: " + id);
        }
        repository.deleteById(id);
    }
}
