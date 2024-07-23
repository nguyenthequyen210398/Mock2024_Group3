package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.MoviesTypeDto;
import group3.book_movie_tickets_backend.entity.Movie;
import group3.book_movie_tickets_backend.entity.MovieTypes;
import group3.book_movie_tickets_backend.form.MovieTypesFilterForm;
import group3.book_movie_tickets_backend.form.MoviesTypesCreateForm;
import group3.book_movie_tickets_backend.repository.IMovieRepository;
import group3.book_movie_tickets_backend.repository.IMoviesTypeRepository;
import group3.book_movie_tickets_backend.specification.MovieTypesSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieTypesService implements IMovieTypesService {


    @Autowired
    private IMoviesTypeRepository repository;
    @Autowired
    private IMovieRepository movieRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    @Transactional
    public MoviesTypeDto create(MoviesTypesCreateForm form) {
        if (form == null) {
            throw new IllegalArgumentException("Form cannot be null");
        }

        // Convert the form to MovieTypes entity
        MovieTypes movieTypes = mapper.map(form, MovieTypes.class);
        movieTypes.setMovieList(new ArrayList<>());

        // Check if the movie type already exists
        MovieTypes existingMovieTypes = repository.findByName(form.getName());
        if (existingMovieTypes != null) {
            movieTypes = existingMovieTypes; // Update the existing entity
        } else {
            repository.save(movieTypes); // Save new entity
        }

        // Get movie ID list and handle potential null
        List<Integer> movieIdList = form.getMovieIdList();
        if (movieIdList == null) {
            movieIdList = new ArrayList<>();
        }

        // Process movie IDs and associate them with the movie type
        if (!movieIdList.isEmpty()) {
            for (Integer id : movieIdList) {
                Optional<Movie> movie = movieRepository.findById(id);
                if (movie.isPresent()) {
                    movieTypes.getMovieList().add(movie.get());
                    movie.get().setType(movieTypes);
                    movieRepository.save(movie.get());
                }
            }
        } else {
            movieTypes.setMovieList(new ArrayList<>()); // Ensure an empty list is set
        }

        // Save the movie type with updated movie list
        movieTypes = repository.save(movieTypes);

        // Convert to DTO
        MoviesTypeDto moviesTypeDto = mapper.map(movieTypes, MoviesTypeDto.class);
        return moviesTypeDto;
    }

    @Override
    public Page<MoviesTypeDto> getAll(MovieTypesFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir) {
        Specification<MovieTypes> spec = MovieTypesSpecification.buildSpec(form);
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<MovieTypes> movieTypesPage = repository.findAll(spec, pageable);
        return movieTypesPage.map(movieTypes -> mapper.map(movieTypes, MoviesTypeDto.class));

    }


    @Override
    public MoviesTypeDto getById(Integer id) {
        return mapper.map(repository.findById(id).orElse(null), MoviesTypeDto.class);
    }

    @Override
    public void updateById(Integer id, MoviesTypeDto form) {
        MovieTypes movieTypes = mapper.map(form, MovieTypes.class);
        movieTypes.setId(id);
        repository.save(movieTypes);
    }


    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
