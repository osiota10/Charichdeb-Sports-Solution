import React from 'react'
import TextTruncate from 'react-text-truncate';
import parse from 'html-react-parser';


function EventCard({ key, title, body, image, date }) {
    let newBody = parse(`${body}`)
    // const bodyString = newBody.replace(/<[^>]+>/g, '');
    // console.log(bodyString)
    return (
        <section className='col'>
            <section className="card" style={{ maxWidth: '379px' }} key={key}>
                <div className='ratio ratio-16x9 overflow-hidden'>
                    <img src={image} className="card-img-top mb-4" alt="..." />
                </div>
                <section className="card-body">
                    <TextTruncate
                        line={2}
                        element="h4"
                        truncateText="…"
                        text={title}
                        className='card-title'
                    />

                    <TextTruncate
                        line={6}
                        element="p"
                        truncateText="…"
                        text={body}
                        className='card-text'
                    />

                </section>
                <div class="card-footer text-primary fw-bold text-center">
                    <small>Event Date: {date}</small>
                </div>
            </section>
        </section>
    );
}

export default EventCard;