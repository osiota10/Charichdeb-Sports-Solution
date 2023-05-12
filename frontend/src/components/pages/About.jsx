import WorkProcess from "../cardGroups/workProcessGroup";
import CoreValues from "../cardGroups/coreValues";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PageTitle from "../cards/pageTitle";
import ServicesListTemplate from "../cards/servicesTemplate";
import { CompanyInformationContext } from "../../App";
import parse from 'html-react-parser';



function AboutPage() {
    const [partners, setPartners] = useState([]);
    const [stories, setStories] = useState([]);
    const companyInfo = useContext(CompanyInformationContext)

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
    }, []);

    return (
        <>
            <PageTitle title="About" />

            <CoreValues />

            {companyInfo.about_company
                ?
                <section className="bg-light">
                    <section className="container py-10">
                        <section className="row">
                            <section className="col-lg-8 mx-auto">
                                <h2 className="text-center">About Us</h2>
                                <p>{parse(`${companyInfo.about_company}`)}</p>
                            </section>
                        </section>
                    </section>
                </section>

                :
                null
            }

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