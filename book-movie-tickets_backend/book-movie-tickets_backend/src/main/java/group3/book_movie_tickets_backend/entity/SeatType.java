package group3.book_movie_tickets_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "seat_types")
@Data
public class SeatType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String name;
    @Column
    private double price;

    @OneToMany(mappedBy = "type")
    private List<Seat> seats;

}
