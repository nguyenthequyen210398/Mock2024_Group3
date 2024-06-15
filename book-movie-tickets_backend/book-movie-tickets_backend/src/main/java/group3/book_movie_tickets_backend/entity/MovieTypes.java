package group3.book_movie_tickets_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "movie_types")
@Data
public class MovieTypes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column
    private String name;

    @OneToMany(mappedBy = "type")
    private List<Movie> movieList;


}
