import { useEffect, useState } from "react";
import axios from "axios";

function OrderHistory() {
const API = "https://product-management-g6dkdcg7b8hygtay.southeastasia-01.azurewebsites.net/api";

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/orders`)
      .then((res) => setOrders(Array.isArray(res.data) ? res.data : []))
      .catch(() => setOrders([]));
  }, [API]);

  return (
    <div className="card">
      <h3>📜 Order History</h3>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product ID</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.orderId}>
                <td>{o.orderId}</td>
                <td>{o.productId}</td>
                <td>{o.quantity}</td>
                <td>₹{o.totalPrice}</td>
                <td>{o.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
