import dayjs from "dayjs";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

class firebaseService {
  constructor() {
    this.firebaseConfig = {
      apiKey: "AIzaSyBZsBG4gzgzX-195H0tL7NHrpK3wN0COk8",
      authDomain: "dr-go-84189.firebaseapp.com",
      projectId: "dr-go-84189",
      storageBucket: "dr-go-84189.appspot.com",
      messagingSenderId: "369956554223",
      appId: "1:369956554223:web:e06a4e38801eb83be1e21a",
    };

    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);
    // this.googleProvider = new GoogleAuthProvider();
    // this.facebookProvider = new FacebookAuthProvider();
    this.db = getFirestore(this.app);
  }

  logInWithGoogle = async () => {
    const res = await signInWithPopup(this.auth, this.googleProvider);
    const user = res.user;

    return user;
  };

  logInWithFacebook = async () => {
    const res = await signInWithPopup(this.auth, this.facebookProvider);
    const user = res.user;

    return user;
  };

  createAppointment = async (payload) => {
    await addDoc(collection(this.db, "appointments"), payload);
  };

  getAppointmentByDate = async (date, pageSize) => {
    const startDate = date?.startOf("day")?.toDate().valueOf();
    const endDate = date?.endOf("day")?.toDate().valueOf();
    if (!startDate || !endDate) return;
    try {
      const q = query(
        collection(this.db, "appointments"),
        where("startDate", ">=", startDate),
        where("startDate", "<=", endDate),
        limit(pageSize)
      );

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      return data;
    } catch (error) {
      console.log("err", error);
    }
  };

  updateAppointment = async (id, payload) => {
    try {
      const appointmentRef = doc(this.db, "appointments", id);

      if (appointmentRef) {
        await updateDoc(appointmentRef, payload);
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  deleteAppointment = async (id) => {
    try {
      const appointmentRef = doc(this.db, "appointments", id);

      if (appointmentRef) {
        await deleteDoc(appointmentRef);
      }
    } catch (error) {
      console.log("err", error);
    }
  };
}

const FirebaseServices = new firebaseService();
export default FirebaseServices;
