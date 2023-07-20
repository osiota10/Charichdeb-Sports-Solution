import DashboardSideBar from "./navBar";
import DashboardFooter from "./footer";
import { Connect, connect } from "react-redux";
import { checkAuthenticated } from "../../actions/auth";
import { useEffect } from "react";

const DashboardLayout = ({ checkAuthenticated }) => {
    const result = checkAuthenticated()
    console.log(result)
    useEffect(() => {
        checkAuthenticated();
        // load_user();
    }, []);

    return (
        <section className="">
            <DashboardSideBar />

            <DashboardFooter />
        </section>
    )
};

export default connect(null, { checkAuthenticated })(DashboardLayout);