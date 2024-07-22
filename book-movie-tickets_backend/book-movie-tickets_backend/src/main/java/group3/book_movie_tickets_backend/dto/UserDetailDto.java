package group3.book_movie_tickets_backend.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class UserDetailDto {
    private Integer id;

    private String phone;

    @Column
    private int age;

    @Column
    private int gender;

    @Column
    private String avatarLink;
}
