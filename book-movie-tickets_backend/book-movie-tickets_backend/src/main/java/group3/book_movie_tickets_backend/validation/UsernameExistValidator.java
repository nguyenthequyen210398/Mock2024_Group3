package group3.book_movie_tickets_backend.validation;


import group3.book_movie_tickets_backend
.entity.Employee;
import group3.book_movie_tickets_backend
.repository.IEmployeeRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;


public class UsernameExistValidator  implements ConstraintValidator<UsernameNotExist,String> {
    @Autowired
    private IEmployeeRepository repository ;
    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        Optional<Employee> emp = repository.findEmployeeByUsername(username);
        return emp.isEmpty();
    }


}
