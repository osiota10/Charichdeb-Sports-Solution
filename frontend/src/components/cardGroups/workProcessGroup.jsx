import WorkProcessCard from "../cards/workProcessCard";
import { useContext } from "react";
import { WorkProcessContext } from "../../App";

function WorkProcess() {
    const workProcessList = useContext(WorkProcessContext)

    return (
        <section className="bg-light py-10">
            <section className="container">
                <header className="text-center mb-8">
                    <h2>Our Work Process</h2>
                </header>

                <section className="row row-cols-1 row-cols-lg-4 g-6">
                    {workProcessList.map(item => <WorkProcessCard id={item.id} key={item.id} title={item.title} body={item.body} />)}
                </section>
            </section>
        </section>

    );
}

export default WorkProcess;