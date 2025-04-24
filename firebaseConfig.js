import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore} from "firebase/firestore";
//import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyAYwFhxQ8BQu_OOI4xvlbw6AKCDtq6x4_c",
    authDomain: "safetravels-ba48e.firebaseapp.com",
    projectId: "safetravels-ba48e",
    storageBucket: "safetravels-ba48e.firebasestorage.app",
    messagingSenderId: "128702550576",
    appId: "1:128702550576:web:1db5a27f32f2a0310993f5",
    measurementId: "G-PVH0FYV07C"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export {db, auth};
