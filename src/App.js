import "./App.css";
import { Dashboard } from "./pages";

function App() {
    return (
        <div className="application">
            <div className="container">
                {" "}
                <h1>RAG Application POC 🔍</h1>
            </div>
            <Dashboard />
        </div>
    );
}

export default App;
