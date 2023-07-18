import DashboardSideBar from "./navBar";
import DashboardFooter from "./footer";

const DashboardLayout = () => {
    return (
        <section className="">
            <DashboardSideBar />

            <DashboardFooter />
        </section>
    )
};

export default DashboardLayout;