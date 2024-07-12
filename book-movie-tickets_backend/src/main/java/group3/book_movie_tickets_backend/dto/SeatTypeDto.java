package group3.book_movie_tickets_backend.dto;

import lombok.Data;

@Data
public class SeatTypeDto {
    private  Integer id;
    private String name;
    private double price;
}
