package group3.book_movie_tickets_backend.repository;

import group3.book_movie_tickets_backend
.entity.changePasswordRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IChangePasswordRepository extends JpaRepository<changePasswordRequest,Integer> {
    Boolean existsByEmail(String email) ;

    Optional<changePasswordRequest> findByEmail(String email) ;


    void deleteByEmail(String email) ;
}
