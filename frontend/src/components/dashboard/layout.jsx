import DashboardSideBar from "./navBar";
import DashboardFooter from "./footer";

const DashboardLayout = () => {
    return (
        <section className="min-vh-100">
            <DashboardSideBar />

            <DashboardFooter />
        </section>
    )
};

export default DashboardLayout;