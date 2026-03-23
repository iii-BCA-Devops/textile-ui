import { useEffect, useState } from "react";

function PlaceOrder() {
  const API = process.env.REACT_APP_API_BASE_URL;


  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, [API]);

  const placeOrder = () => {
    if (!productId) {
      alert("Please select a product");
      return;
    }

    const selectedProduct = products.find(
      (p) => p.productId === Number(productId)
    );

    const totalPrice = selectedProduct.price * qty;

    fetch(`${API}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: Number(productId),
        quantity: Number(qty),
        totalPrice,
      }),
    }).then(() => {
      alert("Order placed successfully");
      setQty(1);
      setProductId("");
    });
  };

  return (
    <div className="card">
      <h3>🛒 Place Order</h3>

      <select value={productId} onChange={(e) => setProductId(e.target.value)}>
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p.productId} value={p.productId}>
            {p.productName} (₹{p.price})
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />

      <button className="btn primary" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

export default PlaceOrder;
