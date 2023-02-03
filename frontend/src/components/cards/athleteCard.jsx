


function AthleteCard({ key, firstName, lastName, pic, sport, state_of_origin, nationality, weight, height, sportstats }) {
    return (
        <section className='col' key={key}>
            <section className="card mx-auto" style={{ maxWidth: '379px' }} >

                <div className='bg-primary athlete-bg' style={{ height: '120px' }} >

                </div>

                <section className="card-body fw-bolder text-primary">
                    <section className="d-flex justify-content-center mt-n12">
                        <img src={pic} className="mb-4 rounded-circle athlete-pix" width="170" height="170" alt="..." />
                    </section>
                    <p>Name: {lastName} {firstName}</p>
                    <p>Age:  yrs</p>
                    <p>State: {state_of_origin}</p>
                    <p>Sports: {sport}</p>
                    <p>Nationality: {nationality}</p>
                    <p>Event/P.B: {sportstats}</p>
                    <p>Height: {height}m</p>
                    <p>Weight: {weight}kg</p>
                </section>
            </section>
        </section>
    );
}

export default AthleteCard;