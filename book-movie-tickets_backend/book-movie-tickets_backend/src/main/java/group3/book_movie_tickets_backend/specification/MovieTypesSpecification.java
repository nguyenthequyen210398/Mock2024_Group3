package group3.book_movie_tickets_backend.specification;

import group3.book_movie_tickets_backend.entity.MovieTypes;
import group3.book_movie_tickets_backend.form.MovieTypesFilterForm;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class MovieTypesSpecification {
    public static Specification<MovieTypes> buildSpec(MovieTypesFilterForm form) {
        return (root, query, builder) ->
        {
            List<Predicate> predicates = new ArrayList<>();

            if (form == null) {
                return null;
            }

            if (StringUtils.hasText(form.getSearch())) {
                String pattern = "%" + form.getSearch().trim() + "%";
                Path<String> name = root.get("name");
                Predicate hasNameLike = builder.like(name, pattern);

                predicates.add(builder.or(hasNameLike));
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
