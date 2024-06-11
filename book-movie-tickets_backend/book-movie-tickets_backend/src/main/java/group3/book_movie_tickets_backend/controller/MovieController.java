package group3.book_movie_tickets_backend.controller;


import group3.book_movie_tickets_backend.dto.MovieDto;
import group3.book_movie_tickets_backend.form.MovieCreateForm;
import group3.book_movie_tickets_backend.form.MovieFilterForm;
import group3.book_movie_tickets_backend.service.IMovieService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/movies")
public class MovieController {

    @Autowired
    private IMovieService service;

    @GetMapping()
    public Page<MovieDto> findAll(
            MovieFilterForm form,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        Page<MovieDto> list = service.getAll(form, pageNo, pageSize, sortBy, sortDir);
        return list;
    }

    @GetMapping(value = "/{id}")
    public MovieDto findById(@PathVariable("id") Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public void create(@RequestBody @Valid MovieCreateForm form) {
        service.create(form);
    }


    @PutMapping("/{id}")
    public void update(@PathVariable("id") Integer id, @RequestBody @Valid MovieDto form) {
        service.updateById(id, form);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        service.deleteById(id);
    }
}
