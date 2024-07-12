package group3.book_movie_tickets_backend.controller;

import group3.book_movie_tickets_backend.dto.UserDetailDto;
import group3.book_movie_tickets_backend.form.UserDetailFilterForm;
import group3.book_movie_tickets_backend.service.UserDetailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/userDetails")
public class UserDetailController {
    @Autowired
    private UserDetailService service;

    @GetMapping()
    public Page<UserDetailDto> findAll(UserDetailFilterForm form, @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo, @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize, @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy, @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        Page<UserDetailDto> list = service.getAll(form, pageNo, pageSize, sortBy, sortDir);
        return list;
    }


    @GetMapping(value = "/{id}")
    public UserDetailDto findById(@PathVariable("id") Integer id) {
        return service.getById(id);

    }

    @PostMapping
    public void create(@RequestBody @Valid UserDetailDto form) {
        service.create(form);
    }


    @PutMapping("/{id}")
    public void update(@PathVariable("id") Integer id, @RequestBody @Valid UserDetailDto form) {
        service.updateById(id, form);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        service.deleteById(id);
    }
}
