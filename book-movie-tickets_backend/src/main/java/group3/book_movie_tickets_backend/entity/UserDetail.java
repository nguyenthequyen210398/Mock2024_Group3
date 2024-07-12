package group3.book_movie_tickets_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_details")
@Data
public class UserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String phone;

    @Column
    private int age;

    @Column
    private int gender;

    @Column
    private String avatarLink;

    @OneToOne(mappedBy = "userDetail")
    private Account account;
}
