import CoreValueCard from "../cards/CoreValueCard";
import { useState, useEffect } from "react";
import axios from "axios";

function CoreValues() {
    const [coreValue, setCoreValue] = useState([]);

    useEffect(() => {
        //Service
        axios.get(`http://127.0.0.1:8000/core-values`)
            .then(res => {
                setCoreValue(res.data)
            })

    }, []);

    return (
        <section className="py-10">
            <section className="container">
                <header className="text-center mb-8">
                    <h2>Our Core Values</h2>
                </header>

                <section className="row">
                    {coreValue.map(item => <CoreValueCard key={item.id} title={item.title} body={item.body} image={item.get_image_url} />)}
                </section>
            </section>
        </section>
    );
}

export default CoreValues;