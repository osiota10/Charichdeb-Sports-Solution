


function ServiceCard({ key, title, image }) {
    return (
        // <section className="col">
        <section className="card" style={{ maxWidth: '379px' }} key={key}>
            <div className="card text-bg-dark">
                <section className="ratio ratio-3x4">
                    <img src={image} className="card-img img-fluid" alt="..." />
                </section>

                <div className="card-img-overlay d-flex justify-content-center align-items-center img-card-overlay">
                    <h3 className="card-title text-secondary text-center">{title}</h3>
                </div>
            </div>
        </section>
        // </section>

    );
}

export default ServiceCard;