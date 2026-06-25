import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

function Ventes() {
  const [medicaments, setMedicaments] = useState([]);
  const [formData, setFormData] = useState({ medicamentId: "", quantite: "" });
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "medicaments"),
      (snapshot) => {
        const liste = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMedicaments(liste);
      },
    );
    return () => unsubscribe();
  }, []);

  const handleVente = async (e) => {
    e.preventDefault();
    const med = medicaments.find((m) => m.id === formData.medicamentId);

    if (Number(formData.quantite) > med.quantite) {
      alert("Stock insuffisant !");
      return;
    }
    
    const nouvelleQuantite = med.quantite - Number(formData.quantite);
    await addDoc(collection(db, "ventes"), {
      medicamentId: formData.medicamentId,
      nomMedicament: med.nom,
      quantite: formData.quantite,
      prix: med.prix,
      dateVente: new Date().toISOString(),
    });
    await updateDoc(doc(db, "medicaments", formData.medicamentId), {
      quantite: nouvelleQuantite,
    });
    setFormData({ medicamentId: "", quantite: "" });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1>💊 Ventes</h1>
      <form
        onSubmit={handleVente}
        className="bg-white p-6 rounded-xl shadow mb-8"
      >
        <select
          value={formData.medicamentId}
          onChange={(e) =>
            setFormData({ ...formData, medicamentId: e.target.value })
          }
          className="border rounded-lg p-2 w-full"
        >
          <option value="">Choisir un médicament </option>
          {medicaments.map((med) => (
            <option key={med.id} value={med.id}>
              {med.nom} — Stock : {med.quantite}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={formData.quantite}
          onChange={(e) =>
            setFormData({ ...formData, quantite: e.target.value })
          }
          placeholder="Quantité vendue"
          className="border rounded-lg p-2 w-full"
        />
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Enregistrer la vente
        </button>
      </form>
    </div>
  );
}

export default Ventes;
