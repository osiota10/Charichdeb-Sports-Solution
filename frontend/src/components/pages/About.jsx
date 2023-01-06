import WorkProcess from "../cardGroups/workProcessGroup";
import CoreValues from "../cardGroups/coreValues";
import { useEffect, useState } from "react";
import axios from "axios";
import PageTitle from "../cards/pageTitle";
import ServicesListTemplate from "../cards/servicesTemplate";


function AboutPage() {
    const [partners, setPartners] = useState([]);
    const [stories, setStories] = useState([]);

    useEffect(() => {
        //Partners
        axios.get(`http://127.0.0.1:8000/partners`)
            .then(res => {
                setPartners(res.data)
            })

        // Our Stories
        axios.get(`http://127.0.0.1:8000/our-story`)
            .then(res => {
                setStories(res.data)
            })
    }, []);
    return (
        <>
            <PageTitle title="About" />

            <CoreValues />

            <section>
                {stories.map(item => <ServicesListTemplate key={item.id} title={item.title} body={item.body} image={item.get_image_url} />)}
            </section>


            <WorkProcess />

            <section className="py-10">
                <section className="container">
                    <header className="text-center mb-8">
                        <h2>Our Partners</h2>
                    </header>
                    <section className="row row-cols-1 row-cols-md-4 g-4 justify-content-center">
                        {partners.slice(0, 8).map(item =>
                            <section className="col" key={item.id}>
                                <section className="card">
                                    <img src={item.get_image_url} className='card-img' alt={`logo of ${item.name}`} />
                                </section>
                            </section>
                        )}

                    </section>
                </section>
            </section>
        </>
    );
}

export default AboutPage;