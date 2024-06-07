package group3.book_movie_tickets_backend.controller;

import group3.book_movie_tickets_backend
.entity.Account;
import group3.book_movie_tickets_backend
.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api")
public class AccountController {
    @Autowired
    private AccountService service ;
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


}
