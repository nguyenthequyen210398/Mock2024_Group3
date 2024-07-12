package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.MovieDto;
import group3.book_movie_tickets_backend.entity.Movie;
import group3.book_movie_tickets_backend.form.MovieCreateForm;
import group3.book_movie_tickets_backend.form.MovieFilterForm;
import group3.book_movie_tickets_backend.repository.IMovieRepository;
import group3.book_movie_tickets_backend.specification.MovieSpecification;
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
public class MovieService implements IMovieService {
    @Autowired
    private IMovieRepository repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    @Transactional
    public void create(MovieCreateForm form) {
        Movie emp = mapper.map(form, Movie.class);
        repository.save(emp);
    }

    @Override
    public Page<MovieDto> getAll(MovieFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir) {
        Specification<Movie> spec = MovieSpecification.buildSpec(form);
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Movie> moviePage = repository.findAll(spec, pageable);
        return moviePage.map(movie -> mapper.map(movie, MovieDto.class));
    }

    @Override
    public MovieDto getById(Integer id) {
        return mapper.map(repository.findById(id).orElse(null), MovieDto.class);
    }

    @Override
    public void updateById(Integer id, MovieDto form) {
        Movie movie = mapper.map(form, Movie.class);
        movie.setId(id);
        repository.save(movie);
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<MovieDto> getAllShowing() {
        List<Movie> movies = repository.findAllByStatusIs(1); // 1 means currently showing

        List<MovieDto> movieDtos = movies.stream()
                .map(movie -> {
                    MovieDto dto = mapper.map(movie, MovieDto.class);
                    dto.setGenre("genre 1");
                    return dto;
                })
                .collect(Collectors.toList());

        return movieDtos;
    }

    @Override
    public List<MovieDto> getAllComing() {
        List<Movie> movies = repository.findAllByStatusIs(0); // 0 is coming

        List<MovieDto> movieDtos = movies.stream()
                .map(movie -> {
                    MovieDto dto = mapper.map(movie, MovieDto.class);
                    dto.setGenre("genre 1");
                    return dto;
                })
                .collect(Collectors.toList());

        return movieDtos;
    }
}
