package group3.book_movie_tickets_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "rooms")
@Data
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private int number;

    @OneToMany(mappedBy = "room")
    private List<Seat> seat;

    @OneToMany(mappedBy = "room")
    private List<Showtimes> showtimesList;
}
