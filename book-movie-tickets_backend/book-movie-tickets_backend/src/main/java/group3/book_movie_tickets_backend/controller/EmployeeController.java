package group3.book_movie_tickets_backend.controller;



import group3.book_movie_tickets_backend
.entity.Employee;
import group3.book_movie_tickets_backend
.form.EmployeeCreateForm;
import group3.book_movie_tickets_backend
.form.EmployeeFilterForm;
import group3.book_movie_tickets_backend
.form.EmployeeUpdateForm;
import group3.book_movie_tickets_backend
.service.EmployeeService;
import jakarta.validation.Valid;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/v1/employees")
public class EmployeeController {
    private static final Logger logger = LogManager.getLogger(EmployeeController.class);

    @Autowired
    private EmployeeService service ;
    @GetMapping()
    public Page<Employee> findAll(
           EmployeeFilterForm form ,
            @RequestParam(value = "pageNo" ,defaultValue = "0", required = false) int pageNo,
           @RequestParam(value = "pageSize" ,defaultValue = "10", required = false)int pageSize,
           @RequestParam(value = "sortBy" ,defaultValue = "id", required = false)String sortBy,
           @RequestParam(value = "sortDir" ,defaultValue = "asc", required = false)String sortDir)  {
//        System.out.println(form.getSearch());
        Page<Employee> list =  service.getAll(form,pageNo, pageSize, sortBy, sortDir) ;
        logger.info("Get ALl success ! ");
        return list ;
    }

//    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @GetMapping(value = "/{id}")
    public Employee findById(@PathVariable("id") Long id) {
        return service.getById(id);
    }

    @PostMapping
    public void create(@RequestBody @Valid EmployeeCreateForm form) {
        service.create(form);
    }


    @PutMapping("/{id}")
    public void update(@PathVariable("id")  Long id, @RequestBody @Valid EmployeeUpdateForm form) {
        service.update(id,form);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        service.deleteById(id);
    }
}
