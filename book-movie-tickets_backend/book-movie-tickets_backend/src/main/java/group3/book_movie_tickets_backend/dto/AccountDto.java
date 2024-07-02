package group3.book_movie_tickets_backend.dto;

import lombok.Data;

@Data
public class AccountDto {
    private Integer Id;
    private String email;

    private String password;
}
