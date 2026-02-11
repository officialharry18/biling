import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Billing App</h1>

      <button onClick={() => navigate("/create")}>
        Create Bill
      </button>

      <br /><br />

      <button onClick={() => navigate("/price")}>
        Price List
      </button>

      <button onClick={() => navigate("/history")}>
  Bill History
</button>

    </div>
  );
}

export default Home;
