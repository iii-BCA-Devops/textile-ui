import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";

// Pages
import ProductPage from "./pages/ProductPage";
import PlaceOrder from "./pages/PlaceOrder";
import OrderHistory from "./pages/OrderHistory";

function App() {
  return (
    <BrowserRouter>
      <div className="app-overlay">
        <h1 className="app-title">🧵 Textile Product Management</h1>

        {/* 🔗 Navigation */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Link to="/" className="btn primary">Products</Link>
          <Link to="/order" className="btn primary">Place Order</Link>
          <Link to="/orders" className="btn primary">Order History</Link>
          <Link to="/signup" className="btn primary">Signup</Link> {/* optional */}
        </div>

        {/* 🛣️ Routes */}
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;