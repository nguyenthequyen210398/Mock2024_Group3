package group3.book_movie_tickets_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employees")
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String fullName ;

    @Column
    private String username ;

    @Column
    private String password ;

    @Column
    private String address ;

    @Column
    private int age ;

}
