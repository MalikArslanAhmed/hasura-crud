import "./App.css";
import ApiInterceptor from "./interceptors/ApiInterceptor";
import CreateProduct from "./website/landingPage/table/CreateProduct";
import ProductTable from "./website/landingPage/table/ProductTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <ApiInterceptor>
        <Router>
          <Routes>
            <Route path="create-product" element={<CreateProduct />}></Route>
            <Route path="/" element={<ProductTable />}></Route>
          </Routes>
        </Router>
      </ApiInterceptor>
    </div>
  );
}

export default App;
