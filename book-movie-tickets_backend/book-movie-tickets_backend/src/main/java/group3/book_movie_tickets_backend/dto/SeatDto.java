package group3.book_movie_tickets_backend.dto;

import group3.book_movie_tickets_backend.entity.Room;
import group3.book_movie_tickets_backend.entity.SeatType;

public class SeatDto {
    private Integer id;

    private Room room;

    private String row;

    private int col;
    private SeatType type;
}
