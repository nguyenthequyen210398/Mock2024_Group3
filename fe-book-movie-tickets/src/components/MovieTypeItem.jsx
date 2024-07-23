

const MovieTypeItem = ({ movieType }) => {
    return (
        <tr>
            <td>{movieType.id}</td>
            <td>{movieType.name}</td>
        </tr>
    );
};

export default MovieTypeItem;
