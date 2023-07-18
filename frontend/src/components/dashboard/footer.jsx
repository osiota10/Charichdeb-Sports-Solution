

function DashboardFooter() {
    const date = new Date()
    return (
        <footer class="row bg-primary py-2">
            <p class="text-center text-white">Copyright © Charichdeb! {date.getFullYear()}</p>
        </footer>
    );
}

export default DashboardFooter;