import CoreValueCard from "../cards/CoreValueCard";
import { useState, useLayoutEffect } from "react";
import axios from "axios";

function CoreValues() {
    const [coreValue, setCoreValue] = useState([]);

    useLayoutEffect(() => {
        //Service
        axios.get(`${process.env.REACT_APP_API_URL}/core-values`)
            .then(res => {
                setCoreValue(res.data)
            })

    }, []);

    return (
        <>
            {Object.keys(coreValue).length === 0
                ?
                null
                :
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
            }
        </>

    );
}

export default CoreValues;