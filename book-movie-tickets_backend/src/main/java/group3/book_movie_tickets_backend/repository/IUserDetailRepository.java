package group3.book_movie_tickets_backend.repository;

import group3.book_movie_tickets_backend.entity.UserDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserDetailRepository extends JpaRepository <UserDetail,Integer>{
    Page<UserDetail> findAll(Specification<UserDetail> spec, Pageable pageable);
}
