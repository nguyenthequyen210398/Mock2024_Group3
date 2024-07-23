package group3.book_movie_tickets_backend.controller;

import group3.book_movie_tickets_backend.dto.MoviesTypeDto;
import group3.book_movie_tickets_backend.form.MovieTypesFilterForm;
import group3.book_movie_tickets_backend.form.MoviesTypesCreateForm;
import group3.book_movie_tickets_backend.service.IMovieTypesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/movieTypes")
public class MovieTypesController {
@Autowired
private IMovieTypesService service;



 @GetMapping()
    public Page<MoviesTypeDto> findAll(
            MovieTypesFilterForm form,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        Page<MoviesTypeDto> list = service.getAll(form, pageNo, pageSize, sortBy, sortDir);
        return list;
    }

    @GetMapping(value = "/{id}")
    public MoviesTypeDto findById(@PathVariable("id") Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<MoviesTypeDto> create(@RequestBody @Valid MoviesTypesCreateForm form) {
        MoviesTypeDto moviesTypeDto = service.create(form);
        return ResponseEntity.ok(moviesTypeDto);
    }


    @PutMapping("/{id}")
    public void update(@PathVariable("id") Integer id, @RequestBody @Valid MoviesTypeDto form) {
        service.updateById(id, form);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        service.deleteById(id);
    }
}
