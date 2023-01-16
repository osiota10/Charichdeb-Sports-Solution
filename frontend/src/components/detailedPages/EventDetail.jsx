import PageTitle from "../cards/pageTitle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from 'html-react-parser';



function EventDetail() {
    const { slug } = useParams();
    const [detail, setDetails] = useState([]);

    useEffect(() => {
        console.log('correct')
        axios.get(`http://127.0.0.1:8000/events/` + slug)
            .then(res => {
                setDetails(res.data)
            })
    }, []);

    return (
        <section>
            <PageTitle title={detail.title} />
            <section className="container my-10">
                <section className="row justify-content-center">
                    <section className="col-lg-9">
                        <div className='ratio ratio-16x9 mb-2'>
                            <img src={detail.get_image_url} className="card-img-top mb-4" alt="..." />
                        </div>
                        <h6>Date: {detail.event_date}</h6>
                        {parse(`${detail.safe_body_html}`)}
                    </section>
                </section>
            </section>

        </section>
    );
}

export default EventDetail;