package group3.book_movie_tickets_backend.controller;

import group3.book_movie_tickets_backend.dto.SeatDto;
import group3.book_movie_tickets_backend.service.ISeatService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/seats")
public class SeatController {
    @Autowired
    private ISeatService service;

    @GetMapping()
    public Page<SeatDto> findAll(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        Page<SeatDto> list = service.getAll(pageNo, pageSize, sortBy, sortDir);
        return list;
    }

    @GetMapping(value = "/{id}")
    public SeatDto findById(@PathVariable("id") Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public void create(@RequestBody @Valid SeatDto form) {
        service.create(form);
    }


    @PutMapping("/{id}")
    public void update(@PathVariable("id") Integer id, @RequestBody @Valid SeatDto form) {
        service.updateById(id, form);
    }
    @PutMapping("/updateStatus")
    public String update(@RequestBody SeatDto form) {
       return service.updateStatus(form);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        service.deleteById(id);
    }
}
