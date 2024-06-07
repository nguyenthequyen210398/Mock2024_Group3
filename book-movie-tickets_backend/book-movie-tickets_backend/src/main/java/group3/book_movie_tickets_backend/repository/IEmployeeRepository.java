package group3.book_movie_tickets_backend.repository;


import group3.book_movie_tickets_backend
.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface IEmployeeRepository extends JpaRepository<Employee,Long>,JpaSpecificationExecutor<Employee> {
    Optional<Employee> findEmployeeByUsername(String username ) ;

}
