package group3.book_movie_tickets_backend.controller;
import group3.book_movie_tickets_backend.dto.ShowtimeDto;
import group3.book_movie_tickets_backend.form.ShowtimeCreateForm;
import group3.book_movie_tickets_backend.form.ShowtimeFilterForm;
import group3.book_movie_tickets_backend.service.ShowtimeService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/showtimes")
public class ShowtimeController {
    @Autowired
    private ShowtimeService showtimeService;
    @GetMapping()
    public Page<ShowtimeDto> findAll(
            ShowtimeFilterForm form,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        Page<ShowtimeDto> list =showtimeService.getAll(form,pageNo,pageSize,sortBy,sortDir);
        return list;
    }


    @GetMapping(value = "/{id}")
    public ShowtimeDto findById(@PathVariable("id") Integer id) {
        return  showtimeService.getById(id);

    }

    @PostMapping
    public void create(@RequestBody @Valid ShowtimeCreateForm form) {
        showtimeService.create(form);
    }


    @PutMapping("/{id}")
    public void update(@PathVariable("id") Integer id, @RequestBody @Valid ShowtimeDto form) {
        showtimeService.updateById(id, form);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        showtimeService.deleteById(id);
    }

}
