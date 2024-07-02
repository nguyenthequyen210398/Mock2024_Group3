package group3.book_movie_tickets_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Date;
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
    private Date releaseDate; //ngay sx

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "type_id", referencedColumnName = "id")
    private MovieTypes type;

    @Column
    private String description;// mo ta

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

    @Column
    private String url;
    @Column
    private String country;
    @Column
    private String duration; // thoi luong
    @Column
    private String director;//dao dien









    @OneToMany(mappedBy = "movie")
    private List<Showtimes> showtimesList;


}
