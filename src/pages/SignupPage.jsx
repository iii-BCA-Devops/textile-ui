import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const API = "http://localhost:8081/api";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  fetch(`${API}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then(async (res) => {
      console.log("STATUS:", res.status);

      // 🔥 read response safely
      const text = await res.text();
      console.log("RESPONSE:", text);

      if (!res.ok) {
        throw new Error("Signup failed");
      }

      return text;
    })
    .then(() => {
      alert("Signup successful ✅");
      navigate("/");
    })
    .catch((err) => {
      console.error("ERROR:", err);
      alert("Signup failed ❌");
    });
};

  return (
    <div className="container">
      <div className="card">
        <h2>Signup</h2>

        <form onSubmit={handleSubmit} className="form">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="btn primary">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;