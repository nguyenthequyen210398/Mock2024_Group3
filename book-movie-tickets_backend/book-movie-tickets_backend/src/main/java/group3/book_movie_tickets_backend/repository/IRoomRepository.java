package group3.book_movie_tickets_backend.repository;

import group3.book_movie_tickets_backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IRoomRepository extends JpaRepository<Room, Integer>, JpaSpecificationExecutor<Room> {
}
