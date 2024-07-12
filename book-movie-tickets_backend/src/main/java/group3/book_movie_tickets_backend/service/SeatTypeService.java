package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.SeatTypeDto;
import group3.book_movie_tickets_backend.entity.SeatType;
import group3.book_movie_tickets_backend.form.SeatTypeCreateForm;
import group3.book_movie_tickets_backend.form.SeatTypeFilterForm;
import group3.book_movie_tickets_backend.repository.ISeatTypeRepository;
import group3.book_movie_tickets_backend.specification.SeatTypeSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class SeatTypeService implements ISeatTypeService {
    @Autowired
    private ISeatTypeRepository repository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public void create(SeatTypeCreateForm form) {
        SeatType seatType = mapper.map(form, SeatType.class);
        repository.save(seatType);

    }

    @Override
    public Page<SeatTypeDto> getAll(SeatTypeFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir) {

        Specification<SeatType> spec = SeatTypeSpecification.buildSpec(form);
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<SeatType> seatTypePage = repository.findAll(spec, pageable);
        return seatTypePage.map(seatType -> mapper.map(seatTypePage, SeatTypeDto.class));
    }

    @Override
    public SeatTypeDto getById(Integer id) {
        return mapper.map(repository.findById(id).orElse(null), SeatTypeDto.class);
    }

    @Override
    public void updateById(Integer id, SeatTypeDto form) {
        SeatType seatType = mapper.map(form, SeatType.class);
        seatType.setId(id);
        repository.save(seatType);
    }


    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
