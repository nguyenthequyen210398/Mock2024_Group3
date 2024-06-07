package group3.book_movie_tickets_backend.service;


import group3.book_movie_tickets_backend
.entity.Employee;
import group3.book_movie_tickets_backend
.form.EmployeeCreateForm;
import group3.book_movie_tickets_backend
.form.EmployeeFilterForm;
import group3.book_movie_tickets_backend
.form.EmployeeUpdateForm;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;

public interface IEmployeeService {
    @Transactional
    void create(EmployeeCreateForm form);

    Page<Employee> getAll(EmployeeFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir);

    Employee getById(Long id);

    void update(Long id, EmployeeUpdateForm e);


    void  deleteById(Long id);
}
