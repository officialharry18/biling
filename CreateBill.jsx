import { useState, useEffect } from "react";
import "./bill.css";
import { useNavigate } from "react-router-dom";

function CreateBill() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [qty, setQty] = useState(1);
  const [bill, setBill] = useState([]);
  const navigate = useNavigate();
  const saveBill = () => {
  if (bill.length === 0) return alert("Bill empty!");

  const savedBills =
    JSON.parse(localStorage.getItem("bills")) || [];

  const newBill = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: bill,
    total: grandTotal
  };

  const updated = [...savedBills, newBill];

  localStorage.setItem("bills", JSON.stringify(updated));

  alert("Bill Saved ✅");
  setBill([]);
};



  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("items")) || [];
    setItems(saved);
  }, []);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToBill = (item) => {
    const existing = bill.find(i => i.id === item.id);

    if (existing) {
      const updated = bill.map(i =>
        i.id === item.id
          ? {
              ...i,
              qty: i.qty + qty,
              total: (i.qty + qty) * i.price
            }
          : i
      );
      setBill(updated);
    } else {
      const newItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        qty,
        total: item.price * qty
      };
      setBill([...bill, newItem]);
    }

    setSearch("");
    setQty(1);
  };

  const deleteItem = (id) => {
    const updated = bill.filter(i => i.id !== id);
    setBill(updated);
  };

  const grandTotal = bill.reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="container">
      <div className="card">
        <button className="back-btn" onClick={() => navigate("/")}>
  ← Back
</button>

        <h2>Create Bill</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Search item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </div>

        {search && (
          <div className="dropdown">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="dropdown-item"
                onClick={() => addToBill(item)}
              >
                {item.name} - ₹{item.price}
              </div>
            ))}
          </div>
        )}

        <div className="bill-list">
          {bill.map(item => (
            <div key={item.id} className="bill-row">
              <span>{item.name}</span>
              <span>{item.qty} × ₹{item.price}</span>
              <span>₹{item.total}</span>
              <button onClick={() => deleteItem(item.id)}>❌</button>
            </div>
          ))}
        </div>

        <h3 className="total">Total: ₹{grandTotal}</h3>
      </div>
      <button
  style={{
    marginTop: "15px",
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    background: "#673ab7",
    color: "white",
    cursor: "pointer",
    width: "100%"
  }}
  onClick={saveBill}
>
  Save Bill
</button>

    </div>
  );
}

export default CreateBill;
