package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend
.dto.LoginUserDto;
import group3.book_movie_tickets_backend
.dto.RegisterUserDto;
import group3.book_movie_tickets_backend
.entity.Account;
import org.springframework.http.ResponseEntity;

public interface IAuthenticationService {
    ResponseEntity<String> signup(RegisterUserDto input);

    Account authenticate(LoginUserDto input);
}
