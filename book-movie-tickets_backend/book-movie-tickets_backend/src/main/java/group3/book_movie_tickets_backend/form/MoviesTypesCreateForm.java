package group3.book_movie_tickets_backend.form;

import lombok.Data;

import java.util.List;

@Data
public class MoviesTypesCreateForm {
    private String name;
    private List<Integer> movieIdList;

}
