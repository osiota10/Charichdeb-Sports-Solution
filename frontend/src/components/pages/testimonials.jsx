import { useContext, useState } from "react";
import ReactPaginate from 'react-paginate';
import PageTitle from "../cards/pageTitle";
import { TestimoninailContext } from "../../App";
import parse from 'html-react-parser';

function Items({ currentItems }) {
    return (
        <section className='py-8'>
            <section className='row row-cols-1 row-cols-lg-1 g-6 justify-content-center'>
                {currentItems &&
                    currentItems.map((item) => (
                        <div className="mb-6">
                            <div className="card">
                                <div className="row no-gutters">
                                    <div className="col-md-3 d-flex align-items-center justify-content-center p-3">
                                        {/* <img src={item.get_image_url} className="card-img" alt="Testimonial Image" /> */}
                                        <img src={item.get_image_url} className="img-fluid rounded-circle" alt="..." style={{ width: '133px', height: '133px' }} />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <h4 className="card-title">{item.name}</h4>
                                            <p className="card-text"><small className="text-primary fw-bold">{item.designation}</small></p>
                                            <p className="card-text">{parse(`${item.body}`)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
            </section>
        </section>
    );
}

function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const testimonialList = useContext(TestimoninailContext)
    const items = Object.values(testimonialList);
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

                {Object.keys(items).length > itemsPerPage
                    ?
                    <ReactPaginate
                        previousLabel={'Prev'}
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
                    :
                    null
                }

            </section>
        </>
    );
}

const Testimonials = () => {

    return (
        <>
            <PageTitle title="Testimonials"></PageTitle>
            <section className="">
                <PaginatedItems itemsPerPage={12} />
            </section>
        </>
    );
}

export default Testimonials;

