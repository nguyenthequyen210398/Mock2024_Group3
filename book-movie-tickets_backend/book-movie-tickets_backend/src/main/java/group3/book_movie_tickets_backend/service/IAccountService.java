package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.entity.Account;
import group3.book_movie_tickets_backend.form.ChangePasswordForm;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IAccountService {
    List<Account> findAll();

    //Change Password
    ResponseEntity<String> changePassword(ChangePasswordForm form);

    void resetPassword(ChangePasswordForm form);

    ResponseEntity<String> sendCode(String email);

    //Change Password - End
    //authenticateCodeAndEmail - Begin
    ResponseEntity<String> authenticateCodeAndEmail(String email, String code);
}
