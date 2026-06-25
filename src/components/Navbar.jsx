import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#1A56DB",
        padding: "12px 24px",
        display: "flex",
        gap: "24px",
      }}
    >
      <Link
        to="/"
        style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
      >
        💊 Pharmacie
      </Link>
      <Link
        to="/medicaments"
        style={{ color: "white", textDecoration: "none" }}
      >
        Médicaments
      </Link>
      <Link to="/ventes" style={{ color: "white", textDecoration: "none" }}>
        Ventes
      </Link>
      <Link to="/alertes" style={{ color: "white", textDecoration: "none" }}>
        Alertes
      </Link>
      <Link to="/inventaire" style={{ color: "white", textDecoration: "none" }}>
        Inventaire
      </Link>
    </nav>
  );
}

export default Navbar;
