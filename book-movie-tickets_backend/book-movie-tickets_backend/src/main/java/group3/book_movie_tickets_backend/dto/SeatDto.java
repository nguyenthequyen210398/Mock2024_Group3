package group3.book_movie_tickets_backend.dto;

import lombok.Data;

@Data
public class SeatDto {
    private Integer id;
    private Integer roomId; // Use camelCase for consistency
    private int roomNumber;
    private String row;
    private int col;
    private Integer typeId; // Use camelCase for consistency
    private String typeName;
}
