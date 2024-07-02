package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.RoomDto;
import group3.book_movie_tickets_backend.entity.Room;
import group3.book_movie_tickets_backend.form.RoomFilterForm;
import group3.book_movie_tickets_backend.repository.IRoomRepository;
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

@Service
public class RoomService implements IRoomService {
    @Autowired
    private IRoomRepository repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    @Transactional
    public void create(RoomDto form) {
        Room emp = mapper.map(form, Room.class);
        repository.save(emp);
    }

    @Override
    public Page<RoomDto> getAll(RoomFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir) {
        Specification<Room> spec = RoomSpecification.buildSpec(form);
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Room> roomPage = repository.findAll(spec, pageable);
        return roomPage.map(Room -> mapper.map(Room, RoomDto.class));
    }

    @Override
    public RoomDto getById(Integer id) {
        return mapper.map(repository.findById(id).orElse(null), RoomDto.class);
    }

    @Override
    public void updateById(Integer id, RoomDto form) {
        Room room = mapper.map(form, Room.class);
        room.setId(id);
        repository.save(room);
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
