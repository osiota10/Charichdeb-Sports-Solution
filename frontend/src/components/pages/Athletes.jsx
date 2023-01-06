import PageTitle from "../cards/pageTitle";
import { useContext, useState } from "react";
import { AthleteContext } from "../../App";
import ReactPaginate from "react-paginate";
import AthleteCard from "../cards/athleteCard";
import { Link } from "react-router-dom";


function Items({ currentItems }) {

    return (
        <section className='container py-8'>
            <section className='row row-cols-1 row-cols-lg-3 g-6 justify-content-center'>
                {currentItems &&
                    currentItems.map((item) => (
                        <section><Link className='text-decoration-none' to={'/athletes/' + item.id}><AthleteCard key={item.id} name={item.name} state={item.address.city} sports={item.username} event={item.company.name} age={item.address.zipcode} /></Link></section>
                    ))}
            </section>
        </section>
    );
}

function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const AthleteList = useContext(AthleteContext)
    const items = Object.values(AthleteList);
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <section className='container'>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    previousLabel={`Prev`}
                    nextLabel={'Next'}
                    breakLabel="..."
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    marginPagesDisplayed={3}
                    // CSS Classes
                    containerClassName={'pagination justify-content-center py-8'}
                    pageClassName={'page-item me-1'}
                    pageLinkClassName={'page-link rounded'}
                    previousClassName={'page-item me-5'}
                    previousLinkClassName={'page-link rounded'}
                    nextClassName={'page-item ms-4'}
                    nextLinkClassName={'page-link rounded'}
                    breakClassName={'page-item me-1'}
                    breakLinkClassName={'page-link rounded'}
                    activeClassName={'active'}
                />
            </section>
        </>
    );
}


function AthletesPage() {
    return (
        <>
            <PageTitle title="Our Athletes" />
            <section className="container">
                <PaginatedItems itemsPerPage={12} />
            </section>
        </>
    );
}

export default AthletesPage;