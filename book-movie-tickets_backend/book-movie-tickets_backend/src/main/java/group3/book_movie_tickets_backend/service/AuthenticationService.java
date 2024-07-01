package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.LoginUserDto;
import group3.book_movie_tickets_backend.dto.RegisterUserDto;
import group3.book_movie_tickets_backend.entity.Account;
import group3.book_movie_tickets_backend.repository.IAccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService implements IAuthenticationService {
    private final IAccountRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            IAccountRepository repository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public ResponseEntity<String> signup(RegisterUserDto input) {
        Account account = new Account();
        if (Boolean.TRUE.equals(repository.existsByEmail(input.getEmail()))) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Email is exist!");
        } else {
            account.setEmail(input.getEmail());
            account.setPassword(passwordEncoder.encode(input.getPassword()));
            repository.save(account);
            return ResponseEntity.ok("SignUp Successful!");
        }
    }

    @Override
    public Account authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return repository.findByEmail(input.getEmail())
                .orElseThrow();
    }
}

