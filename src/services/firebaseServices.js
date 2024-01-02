import dayjs from "dayjs";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
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
      apiKey: "AIzaSyAEOglmJy2QnccVcwyUf8lZUSts4zfzG-4",
      authDomain: "drgo-aa24d.firebaseapp.com",
      projectId: "drgo-aa24d",
      storageBucket: "drgo-aa24d.appspot.com",
      messagingSenderId: "490035669777",
      appId: "1:490035669777:web:3c23f2dc9b473975f23ab0",
      measurementId: "G-Y5DY0ZXBQK",
    };

    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);
    // this.googleProvider = new GoogleAuthProvider();
    // this.facebookProvider = new FacebookAuthProvider();
    this.db = getFirestore(this.app);
  }

  login = (email, password) => {
    return signInWithEmailAndPassword(this.auth, email, password);
  };

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

  getListDoctors = async () => {
    try {
      const q = query(collection(this.db, "doctor"));
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
}

const FirebaseServices = new firebaseService();
export default FirebaseServices;
