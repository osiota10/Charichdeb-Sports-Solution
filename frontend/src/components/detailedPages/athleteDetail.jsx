import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PageTitle from "../cards/pageTitle";


function AthleteDetailModal() {
    const { id } = useParams();
    const [detail, setDetails] = useState([]);

    useEffect(() => {
        console.log('correct')
        axios.get(`https://jsonplaceholder.typicode.com/users/` + id)
            .then(res => {
                setDetails(res.data)
            })
    }, []);

    return (
        <>
            <section>
                <PageTitle title={detail.name} />

                <section className="container">
                    <section>
                        <p>Name: {detail.name}</p>
                        <p>Age: {detail.age} yrs</p>
                        <p>State: {detail.state}</p>
                        <p>Sports: {detail.sports}</p>
                        <p>Event: {detail.event}</p>
                    </section>
                </section>
            </section>

        </>
    );
}

export default AthleteDetailModal;