import { useEffect, useState } from "react";

function ProductPage() {

  const API = "https://product-management-g6dkdcg7b8hygtay.southeastasia-01.azurewebsites.net/api";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    productName: "",
    fabricType: "",
    category: "",
    price: "",
    stockQuantity: "",
    available: true,
  });

  const fetchProducts = () => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editingId
      ? `${API}/products/${editingId}`
      : `${API}/products`;

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        fetchProducts();
        resetForm();
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong ❌");
      });
  };

  const editProduct = (p) => {
    setEditingId(p.productId);
    setForm(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Delete product?")) return;

    fetch(`${API}/products/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchProducts())
      .catch(() => alert("Delete failed ❌"));
  };

  // 🔥 NEW FEATURE FUNCTION
  const toggleAvailability = (product) => {
    fetch(`${API}/products/${product.productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...product,
        available: !product.available,
      }),
    })
      .then(() => fetchProducts())
      .catch(() => alert("Update failed ❌"));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      productName: "",
      fabricType: "",
      category: "",
      price: "",
      stockQuantity: "",
      available: true,
    });
  };

  const filteredProducts = products.filter((p) =>
    `${p.productName} ${p.fabricType} ${p.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="card">
        <h3>{editingId ? "Update Product" : "Add Product"}</h3>

        <form onSubmit={handleSubmit} className="form">
          <input name="productName" placeholder="Product Name" value={form.productName} onChange={handleChange} />
          <input name="fabricType" placeholder="Fabric Type" value={form.fabricType} onChange={handleChange} />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
          <input name="stockQuantity" type="number" placeholder="Stock" value={form.stockQuantity} onChange={handleChange} />

          <label>
            <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
            Available
          </label>

          <button className="btn primary">{editingId ? "Update" : "Add"}</button>
        </form>
      </div>

      <input
        className="search"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Fabric</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.productId}>
              <td>{p.productId}</td>
              <td>{p.productName}</td>
              <td>{p.fabricType}</td>
              <td>{p.category}</td>
              <td>₹{p.price}</td>
              <td>{p.stockQuantity}</td>

              {/* 🔥 NEW TOGGLE BUTTON */}
              <td>
                <button
                  className="btn small"
                  onClick={() => toggleAvailability(p)}
                >
                  {p.available ? "Yes" : "No"}
                </button>
              </td>

              <td>
                <button className="btn small" onClick={() => editProduct(p)}>Edit</button>
                <button className="btn danger small" onClick={() => deleteProduct(p.productId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductPage;