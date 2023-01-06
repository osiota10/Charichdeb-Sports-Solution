import { useContext } from "react";
import { ServiceContext } from "../../App";
import ServicesListTemplate from "../cards/servicesTemplate";
import PageTitle from "../cards/pageTitle";

function ServicesPage() {
    const ServiceList = useContext(ServiceContext)

    return (
        <>
            <PageTitle title="Services" />

            <section className="container">
                {ServiceList.map(item => <ServicesListTemplate key={item.id} title={item.title} body={item.body} image={item.get_image_url} />)}
            </section>
        </>
    );
}

export default ServicesPage;