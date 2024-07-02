package group3.book_movie_tickets_backend.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ShowtimeDto {

    private Integer id;
    private LocalDateTime startAt;

    private LocalDateTime endAt;

}
