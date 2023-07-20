import { useContext } from "react";
import { CompanyInformationContext } from "../../App";

function DashboardFooter() {
    const companyInfo = useContext(CompanyInformationContext)
    const date = new Date()
    return (
        <footer class="row bg-primary py-2">
            <p class="text-center text-white"> © {date.getFullYear()} {companyInfo.company_name} </p>
        </footer>
    );
}

export default DashboardFooter;