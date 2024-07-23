package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.SeatDto;
import group3.book_movie_tickets_backend.entity.Room;
import group3.book_movie_tickets_backend.entity.Seat;
import group3.book_movie_tickets_backend.entity.SeatType;
import group3.book_movie_tickets_backend.form.SeatCreateForm;
import group3.book_movie_tickets_backend.repository.IRoomRepository;
import group3.book_movie_tickets_backend.repository.ISeatRepository;
import group3.book_movie_tickets_backend.repository.ISeatTypeRepository;
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
    private IRoomRepository roomRepository;
    @Autowired
    private ISeatTypeRepository seatTypeRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    @Transactional
    public void create(SeatCreateForm form) {
        Seat seat = mapper.map(form, Seat.class);
        seat.setRoom(roomRepository.findById(form.getRoom()).get());
        seat.setType(seatTypeRepository.findById(form.getType()).get());
        repository.save(seat);
    }
    @Override
    public Page<SeatDto> getAll(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<Seat> seatPage = repository.findAll(pageable);
        return seatPage.map(seat -> {
            SeatDto dto = mapper.map(seat, SeatDto.class);
            dto.setRoomId(seat.getRoom().getId()); // Set room ID
            dto.setRoomNumber(seat.getRoom().getNumber()); // Set room number
            dto.setTypeId(seat.getType().getId()); // Set seat type ID
            dto.setTypeName(seat.getType().getName()); // Set seat type name
            return dto;
        });
    }

    @Override
    public SeatDto getById(Integer id) {
        var seat = repository.findById(id);
        return seat.map(s -> {
            SeatDto dto = mapper.map(s, SeatDto.class);
            dto.setRoomId(s.getRoom().getId()); // Set room ID
            dto.setRoomNumber(s.getRoom().getNumber()); // Set room number
            dto.setTypeId(s.getType().getId()); // Set seat type ID
            dto.setTypeName(s.getType().getName()); // Set seat type name
            return dto;
        }).orElse(null);
    }

    @Override
    public void updateById(Integer id, SeatDto form) {
        // Find the existing seat by ID
        Seat existingSeat = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Seat not found with ID: " + id));

        // Map the form to the seat entity
        Seat seat = mapper.map(form, Seat.class);
        seat.setId(id);

        // Fetch the new Room and SeatType
        Room room = roomRepository.findById(form.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Room not found with ID: " + form.getRoomId()));
        SeatType seatType = seatTypeRepository.findById(form.getTypeId())
                .orElseThrow(() -> new IllegalArgumentException("SeatType not found with ID: " + form.getTypeId()));

        // Remove the seat from the old Room and SeatType if they exist
        if (existingSeat.getRoom() != null) {
            existingSeat.getRoom().getSeat().remove(existingSeat);
        }
        if (existingSeat.getType() != null) {
            existingSeat.getType().getSeats().remove(existingSeat);
        }

        // Set the new Room and SeatType
        seat.setRoom(room);
        seat.setType(seatType);

        // Add the seat to the new Room and SeatType
        room.getSeat().add(seat);
        seatType.getSeats().add(seat);

        // Save the updated seat
        repository.save(seat);

        // Optionally, save the updated Room and SeatType if needed
        roomRepository.save(room);
        seatTypeRepository.save(seatType);
    }


    @Override
    public void deleteById(Integer id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Seat not found");
        }
        repository.deleteById(id);
    }
}
