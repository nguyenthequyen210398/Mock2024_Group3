package group3.book_movie_tickets_backend.repository;

import group3.book_movie_tickets_backend.entity.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IAccountRepository extends JpaRepository<Account,Integer> {
    Optional<Account> findByEmail(String email);
    Boolean existsByEmail(String email) ;

    Page<Account> findAll(Specification<Account> spec, Pageable pageable);
}
