package group3.book_movie_tickets_backend.controller;

import group3.book_movie_tickets_backend.dto.AccountDto;
import group3.book_movie_tickets_backend
        .entity.Account;
import group3.book_movie_tickets_backend.form.AccountCreateForm;
import group3.book_movie_tickets_backend
        .service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/accounts")
public class AccountController {
    @Autowired
    private AccountService service;

    @GetMapping("/accounts")
    public ResponseEntity<Account> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Account currentAccount = (Account) authentication.getPrincipal();

        return ResponseEntity.ok(currentAccount);
    }

    @GetMapping
    public ResponseEntity<List<Account>> allUsers() {
        List<Account> users = service.findAll();

        return ResponseEntity.ok(users);
    }

    @GetMapping(value = "/{id}")
    public AccountDto findById(@PathVariable("id") Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public void create(@RequestBody @Valid AccountCreateForm form) {
        service.create(form);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable("id") Integer id, @RequestBody @Valid AccountDto form) {
        service.updateById(id, form);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        service.deleteById(id);
    }
}






