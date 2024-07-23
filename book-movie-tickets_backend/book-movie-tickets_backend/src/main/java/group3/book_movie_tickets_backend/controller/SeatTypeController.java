package group3.book_movie_tickets_backend.controller;

import group3.book_movie_tickets_backend.dto.SeatTypeDto;
import group3.book_movie_tickets_backend.dto.ShowtimeDto;
import group3.book_movie_tickets_backend.form.SeatTypeCreateForm;
import group3.book_movie_tickets_backend.form.SeatTypeFilterForm;
import group3.book_movie_tickets_backend.form.ShowtimeFilterForm;
import group3.book_movie_tickets_backend.service.SeatTypeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/seatTypes")
public class SeatTypeController {
    @Autowired
    private SeatTypeService service;


    @GetMapping
    public Page<SeatTypeDto> findAll(
            SeatTypeFilterForm form,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        return service.getAll(form, pageNo, pageSize, sortBy, sortDir);
    }

    @GetMapping("/{id}")
    public SeatTypeDto findById(@PathVariable("id") Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public void create(@RequestBody @Valid SeatTypeCreateForm form) {
        service.create(form);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable("id") Integer id, @RequestBody @Valid SeatTypeDto form) {
        service.updateById(id, form);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        service.deleteById(id);
    }
}
