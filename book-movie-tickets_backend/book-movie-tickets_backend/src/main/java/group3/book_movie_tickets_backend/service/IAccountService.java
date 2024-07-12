package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.entity.Account;
import group3.book_movie_tickets_backend.form.ChangePasswordForm;
import group3.book_movie_tickets_backend.dto.AccountDto;
import group3.book_movie_tickets_backend.dto.MovieDto;
import group3.book_movie_tickets_backend
.entity.Account;
import group3.book_movie_tickets_backend.form.*;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
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
    @Transactional
    void create(AccountCreateForm form);

    Page<AccountDto> getAll(AccountFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir);

    AccountDto getById(Integer id);

    void updateById(Integer id, AccountDto form);

    void deleteById(Integer id);
}
