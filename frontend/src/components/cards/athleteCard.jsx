import { calculateAge } from "../dashboard/components/ageCalculator";

function AthleteCard({ key, firstName, lastName, date_of_birth, pic, sport, state_of_origin, nationality, weight, height, sportstats }) {
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
                    <p>Age: {date_of_birth ? `${calculateAge(date_of_birth)}` : 'Nill'} yrs</p>
                    <p>State: {state_of_origin ? `${state_of_origin}` : 'Nill'}</p>
                    <p>Sports: {sport ? `${sport}` : 'Nill'}</p>
                    <p>Nationality: {nationality ? `${nationality}` : 'Nill'}</p>
                    <p>Event/P.B: {sportstats ? `${sportstats}` : 'Nill'}</p>
                    <p>Height: {height ? `${height} m` : 'Nill'}</p>
                    <p>Weight: {weight ? `${weight} kg` : 'Nill'}</p>
                </section>
            </section>
        </section>
    );
}

export default AthleteCard;