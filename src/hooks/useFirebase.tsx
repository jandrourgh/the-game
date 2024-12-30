// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyB4XoyW9vOYzYaDgv-2n_MsRuc7nC0QEvM",
	authDomain: "the-game-8a04b.firebaseapp.com",
	projectId: "the-game-8a04b",
	storageBucket: "the-game-8a04b.firebasestorage.app",
	messagingSenderId: "238413446928",
	appId: "1:238413446928:web:656d4c80e949fd20982f95",
	measurementId: "G-GH7Z9QZX1W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const useFirebase = () => {
	return { app, analytics };
};
