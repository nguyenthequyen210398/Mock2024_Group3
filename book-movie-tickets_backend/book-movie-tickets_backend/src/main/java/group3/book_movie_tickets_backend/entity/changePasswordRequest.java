package group3.book_movie_tickets_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "change_password_request")
@Data
public class changePasswordRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id ;
    private String email ;
    private String code ;
    @CreationTimestamp
    private LocalDateTime createdAt ;
    private int duration ;

}
