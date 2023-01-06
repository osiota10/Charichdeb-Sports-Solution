


function CoreValueCard({ key, title, body, image }) {
    return (
        <section className="col-lg" key={key}>
            <section className="d-flex justify-content-center align-items-center mb-3">
                <img src={image} className="img-fluid rounded-circle" alt="..." style={{ width: '133px', height: '133px' }} />
            </section>

            <header>
                <h4>{title} </h4>
            </header>

            <section>
                <p>{body}</p>
            </section>
        </section>
    );
}

export default CoreValueCard;