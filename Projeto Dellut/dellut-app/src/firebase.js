import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Suas configurações do projeto dellut-app2
const firebaseConfig = {
  apiKey: "AIzaSyDWddRaCTg2B38pJSQF8O_W34J68N4iN8o",
  authDomain: "dellut-app2.firebaseapp.com",
  projectId: "dellut-app2",
  storageBucket: "dellut-app2.firebasestorage.app",
  messagingSenderId: "596284104038",
  appId: "1:596284104038:web:3e44beef85460f6261bca7",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o banco de dados para ser usado no Checklist
export const db = getFirestore(app);
