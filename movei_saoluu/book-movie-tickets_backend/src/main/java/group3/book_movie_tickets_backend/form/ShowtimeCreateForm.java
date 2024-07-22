package group3.book_movie_tickets_backend.form;



import lombok.Data;

import java.time.LocalDateTime;
@Data

public class ShowtimeCreateForm {

    private LocalDateTime startAt;

    private LocalDateTime endAt;

}
