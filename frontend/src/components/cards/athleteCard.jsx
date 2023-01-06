

const pic = {
    url: 'https://picsum.photos/200'
}

function AthleteCard({ key, name, state, sports, event, age }) {
    return (
        <section className='col'>
            <section className="card" style={{ maxWidth: '379px' }} key={key}>
                <div className='ratio ratio-16x9 overflow-hidden'>
                    <img src={pic.url} className="card-img-top mb-4" alt="..." />
                </div>

                <section className="card-body fw-bolder text-primary">
                    <p>Name: {name}</p>
                    <p>Age: {age} yrs</p>
                    <p>State: {state}</p>
                    <p>Sports: {sports}</p>
                    <p>Event: {event}</p>
                </section>
            </section>
        </section>
    );
}

export default AthleteCard;