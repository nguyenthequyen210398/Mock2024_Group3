package group3.book_movie_tickets_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "seats")
@Data
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;

    @Column
    private String row;

    @Column
    private int col;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "type_id", referencedColumnName = "id")
    private SeatType type;

    @Column
    private String seatStatus;

    public void setSeatStatus(String seatStatus) {
        this.seatStatus = seatStatus;
    }
}
