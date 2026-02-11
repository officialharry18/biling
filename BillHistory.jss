import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./bill.css";

function BillHistory() {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bills")) || [];
    setBills(saved);
  }, []);

  return (
    <div className="container">
      <div className="card">

        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <h2>Bill History</h2>

        {bills.length === 0 && <p>No bills saved.</p>}

        {bills.map(bill => (
          <div key={bill.id} style={{ marginBottom: "15px" }}>
            <strong>Date:</strong> {bill.date}
            <br />
            <strong>Total:</strong> ₹{bill.total}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BillHistory;
