package group3.book_movie_tickets_backend.form;

import group3.book_movie_tickets_backend.entity.MovieTypes;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.awt.*;
import java.sql.Date;
import java.time.LocalDateTime;

@Data
public class MovieCreateForm {

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
