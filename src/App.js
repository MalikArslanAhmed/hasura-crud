import "./App.css";
import CreateProduct from "./website/landingPage/table/CreateProduct";
import ProductTable from "./website/landingPage/table/ProductTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="create-product" element={<CreateProduct />}></Route>
          <Route path="/" element={<ProductTable />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
