package group3.book_movie_tickets_backend.form;

import lombok.Data;

@Data
public class EmployeeUpdateForm {
    private Long id;
    private String fullName ;
    private String username ;
    private String password ;
    private String address ;
    private int age ;
}
