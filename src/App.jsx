import Navbar from "./components/Navbar";
import Mainroutes from "./routes/Mainroutes";

const App = () => {
    return (
        <div className="font-thin py-10 px-[10%]">
            <Navbar />
            <Mainroutes />
        </div>
    );
};

export default App;
