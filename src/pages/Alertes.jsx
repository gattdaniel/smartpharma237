import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function Alertes() {
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
  const ruptures = medicaments.filter((med) => med.quantite < 5);

  const aujourdhui = new Date();
  const dans30jours = new Date();
  dans30jours.setDate(aujourdhui.getDate() + 30);

  const expirations = medicaments.filter((med) => {
    const dateExp = new Date(med.dateExpiration);
    return dateExp <= dans30jours;
  });
  return (
    <div>
      <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-red-600 mb-6">🚨 Alertes</h1>

        {/* Ruptures de stock */}
        <h2 className="text-xl font-bold text-orange-500 mb-3">
          📦 Ruptures de stock ({ruptures.length})
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {ruptures.map((med) => (
            <div
              key={med.id}
              className="bg-white rounded-xl shadow p-4 border-l-4 border-orange-500"
            >
              <h3 className="font-bold text-orange-600">{med.nom}</h3>
              <p className="text-sm text-gray-600">
                📦 Quantité : {med.quantite}
              </p>
            </div>
          ))}
        </div>

        {/* Expirations */}
        <h2 className="text-xl font-bold text-red-500 mb-3">
          📅 Expirations proches ({expirations.length})
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {expirations.map((med) => (
            <div
              key={med.id}
              className="bg-white rounded-xl shadow p-4 border-l-4 border-red-500"
            >
              <h3 className="font-bold text-red-600">{med.nom}</h3>
              <p className="text-sm text-gray-600">
                📅 Expiration : {med.dateExpiration}
              </p>
            </div>
          ))}
        </div>
      </div>
      )
    </div>
  );
}

export default Alertes;
