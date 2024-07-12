package group3.book_movie_tickets_backend.form;

import lombok.Data;

@Data

public class UserDetailCreateForm {
    private String phone;


    private int age;


    private int gender;


    private String avatarLink;
}
