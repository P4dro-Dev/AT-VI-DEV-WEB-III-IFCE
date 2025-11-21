import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAOM0N_npNzSKSYVf39ZAiKVCeKfzq822A",
  authDomain: "studytasks-vue-firebase.firebaseapp.com",
  projectId: "studytasks-vue-firebase",
  storageBucket: "studytasks-vue-firebase.firebasestorage.app",
  messagingSenderId: "474777591592",
  appId: "1:474777591592:web:013f26195b3b340d7aba1d",
  measurementId: "G-38CY138YRE"
};

const app = initializeApp(firebaseConfig);
try {
  const analytics = getAnalytics(app);
} catch (e) {
  console.warn('Analytics init failed', e);
}

export default app;
