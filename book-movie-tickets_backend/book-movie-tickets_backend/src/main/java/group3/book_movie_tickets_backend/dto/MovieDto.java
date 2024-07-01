package group3.book_movie_tickets_backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MovieDto {
    private Integer Id;
    private String name;
    private int year;
    private String origin;

    private int type;
    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private int created_by;
    private int updated_by;
}
