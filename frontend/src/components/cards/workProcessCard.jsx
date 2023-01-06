

function WorkProcessCard({ id, key, title, body }) {
    return (
        <section className="col mx-auto" key={key}>
            <section className="d-flex justify-content-center align-items-center fs-3 border border-3 border-primary p-3 rounded-circle mb-2" style={{ width: '100px', height: '100px' }}>
                <h3>{id}</h3>
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

export default WorkProcessCard;