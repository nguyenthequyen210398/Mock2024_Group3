package group3.book_movie_tickets_backend.form;

import lombok.Data;

@Data
public class ChangePasswordForm {
    private String email ;
    private String password ;
    private String rePassword ;
}
