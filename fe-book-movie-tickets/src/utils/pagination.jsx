import React from 'react'

export default function Pagination(props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = movieComing.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div>
            {/* Pagination buttons */}
            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentItems.length < itemsPerPage || indexOfLastItem >= movieComing.length}>Next</button>
            </div>
        </div>
    )
}
