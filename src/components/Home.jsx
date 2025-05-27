import Main from "./Main.jsx";
import Shop from "./Shop.jsx";

const Home = () => {
    return (
        <div className="d-flex flex-column min-vh-100">

            <div className="d-flex flex-wrap justify-content-center gap-3 m-3">
                <Main>
                    <Shop />
                </Main>
            </div>

        </div>
    );
}

export default Home;
