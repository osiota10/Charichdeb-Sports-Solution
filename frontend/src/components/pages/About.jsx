import WorkProcess from "../cardGroups/workProcessGroup";
import CoreValues from "../cardGroups/coreValues";
import { useEffect, useState } from "react";
import axios from "axios";
import PageTitle from "../cards/pageTitle";
import ServicesListTemplate from "../cards/servicesTemplate";
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import 'bootstrap';



function AboutPage() {
    const [partners, setPartners] = useState([]);
    const [stories, setStories] = useState([]);

    useEffect(() => {
        //Partners
        axios.get(`${process.env.REACT_APP_API_URL}/partners`)
            .then(res => {
                setPartners(res.data)
            })

        // Our Stories
        axios.get(`${process.env.REACT_APP_API_URL}/our-story`)
            .then(res => {
                setStories(res.data)
            })

        // Initialize tooltip
        // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }, []);
    return (
        <>
            <PageTitle title="About" />

            <CoreValues />

            {Object.keys(stories).length === 0
                ?
                null
                :
                <section className="container">
                    {stories.map(item => <ServicesListTemplate key={item.id} title={item.title} body={item.body} image={item.get_image_url} />)}
                </section>
            }

            <WorkProcess />

            {Object.keys(partners).length === 0
                ?
                null
                :
                <section className="py-10">
                    <section className="container">
                        <header className="text-center mb-8">
                            <h2>Our Partners</h2>
                        </header>
                        <section className="row row-cols-1 row-cols-md-4 g-4 justify-content-center">
                            {partners.slice(0, 8).map(item =>
                                <section className="col" key={item.id}>
                                    <section className="card" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top">
                                        <img src={item.get_image_url} className='card-img' alt={`logo of ${item.name}`} />
                                    </section>
                                </section>
                            )}
                        </section>
                    </section>
                </section>}
        </>
    );
}

export default AboutPage;