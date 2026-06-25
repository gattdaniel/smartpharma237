// On importe les outils Firebase dont on a besoin
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Ta configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAxzzVD_cq9TjKE4lsrXq-xzrpk1jG7zXM",
  authDomain: "todo-list-5e91d.firebaseapp.com",
  projectId: "todo-list-5e91d",
  storageBucket: "todo-list-5e91d.firebasestorage.app",
  messagingSenderId: "955816342248",
  appId: "1:955816342248:web:a0ed9446633e1024ff4f5d"
}

// On initialise Firebase
const app = initializeApp(firebaseConfig)

// On initialise Firestore (notre base de données)
export const db = getFirestore(app)