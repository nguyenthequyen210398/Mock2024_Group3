package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.dto.UserDetailDto;
import group3.book_movie_tickets_backend.entity.UserDetail;
import group3.book_movie_tickets_backend.form.UserDetailFilterForm;
import group3.book_movie_tickets_backend.repository.IUserDetailRepository;
import group3.book_movie_tickets_backend.specification.UserDetailSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailService implements IUserDetailService {
    @Autowired
    private IUserDetailRepository repository;
    @Autowired
    private ModelMapper mapper;

    @Override
    @Transactional

    public void create(UserDetailDto form) {
        UserDetail userDetail = mapper.map(form, UserDetail.class);
        repository.save(userDetail);
    }

    @Override
    public Page<UserDetailDto> getAll(UserDetailFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir) {
        Specification<UserDetail> spec = UserDetailSpecification.buildSpec(form);
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<UserDetail> userDetails=repository.findAll(spec,pageable);
        return userDetails.map((element) -> mapper.map(element, UserDetailDto.class));

    }

    @Override
    public UserDetailDto getById(Integer id) {
        return mapper.map(repository.findById(id).orElse(null), UserDetailDto.class);
    }

    @Override
    public void updateById(Integer id, UserDetailDto form) {
        UserDetail userDetail = mapper.map(form, UserDetail.class);
        userDetail.setId(id);
        repository.save(userDetail);
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }



//}
}
