import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

//config files for the firestore database
const config = {
  apiKey: "AIzaSyBw3reszJiXFt5lkJDXvrPI_x_31BW9j8Q",
  authDomain: "socialape-201b4.firebaseapp.com",
  projectId: "socialape-201b4",
  storageBucket: "socialape-201b4.appspot.com",
  messagingSenderId: "692426299178",
  appId: "1:692426299178:web:6eec085f89409d21d47053",
};

export const app = initializeApp(config);

export const storage = getStorage(app);
