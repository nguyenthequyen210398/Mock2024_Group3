package group3.book_movie_tickets_backend.dto;

import group3.book_movie_tickets_backend.entity.Booking;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TicketDto {
    private Integer Id;
    private int order_id;
    private int movie_id;
    private int seat_id;
    private int room_id;
    private double price;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int created_by;
    private int updated_by;
    private Booking booking;
}
