package group3.book_movie_tickets_backend.form;


import group3.book_movie_tickets_backend
.validation.UsernameNotExist;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EmployeeCreateForm {
    @NotBlank
    private String fullName ;
    @NotBlank
    @UsernameNotExist
    private String username ;
    @NotBlank
    private String password ;
    private String address ;
    @Min(15)
    @Max(100)
    private int age ;
}
