package group3.book_movie_tickets_backend.form;

import lombok.Data;

import java.awt.*;

@Data
public class MovieCreateForm {
    private int name;
    private int year;
    private String origin;
    private int type;
    private TextArea description;
    private int created_by;
    private int updated_by;
}
