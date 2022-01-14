import "./App.css";
import Home from "./pages/Home";
import ItemView from "./components/ItemView";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemView />} />
      </Routes>
    </div>
  );
}

export default App;
