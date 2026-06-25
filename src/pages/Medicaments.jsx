import { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
function Medicaments() {
  const [formData, setFormData] = useState({
    nom: "",
    dosage: "",
    prix: "",
    quantite: "",
    dateExpiration: "",
    categorie: "",
  });
  const [medicaments, setMedicaments] = useState([]);
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

  const handlesubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "medicaments"), formData);
    setFormData({
      nom: "",
      dosage: "",
      prix: "",
      quantite: "",
      dateExpiration: "",
      categorie: "",
    });
  };
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        💊 Gestion des Médicaments
      </h1>
      <form
        onSubmit={handlesubmit}
        className="bg-white p-6 rounded-xl shadow mb-8"
      >
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Ajouter un médicament
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.nom}
            placeholder="Nom du médicament"
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="text"
            value={formData.dosage}
            placeholder="Dosage (ex: 500mg)"
            onChange={(e) =>
              setFormData({ ...formData, dosage: e.target.value })
            }
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="text"
            value={formData.categorie}
            placeholder="categorie"
            onChange={(e) =>
              setFormData({ ...formData, categorie: e.target.value })
            }
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="number"
            value={formData.quantite}
            placeholder="Quantité en stock"
            onChange={(e) =>
              setFormData({ ...formData, quantite: e.target.value })
            }
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="number"
            value={formData.prix}
            placeholder="Prix unitaire"
            onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="date"
            value={formData.dateExpiration}
            onChange={(e) =>
              setFormData({ ...formData, dateExpiration: e.target.value })
            }
            className="border rounded-lg p-2 w-full"
          />{" "}
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Soumettre
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {medicaments.map((med) => (
          <div
            key={med.id}
            className="bg-white rounded-xl shadow p-4 mb-3 border-l-4 border-blue-500"
          >
            <h3 className="text-lg font-bold text-blue-700 mb-2">{med.nom}</h3>
            <p className="text-sm text-gray-600">
              💊 <span className="font-bold">Dosage :</span> {med.dosage}
            </p>
            <p className="text-sm text-gray-600">
              🏷️ <span className="font-bold">Catégorie :</span> {med.categorie}
            </p>
            <p className="text-sm text-gray-600">
              📦 <span className="font-bold">Quantité :</span> {med.quantite}
            </p>
            <p className="text-sm text-gray-600">
              📅 <span className="font-bold">Expiration :</span>{" "}
              {med.dateExpiration}
            </p>
            <p className="mt-3 text-right font-bold text-green-600 text-lg">
              {med.prix} FCFA
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Medicaments;
