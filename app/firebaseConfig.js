// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYwFhxQ8BQu_OOI4xvlbw6AKCDtq6x4_c",
  authDomain: "safetravels-ba48e.firebaseapp.com",
  projectId: "safetravels-ba48e",
  storageBucket: "safetravels-ba48e.firebasestorage.app",
  messagingSenderId: "128702550576",
  appId: "1:128702550576:web:1db5a27f32f2a0310993f5",
  measurementId: "G-PVH0FYV07C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services
// const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app);
export { db };
// export { auth, db, storage };