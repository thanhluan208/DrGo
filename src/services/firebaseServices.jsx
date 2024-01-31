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

import { getMessaging, getToken, onMessage } from "firebase/messaging";

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
  FieldPath,
} from "firebase/firestore";
import useToast from "../hooks/useToast";
import { toast } from "react-toastify";

const ToastNotification = ({ title, body }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
};
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
    this.messaging = getMessaging(this.app);
    getToken(this.messaging, {
      vapidKey: this.messaging.vapidKey,
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("currentToken", currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.log("err", err);
      });

    onMessage(this.messaging, (payload) => {
      console.log("Message received. ", payload);
      if (payload.notification) {
        const { title, body } = payload.notification;
        toast.info(<ToastNotification title={title} body={body} />);
      }
      // ...
    });
  }

  async onMessage() {}

  requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
      console.log("permission", permission);
    });
  }

  updateStatus(appointmentId, status) {
    console.log("update status");
    set(ref(this.realtimeDB, "appointments/" + appointmentId), {
      status: status,
    });
  }

  readStatus(appointmentId, setAppointmentStatus) {
    const statusRef = ref(this.realtimeDB, "appointments/" + appointmentId);
    console.log("appointmentId", appointmentId);
    onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAppointmentStatus(data.status);
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
    const doctorRef = doc(this.db, "doctor", payload.doctor);
    // const insuranceRef = doc(this.db, "insurance", payload.insurance);
    const patientRef = doc(this.db, "patient", payload.patient);

    await addDoc(collection(this.db, "appointments"), {
      ...payload,
      startDate: Timestamp.fromDate(payload.startDate),
      endDate: Timestamp.fromDate(payload.endDate),
      doctor: doctorRef,
      // insurance: insuranceRef,
      insurance: "",
      patient: patientRef,
    });
  };

  getAppointmentByDate = async (date, pageSize) => {
    // const startDate = Timestamp.fromDate(date?.startOf("day")?.toDate());
    // const endDate = Timestamp.fromDate(date?.endOf("day")?.toDate());

    // if (!startDate || !endDate) return;
    const q = query(
      collection(this.db, "appointments"),
      // where("startDate", ">=", startDate),
      // where("startDate", "<=", endDate),
      orderBy("startDate")
      // limit(pageSize)
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

    const responseData = [];
    for (let i = 0; i < pageSize; i++) {
      responseData.push(data[i]);
    }

    return responseData;
  };

  updateAppointmentEndDate = async (id, endDate) => {
    const appointmentRef = doc(this.db, "appointments", id);

    if (appointmentRef) {
      await updateDoc(appointmentRef, {
        endDate: Timestamp.fromDate(endDate.toDate()),
      });
    }
  };

  updateAppointment = async (id, payload) => {
    const appointmentRef = doc(this.db, "appointments", id);
    const doctorRef = doc(this.db, "doctor", payload.doctor);
    const patientRef = doc(this.db, "patient", payload.patient);

    if (appointmentRef) {
      await updateDoc(appointmentRef, {
        ...payload,
        doctor: doctorRef,
        patient: patientRef,
      });
    }
  };

  updateAppointmentStatus = async (id, status) => {
    const appointmentRef = doc(this.db, "appointments", id);

    if (appointmentRef) {
      await updateDoc(appointmentRef, {
        status,
      });
    }
  };

  updateAppointmentByDrag = async (id, payload) => {
    const { doctor, startDate, endDate } = payload;

    const appointmentRef = doc(this.db, "appointments", id);
    const doctorRef = doc(this.db, "doctor", doctor);

    if (appointmentRef) {
      await updateDoc(appointmentRef, {
        startDate: Timestamp.fromDate(startDate),
        endDate: Timestamp.fromDate(endDate),
        doctor: doctorRef,
      });
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

  getDoctorById = async (id) => {
    try {
      const doctorRef = await getDoc(doc(this.db, "doctor", id));
      return doctorRef.data();
    } catch (err) {
      console.log("err", err);
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

  createSchedule = async (payload) => {
    const startDate = Timestamp.fromDate(payload.startDate);
    const endDate = Timestamp.fromDate(payload.endDate);
    const startTime = Timestamp.fromDate(payload.startTime);
    const endTime = Timestamp.fromDate(payload.endTime);

    await addDoc(collection(this.db, "schedule"), {
      repeatOn: payload?.repeatOn,
      doctor: payload?.doctor,
      startDate,
      endDate,
      startTime,
      endTime,
    });
  };

  getSchedules = async (payload) => {
    const { doctor, startDate, endDate } = payload;

    // const doctorRef = doc(this.db, "doctor", doctor);

    const q = query(
      collection(this.db, "schedule"),
      orderBy("startDate"),
      where("startDate", "<=", Timestamp.fromDate(endDate))
      // where("endDate", ">=", Timestamp.fromDate(startDate))
    );

    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => {
      const schedule = doc.data();

      return {
        ...schedule,
        startTime: schedule.startTime.toDate(),
        endTime: schedule.endTime.toDate(),
        startDate: schedule.startDate.toDate(),
        endDate: schedule.endDate.toDate(),
        id: doc.id,
      };
    });

    const filteredData = data.filter((item) => {
      return item.doctor === doctor;
    });

    return filteredData;
  };

  updateSchedule = async (payload) => {
    const { startDate, endDate, startTime, endTime, id, repeatOn } =
      payload || {};
    const scheduleRef = doc(this.db, "schedule", id);

    if (scheduleRef) {
      await updateDoc(scheduleRef, {
        repeatOn,
        startDate: Timestamp.fromDate(startDate),
        endDate: Timestamp.fromDate(endDate),
        startTime: Timestamp.fromDate(startTime),
        endTime: Timestamp.fromDate(endTime),
      });
    }
  };

  deleteSchedule = async (id) => {
    try {
      const scheduleRef = doc(this.db, "schedule", id);

      if (scheduleRef) {
        await deleteDoc(scheduleRef);
      }
    } catch (error) {
      console.log("err", error);
    }
  };
}

const FirebaseServices = new firebaseService();
export default FirebaseServices;
