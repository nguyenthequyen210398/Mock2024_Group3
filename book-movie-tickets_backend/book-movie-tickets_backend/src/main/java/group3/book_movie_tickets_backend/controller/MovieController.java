package group3.book_movie_tickets_backend.controller;

import group3.book_movie_tickets_backend.entity.Movie;
import group3.book_movie_tickets_backend.service.IMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/movies")
public class MovieController {
    @Autowired
    private IMovieService iMovieService;

    @GetMapping()
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(iMovieService.getAll());
    }

    @GetMapping(value = "/{id}")
    public Movie findById(@PathVariable("id") Integer id) {
        return iMovieService.findById(id);
    }

    @PostMapping
    public void create(@RequestBody Movie form) {
        iMovieService.create(form);
    }


    @PutMapping("/{id}")
    public void update(@PathVariable("id") Integer id, @RequestBody Movie form) {
        iMovieService.updateById(id, form);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        iMovieService.deleteById(id);
    }
}
