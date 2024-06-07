package group3.book_movie_tickets_backend.service;


import group3.book_movie_tickets_backend.entity.Employee;
import group3.book_movie_tickets_backend.form.EmployeeCreateForm;
import group3.book_movie_tickets_backend.form.EmployeeFilterForm;
import group3.book_movie_tickets_backend.form.EmployeeUpdateForm;
import group3.book_movie_tickets_backend.repository.IEmployeeRepository;
import group3.book_movie_tickets_backend.specification.EmployeeSpecification;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService implements IEmployeeService {

    @Autowired
    private IEmployeeRepository repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    @Transactional
    public void create(EmployeeCreateForm form) {
        Employee emp = mapper.map(form, Employee.class);
        repository.save(emp);
    }

    @Override
    public Page<Employee> getAll(EmployeeFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir) {
        Specification<Employee> spec = EmployeeSpecification.buildSpec(form);
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        return repository.findAll(spec, pageable);
    }

    @Override
    public Employee getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void update(Long id, EmployeeUpdateForm form) {
        Employee emp = mapper.map(form, Employee.class);
        emp.setId(id);
        emp.setUsername(getById(id).getUsername());
        repository.save(emp);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
