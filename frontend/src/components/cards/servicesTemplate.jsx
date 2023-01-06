import parse from 'html-react-parser';

function ServicesListTemplate({ key, title, body, image }) {

    return (
        <section className="py-10 service-template" key={key}>
            <section className="row g-0 justify-content-center">
                <section className="col-lg-4 align-self-center">
                    <section className="ratio ratio-3x4">
                        <img src={image} className="img-fluid" alt="..." style={{ zIndex: '1027', borderRadius: '2rem' }} />
                    </section>
                </section>
                <section className="col-lg-7 ms-lg-n6 align-self-center">
                    <section className="card" style={{ zIndex: '1028' }}>
                        <section className="card-body">
                            <h2>{title}</h2>
                            {parse(`${body}`)}
                        </section>
                    </section>
                </section>

            </section>

        </section>
    );
}

export default ServicesListTemplate;