package group3.book_movie_tickets_backend.form;

import group3.book_movie_tickets_backend.entity.Room;
import group3.book_movie_tickets_backend.entity.SeatType;
import lombok.Data;

@Data
public class SeatCreateForm {
    private Integer id;

    private Integer room;

    private String row;

    private int col;
    private Integer type;
}
