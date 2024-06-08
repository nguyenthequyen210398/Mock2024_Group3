package group3.book_movie_tickets_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "seat_types")
@Data
public class SeatType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private double price;

    @OneToOne(mappedBy = "type")
    private Seat seat;

}
