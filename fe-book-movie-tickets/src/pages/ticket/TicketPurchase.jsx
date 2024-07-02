import { useParams } from "react-router-dom";

function TicketPurchase() {
    // You can fetch more details of the movie using props.match.params.movieId
    const { id } = useParams();

    return (
        <div>
            <h2>Trang mua vé cho phim có ID: {id}</h2>
            {/* Add ticket purchase form or details here */}
        </div>
    );
}

export default TicketPurchase;
