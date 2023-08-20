import { useState, useLayoutEffect } from "react";
import axios from "axios";
import CountUp from 'react-countup';


function StatCard() {
    const [stat, setStat] = useState([]);

    useLayoutEffect(() => {
        //Stat
        axios.get(`${process.env.REACT_APP_API_URL}/stat`)
            .then(res => {
                setStat(res.data)
            })
    }, []);

    return (
        <>
            {Object.keys(stat).length === 0
                ?
                null
                :
                <section className="w-100">
                    <section className="container-fluid bg-primary text-secondary py-5 text-center" style={{ borderRadius: '2rem' }}>
                        <section className="row">
                            {stat.map(item =>
                                <section className="col-sm-4" key={item.id}>
                                    <h1 className="text-secondary"><CountUp end={item.stat_figure} duration={5} suffix=" +" /></h1>
                                    <p className="fs-6 fw-light">{item.stat_title}</p>
                                </section>
                            )}
                        </section>
                    </section>
                </section>
            }
        </>

    );
}

export default StatCard;