import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./bill.css";

function PriceList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("items")) || [];
    setItems(saved);
  }, []);

  const saveToStorage = (data) => {
    setItems(data);
    localStorage.setItem("items", JSON.stringify(data));
  };

  const addItem = () => {
    const name = prompt("Item Name:");
    const mrp = prompt("MRP:");
    const price = prompt("Selling Price:");

    if (!name || !price) return;

    const newItem = {
      id: Date.now(),
      name,
      mrp: Number(mrp),
      price: Number(price),
    };

    saveToStorage([...items, newItem]);
  };

  const deleteItem = (id) => {
    const updated = items.filter(i => i.id !== id);
    saveToStorage(updated);
  };

  const updateItem = (id) => {
    const item = items.find(i => i.id === id);

    const newName = prompt("New Name:", item.name);
    const newMrp = prompt("New MRP:", item.mrp);
    const newPrice = prompt("New Price:", item.price);

    const updated = items.map(i =>
      i.id === id
        ? {
            ...i,
            name: newName,
            mrp: Number(newMrp),
            price: Number(newPrice)
          }
        : i
    );

    saveToStorage(updated);
  };

  return (
    <div className="container">
      <div className="card">

        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <h2>Price List</h2>

        <button
          style={{
            marginBottom: "15px",
            padding: "8px",
            borderRadius: "6px",
            border: "none",
            background: "#4CAF50",
            color: "white",
            cursor: "pointer"
          }}
          onClick={addItem}
        >
          + Add Item
        </button>

        {items.map(item => (
          <div key={item.id} className="bill-row">
            <span>{item.name}</span>
            <span>MRP: ₹{item.mrp}</span>
            <span>Price: ₹{item.price}</span>

            <div>
              <button
                style={{
                  marginRight: "5px",
                  background: "#2196F3",
                  color: "white",
                  border: "none",
                  padding: "5px 8px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
                onClick={() => updateItem(item.id)}
              >
                ✏
              </button>

              <button
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 8px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
                onClick={() => deleteItem(item.id)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default PriceList;
