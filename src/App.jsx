import Navbar from "./components/Navbar";
import MainRoutes from "./routes/Mainroutes";

const App = () => {
    return (
        <div className="font-thin py-10 px-[10%]">
            <Navbar />
            <MainRoutes />
        </div>
    );
};

export default App;
