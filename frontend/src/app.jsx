import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PredictionWorkspace from "./components/PredictionWorkspace";

function App() {
  return (
    <div className="app">

      <Background />

      <div className="content-layer">

        <Navbar />

        <Hero />

        <PredictionWorkspace />

      </div>

    </div>
  );
}

export default App;