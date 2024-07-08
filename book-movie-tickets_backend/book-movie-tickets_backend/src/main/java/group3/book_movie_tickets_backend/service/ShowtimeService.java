package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.MovieDto;
import group3.book_movie_tickets_backend.dto.ShowtimeDto;
import group3.book_movie_tickets_backend.entity.Movie;
import group3.book_movie_tickets_backend.entity.Showtimes;
import group3.book_movie_tickets_backend.form.ShowtimeCreateForm;
import group3.book_movie_tickets_backend.form.ShowtimeFilterForm;
import group3.book_movie_tickets_backend.repository.IShowtimeRepository;
import group3.book_movie_tickets_backend.specification.MovieSpecification;
import group3.book_movie_tickets_backend.specification.ShowtimeSpeccification;
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
public class ShowtimeService implements IShowtimeService {
    @Autowired
    private IShowtimeRepository repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    @Transactional
    public void create(ShowtimeCreateForm form) {
        Showtimes showtimes = mapper.map(form, Showtimes.class);
        repository.save(showtimes);
    }

    @Override
    public Page<ShowtimeDto> getAll(ShowtimeFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir) {

        Specification<Showtimes> spec = ShowtimeSpeccification.buildSpec(form);
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Showtimes> showtimesPage=repository.findAll(spec,pageable);
        return  showtimesPage.map(showtimes -> mapper.map(showtimes, ShowtimeDto.class));

    }

    @Override
    public ShowtimeDto getById(Integer id) {
        return mapper.map(repository.findById(id).orElse(null), ShowtimeDto.class);
    }

    @Override
    public void updateById(Integer id, ShowtimeDto form) {
        Showtimes showtimes = mapper.map(form, Showtimes.class);
        showtimes.setId(id);
        repository.save(showtimes);
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
