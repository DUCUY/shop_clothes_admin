// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-qdOQeAEvtzTlP-2kWSLMdmZdKqN3VYI",
  authDomain: "shop-482ea.firebaseapp.com",
  projectId: "shop-482ea",
  storageBucket: "shop-482ea.appspot.com",
  messagingSenderId: "867362446457",
  appId: "1:867362446457:web:2af906aff67b00e11ec8a8",
//   measurementId: "G-PC8NVN6KEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
