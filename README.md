SmartPharma 237 💊

Application web de gestion de pharmacie pour la gestion des médicaments, stocks et ventes en temps réel.

### Page Médicaments

![Médicaments](https://raw.githubusercontent.com/gattdaniel/smartpharma237/main/screenshots/medicaments.png)

### Page Alertes

![Alertes](https://raw.githubusercontent.com/gattdaniel/smartpharma237/main/screenshots/alertes.png)

### Page Ventes

![Ventes](https://raw.githubusercontent.com/gattdaniel/smartpharma237/main/screenshots/ventes.png)

### Page Inventaire

![Inventaire](https://raw.githubusercontent.com/gattdaniel/smartpharma237/main/screenshots/inventaire.png)

✨ Fonctionnalités

💊 Enregistrement des médicaments (nom, dosage, catégorie, prix, quantité, date d'expiration)
🚨 Alertes automatiques — rupture de stock (quantité < 5 unités)
📅 Alertes automatiques — expiration dans moins de 30 jours
🛒 Enregistrement des ventes avec mise à jour automatique du stock
🔒 Protection contre les ventes si stock insuffisant
📋 Rapport d'inventaire exportable en CSV (compatible Excel)
⚡ Synchronisation Firebase en temps réel
📭 Interface responsive et intuitive

🛠️ Technologies utilisées

TechnologieRôleReact JS 18Interface utilisateur — composants réactifsFirebase FirestoreBase de données NoSQL en temps réelTailwind CSS 3Style et mise en page responsiveReact Router DOM 6Navigation SPA sans rechargementVite 5Outil de build et serveur de développement

🚀 Accès à l'application

👉 smartpharma237.netlify.app

⚙️ Installation locale

Prérequis

Node.js v18+
npm v9+
Compte Firebase (gratuit)

Étapes

bash# 1. Cloner le projet
git clone https://github.com/gattdaniel/smartpharma237.git
cd smartpharma237

# 2. Installer les dépendances

npm install

# 3. Configurer Firebase (voir section ci-dessous)

# 4. Lancer l'application

npm run dev

# 5. Ouvrir dans le navigateur

# http://localhost:5173

🔥 Configuration Firebase

Ouvrir src/firebase.js et remplacer par votre configuration :

javascriptconst firebaseConfig = {
apiKey: "VOTRE_API_KEY",
authDomain: "votre-projet.firebaseapp.com",
projectId: "votre-projet",
storageBucket: "votre-projet.appspot.com",
messagingSenderId: "VOTRE_ID",
appId: "VOTRE_APP_ID"
};

Règles Firestore

Dans Console Firebase → Firestore → Règles :

javascriptrules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /medicaments/{id} {
allow read, write: if true;
}
match /ventes/{id} {
allow read, write: if true;
}
}
}

📁 Structure du projet

smartpharma237/
├── src/
│ ├── firebase.js ← Configuration Firebase
│ ├── App.jsx ← Routage principal
│ ├── index.css ← Tailwind CSS
│ ├── main.jsx ← Point d'entrée
│ ├── components/
│ │ └── Navbar.jsx ← Barre de navigation
│ └── pages/
│ ├── Medicaments.jsx ← Gestion des médicaments
│ ├── Ventes.jsx ← Enregistrement des ventes
│ ├── Alertes.jsx ← Alertes stock et expiration
│ └── Inventaire.jsx ← Rapport et export CSV
├── screenshots/ ← Captures d'écran
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md

🧪 Tests effectués

FonctionnalitéStatutAjout médicament + affichage temps réel✅Alerte rupture de stock (quantité < 5)✅Alerte expiration (moins de 30 jours)✅Enregistrement vente✅Mise à jour stock automatique✅Blocage si stock insuffisant✅Export CSV inventaire✅Navigation SPA fluide✅

👨‍💻 Auteur

TAMDIENG TCHABDA GUY ALAIN
Matricule : 22I00690
ENSPD — Université de Douala
Département GIT — Niveau 3 Génie Logiciel
Année Académique 2025–2026

📄 Licence

Projet académique — ENSPD Douala 2025–2026
