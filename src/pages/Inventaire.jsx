import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function Inventaire() {
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

  //   function export

  const exportCSV = () => {
    //  L'entête du fichier CSV
    const entete = "Nom,Dosage,Catégorie,Quantité,Prix,Expiration\n";

    //  Les données — chaque médicament sur une ligne
    const lignes = medicaments
      .map(
        (med) =>
          `${med.nom},${med.dosage},${med.categorie},${med.quantite},${med.prix},${med.dateExpiration}`,
      )
      .join("\n");

    // Créer le fichier et télécharger
    const blob = new Blob([entete + lignes], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const lien = document.createElement("a");
    lien.href = url;
    lien.download = "inventaire.csv";
    lien.click();
  };
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">📋 Inventaire</h1>
        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Exporter CSV
        </button>
      </div>
      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Dosage</th>
            <th className="p-3 text-left">Catégorie</th>
            <th className="p-3 text-left">Quantité</th>
            <th className="p-3 text-left">Prix</th>
            <th className="p-3 text-left">Expiration</th>
          </tr>
        </thead>
        <tbody>
          {medicaments.map((med) => (
            <tr key={med.id}>
              <td className="p-3 border-b">{med.nom}</td>
              <td className="p-3 border-b">{med.dosage}</td>
              <td className="p-3 border-b">{med.categorie}</td>
              <td className="p-3 border-b">{med.quantite}</td>
              <td className="p-3 border-b">{med.prix}</td>
              <td className="p-3 border-b">{med.dateExpiration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventaire;
