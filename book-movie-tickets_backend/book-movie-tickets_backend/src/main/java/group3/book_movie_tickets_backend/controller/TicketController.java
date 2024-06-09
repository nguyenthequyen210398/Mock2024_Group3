package group3.book_movie_tickets_backend.controller;

import group3.book_movie_tickets_backend.entity.Ticket;
import group3.book_movie_tickets_backend.service.ITicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/tickets")
public class TicketController {
    @Autowired
    private ITicketService service;

    @GetMapping()
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(service.getAll());
    }

    @GetMapping(value = "/{id}")
    public Ticket findById(@PathVariable("id") Integer id) {
        return service.findById(id);
    }

    @PostMapping
    public void create(@RequestBody Ticket form) {
        service.create(form);
    }


    @PutMapping("/{id}")
    public void update(@PathVariable("id") Integer id, @RequestBody Ticket form) {
        service.updateById(id, form);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        service.deleteById(id);
    }
}
