import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBill from "./pages/CreateBill";
import PriceList from "./pages/PriceList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBill />} />
        <Route path="/price" element={<PriceList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
