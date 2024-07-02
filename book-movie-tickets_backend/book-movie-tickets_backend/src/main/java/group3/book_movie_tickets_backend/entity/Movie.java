package group3.book_movie_tickets_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "movies")
@Data
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String name;

    @Column
    private LocalDateTime releaseYear;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "type_id", referencedColumnName = "id")
    private MovieTypes type;

    @Column
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column
    private int created_by;
    @Column
    private int updated_by;

    @OneToMany(mappedBy = "movie")
    private List<Showtimes> showtimesList;

    @Column
    private double rating;

    @Column
    private String starring; // Diễn viên chính

    @Column
    private String directedBy; //đạo diễn

    @Column
    private String productionCompany; // công ty sản xuất

    @Column
    private String country;

    @Column
    private String language;

    @Column
    private String ScreenplayBy;  // biên kịch

    @Column
    private int status;

    @Column
    private int RunningTime;  // thời lượng
    @Column
    private String imgLink;
}
