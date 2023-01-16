import { useContext } from "react";
import { UserInfoContext } from "../../App";

const pic = {
    url: "https://cdn.pixabay.com/photo/2021/05/20/11/58/beauty-6268460_1280.jpg",
}

function DashboardHome() {
    const CurrentUserInfo = useContext(UserInfoContext)


    return (
        <section className="container">
            <section className="row g-8">
                <section className="col-lg-4">

                    <img src={pic.url} class="d-flex justify-content-center align-items-center rounded-circle mx-auto" width="250" height="250" alt="..." />

                    <h4 className="text-center mt-2">{CurrentUserInfo.last_name} {CurrentUserInfo.first_name}</h4>

                    <section class="table-responsive mt-6">
                        <table class="table ">
                            <thead class="table-primary">
                                <tr>
                                    <th scope="col" colspan="2" class="text-center">Bio-Data</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Email:</td>
                                    <td>{CurrentUserInfo.email}</td>
                                </tr>
                                <tr>
                                    <td>Date of Birth:</td>
                                    <td>D26/08</td>
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td>Male</td>
                                </tr>
                                <tr>
                                    <td>Phone Number:</td>
                                    <td>{CurrentUserInfo.phone_number}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </section>

                <section className="col-lg-5 p-3">
                    <section className="row mb-4">
                        <section className="card">
                            <section className="card-body">
                                <p>A card</p>
                            </section>
                        </section>
                    </section>


                    <section className="row mb-4">
                        <section className="card">
                            <section className="card-body">
                                <p>A card</p>
                            </section>
                        </section>
                    </section>

                    <section className="row mb-4">
                        <section className="card">
                            <section className="card-body">
                                <p>A card</p>
                            </section>
                        </section>
                    </section>
                </section>

                <section className="col-lg-3">
                    <h2 className="text-center">Sports Stat</h2>
                    <section class="table-responsive mt-5">
                        <table class="table ">
                            <thead class="table-primary">
                                <tr>
                                    <th scope="col" colspan="2" class="text-center">Events and PBs</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>100m:</td>
                                    <td>10.65s</td>
                                </tr>
                                <tr>
                                    <td>200m:</td>
                                    <td>21.65s</td>
                                </tr>
                                <tr>
                                    <td>400m:</td>
                                    <td>48.76s</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </section>
            </section>
        </section>
    );
}

export default DashboardHome;