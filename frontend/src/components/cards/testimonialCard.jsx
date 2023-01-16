import parse from 'html-react-parser';

function TestimonialCard({ key, name, title, pic, message }) {
    return (
        <section className="">
            <section className="d-flex justify-content-center align-items-center" key={key}>
                <section className="me-4">
                    <img src={pic} className="img-fluid rounded-circle" alt="..." style={{ width: '133px', height: '133px' }} />
                </section>

                <section className="">
                    <h5>{name}</h5>
                    <small className='text-primary fw-bold'>{title}</small>
                </section>
            </section>

            <section className='px-1'>
                <i class="fa-solid fa-quote-left text-primary fs-4"></i>
                <p>{parse(`${message}`)}
                </p>
                <i class="fa-solid fa-quote-right text-primary d-flex justify-content-end fs-4"></i>
            </section>
        </section>
    );
}

export default TestimonialCard;