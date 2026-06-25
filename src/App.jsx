import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ventes from "./pages/Ventes";
import Medicaments from "./pages/Medicaments";
import Inventaire from "./pages/Inventaire";
import Alertes from "./pages/Alertes";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Medicaments />} />
        <Route path="/medicaments" element={<Medicaments />} />
        <Route path="/ventes" element={<Ventes />} />
        <Route path="/inventaire" element={<Inventaire />} />
        <Route path="/alertes" element={<Alertes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
