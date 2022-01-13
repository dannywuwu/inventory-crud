import "./App.css";
import Table from "./components/Table";
import ItemView from "./components/ItemView";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/item/:id" element={<ItemView />} />
      </Routes>
    </div>
  );
}

export default App;
