package group3.book_movie_tickets_backend.specification;

import group3.book_movie_tickets_backend.entity.Movie;
import group3.book_movie_tickets_backend.form.MovieFilterForm;
import group3.book_movie_tickets_backend.form.TicketFilterForm;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class TicketSpecification {
    public static Specification<Movie> buildSpec(TicketFilterForm form) {
        return (root, query, builder) ->
        {
            List<Predicate> predicates = new ArrayList<>();

            if (form == null) {
                return null;
            }

            if (StringUtils.hasText(form.getSearch())) {
                String pattern = "%" + form.getSearch().trim() + "%";
                Path<String> fullName = root.get("fullName");
                Predicate hasFullNameLike = builder.like(fullName, pattern);
                Path<String> address = root.get("address");
                Predicate hasAddressLike = builder.like(address, pattern);

                predicates.add(builder.or(hasFullNameLike, hasAddressLike));
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
