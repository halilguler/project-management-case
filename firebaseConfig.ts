import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC8RydOrmeQIDDSitO1niNyyCjzpNJAjhc",
  authDomain: "product-management-f3d80.firebaseapp.com",
  databaseURL: "https://product-management-f3d80-default-rtdb.firebaseio.com",
  projectId: "product-management-f3d80",
  storageBucket: "product-management-f3d80.appspot.com",
  messagingSenderId: "969318489078",
  appId: "1:969318489078:web:8602fea2a9f519fc6885d7",
  measurementId: "G-BWJEEL8FD7",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
