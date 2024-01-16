import dayjs from "dayjs";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  or,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import useToast from "../hooks/useToast";

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
      databaseURL:
        "https://drgo-aa24d-default-rtdb.asia-southeast1.firebasedatabase.app",
    };

    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);
    // this.googleProvider = new GoogleAuthProvider();
    // this.facebookProvider = new FacebookAuthProvider();
    this.db = getFirestore(this.app);
    this.realtimeDB = getDatabase(this.app);
  }

  writeUserData(userId, name, email) {
    set(ref(this.realtimeDB, "users/" + userId), {
      username: name,
      email: email,
    });
  }

  readUserData(userId, setUserInfo) {
    const userInfoRef = ref(this.realtimeDB, "users/" + userId);

    onValue(userInfoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserInfo(data);
      } else {
        console.log("No data available");
      }
    });
  }

  signUp = (email, password) => {
    return createUserWithEmailAndPassword(this.auth, email, password);
  };

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
    console.log("payload", payload);
    const doctorRef = doc(this.db, "doctor", payload.doctor);
    const insuranceRef = doc(this.db, "insurance", payload.insurance);
    const patientRef = doc(this.db, "patient", payload.patient);

    await addDoc(collection(this.db, "appointments"), {
      ...payload,
      doctor: doctorRef,
      insurance: insuranceRef,
      patient: patientRef,
    });
  };

  getAppointmentByDate = async (date, pageSize) => {
    const startDate = Timestamp.fromDate(date?.startOf("day")?.toDate());
    const endDate = Timestamp.fromDate(date?.endOf("day")?.toDate());

    if (!startDate || !endDate) return;
    const q = query(
      collection(this.db, "appointments"),
      where("startDate", ">=", startDate),
      where("startDate", "<=", endDate),
      limit(pageSize)
    );

    const querySnapshot = await getDocs(q);

    const data = [];

    for (const doc of querySnapshot.docs) {
      const docData = doc.data();

      const doctor = await getDoc(docData.doctor);
      // const insurance = await getDoc(docData.insurance);
      const patient = await getDoc(docData.patient);

      data.push({
        ...docData,
        doctor: {
          ...doctor.data(),
          id: doctor.id,
        },
        // insurance: {
        //   ...insurance.data(),
        //   id: insurance.id,
        // },
        patient: {
          ...patient.data(),
          id: patient.id,
        },
        id: doc.id,
      });
    }

    return data;
  };

  updateAppointment = async (id, payload) => {
    try {
      const appointmentRef = doc(this.db, "appointments", id);
      const doctorRef = doc(this.db, "doctor", payload.doctor);

      if (appointmentRef) {
        await updateDoc(appointmentRef, {
          ...payload,
          doctor: doctorRef,
        });
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

  getListPatient = async (page, pageSize, patientName) => {
    try {
      let q;
      if (page === 1) {
        this.lastVisiblePatient = null;
        q = query(
          collection(this.db, "patient"),
          // where("name", ">= ", patientName),
          orderBy("email"),
          limit(pageSize)
        );
      } else {
        q = query(
          collection(this.db, "patient"),
          // where("name", ">= ", patientName),
          orderBy("email"),
          startAfter(this.lastVisiblePatient),
          limit(pageSize)
        );
      }
      const querySnapshot = await getDocs(q);

      this.lastVisiblePatient =
        querySnapshot.docs[querySnapshot.docs.length - 1];

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

  getAllDocs = async (collectionName) => {
    try {
      const q = query(collection(this.db, collectionName));
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
      useToast(error?.message || "Something went wrong", "error");
    }
  };
}

const FirebaseServices = new firebaseService();
export default FirebaseServices;
