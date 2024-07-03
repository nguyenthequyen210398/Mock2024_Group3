package group3.book_movie_tickets_backend.controller;

import group3.book_movie_tickets_backend.configuration.JwtService;
import group3.book_movie_tickets_backend.dto.EmailAndCode;
import group3.book_movie_tickets_backend.dto.LoginResponse;
import group3.book_movie_tickets_backend.dto.LoginUserDto;
import group3.book_movie_tickets_backend.dto.RegisterUserDto;
import group3.book_movie_tickets_backend.entity.Account;
import group3.book_movie_tickets_backend.form.ChangePasswordForm;
import group3.book_movie_tickets_backend.service.AuthenticationService;
import group3.book_movie_tickets_backend.service.IAccountService;
import group3.book_movie_tickets_backend.service.IAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    @Autowired
    private IAccountService service;
    private final JwtService jwtService;
    @Autowired
    private final IAuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> register(@RequestBody RegisterUserDto registerUserDto) {
        return authenticationService.signup(registerUserDto);
    }

    @PostMapping("/signin")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        Account authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());


        return ResponseEntity.ok(loginResponse);
    }

    //Change Password - Begin
    @GetMapping("/change-password/send-code/{email}")
    public ResponseEntity<String> sendCode(@PathVariable("email") String email) {
        return service.sendCode(email);
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordForm form) {
        try {
            service.changePassword(form);
            return ResponseEntity.ok("Change Password successful!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ChangePasswordForm form) {
        try {
            service.changePassword(form);
            return ResponseEntity.ok("Change Password successful!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/auth-code-email")
    public ResponseEntity<String> authenticateCodeAndEmail(@RequestBody EmailAndCode request) {
        return service.authenticateCodeAndEmail(request.getEmail(), request.getCode());
    }
    //Change Password - End
}
