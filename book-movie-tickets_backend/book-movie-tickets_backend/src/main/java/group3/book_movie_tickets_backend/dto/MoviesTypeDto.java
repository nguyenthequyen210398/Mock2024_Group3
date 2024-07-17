package group3.book_movie_tickets_backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class MoviesTypeDto {
    private Integer id;
    private String name;
    private List<MovieDto> movieList;
}
