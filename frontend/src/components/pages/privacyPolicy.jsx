import { useContext } from "react";
import PageTitle from "../cards/pageTitle";
import { CompanyInformationContext } from "../../App";
import parse from 'html-react-parser';




function PrivacyPolicy() {
    const companyInfo = useContext(CompanyInformationContext)

    return (
        <section>
            <PageTitle title="Privacy Policy" />

            {companyInfo.about_company
                ?
                <section className="container py-10">
                    <section className="row">
                        <section className="col-lg-8 mx-auto">
                            <h2 className="text-center">About Us</h2>
                            <p>{parse(`${companyInfo.privacy_policy}`)}</p>
                        </section>
                    </section>
                </section>

                :
                null
            }
        </section>
    );
}

export default PrivacyPolicy;