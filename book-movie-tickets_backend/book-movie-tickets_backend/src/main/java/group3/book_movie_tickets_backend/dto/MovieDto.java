package group3.book_movie_tickets_backend.dto;

import lombok.Data;

import java.sql.Date;
import java.time.LocalDateTime;

@Data
public class MovieDto {
    private Integer Id;

    private String name;

    private Date releaseDate; //ngay sx

    private int type;

    private String description;// mo ta

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private int created_by;

    private int updated_by;

    private String url;

    private String country;

    private String duration; // thoi luong

    private String director;//dao dien
}
