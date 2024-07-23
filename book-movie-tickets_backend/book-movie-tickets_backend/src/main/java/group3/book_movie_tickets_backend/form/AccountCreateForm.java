package group3.book_movie_tickets_backend.form;

import group3.book_movie_tickets_backend.entity.Account;
import jakarta.persistence.Column;
import lombok.Data;

@Data

public class AccountCreateForm {

    private String email;

    private String password;

    private String fullname;

    private String role;


}
