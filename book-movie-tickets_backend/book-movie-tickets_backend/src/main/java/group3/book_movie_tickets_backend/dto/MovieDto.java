package group3.book_movie_tickets_backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MovieDto {
    private Integer id;
    private String name;

    private LocalDateTime releaseYear;

    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private int created_by;
    private int updated_by;


    private double rating;

    private String starring; // Diễn viên chính

    private String directedBy; //đạo diễn

    private String productionCompany; // công ty sản xuất

    private String country;

    private String language;

    private String ScreenplayBy;  // biên kịch

    private int status;

    private int RunningTime;  // thời lượng
    private String imgLink;

}
