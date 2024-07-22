package group3.book_movie_tickets_backend.dto;

import group3.book_movie_tickets_backend.entity.Seat;
import lombok.Data;

import java.util.List;

@Data
public class RoomDto {
    private Integer id;

    private int number;

    private List<Seat> seat;
}
