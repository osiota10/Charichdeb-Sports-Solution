import PageTitle from "../cards/pageTitle";
import { CompanyInformationContext } from "../../App";
import parse from 'html-react-parser';
import { useContext } from "react";


function TermsAndConditions() {
    const companyInfo = useContext(CompanyInformationContext)

    return (
        <section>
            <PageTitle title="Terms and Conditions" />

            {companyInfo.about_company
                ?
                <section className="bg-light">
                    <section className="container py-10">
                        <section className="row">
                            <section className="col-lg-8 mx-auto">
                                <h2 className="text-center">About Us</h2>
                                <p>{parse(`${companyInfo.terms_and_conditions}`)}</p>
                            </section>
                        </section>
                    </section>
                </section>

                :
                null
            }
        </section>
    );
}

export default TermsAndConditions;