import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0wxLkLR88CwUpHRKL0jPbvKIPczgIIxY",
  authDomain: "azurance-e0e3d.firebaseapp.com",
  projectId: "azurance-e0e3d",
  storageBucket: "azurance-e0e3d.appspot.com",
  messagingSenderId: "475065164682",
  appId: "1:475065164682:web:7dc5df5754d0fe01db1e73",
  measurementId: "G-1Q43F1R4KK",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
