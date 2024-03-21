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
import axios from "axios";

const ToastNotification = ({ title, body }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
};

console.log(import.meta.env.VITE_API_KEY, "hehe");
class firebaseService {
  constructor() {
    this.firebaseConfig = {
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: import.meta.env.VITE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_ID,
      measurementId: import.meta.env.VITE_MEASUREMENT_ID,
      databaseURL: import.meta.env.VITE_DATABASE_URL,
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
      if (payload.notification) {
        const { title, body } = payload.notification;
        toast.info(<ToastNotification title={title} body={body} />);
      }
      // ...
    });
  }

  async onMessage() {}

  requestPermission() {
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
    const doctorRef = doc(this.db, "doctor", payload.doctor?.id);
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

  assignAppointment = async (appointmentId, payload) => {
    const appointmentRef = doc(this.db, "appointments", appointmentId);
    const doctorRef = doc(this.db, "doctor", payload?.doctor);

    if (appointmentRef) {
      updateDoc(appointmentRef, {
        visit_time: payload?.visit_time,
        doctor: doctorRef,
        status: "confirmed",
      });
    }
  };

  getAppointmentByDate = async (
    page = 0,
    pageSize,
    status,
    date,
    doctor,
    sortBy
  ) => {
    console.log("status", status);
    let q = query(
      collection(this.db, "appointments"),
      orderBy(sortBy || "visit_time")
    );

    const querySnapshot = await getDocs(q);

    const data = [];

    for (const doc of querySnapshot.docs) {
      const docData = doc.data();
      let doctor;
      if (docData.doctor) {
        doctor = await getDoc(docData.doctor);
      }
      // const insurance = await getDoc(docData.insurance);
      const patient = await getDoc(docData.patient);

      data.push({
        ...docData,
        doctor: doctor
          ? {
              ...doctor.data(),
              id: doctor.id,
            }
          : undefined,
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

    const filteredData = data.filter((elm) => {
      let isValid = true;

      if (date) {
        const [startDate, endDate] = date;
        if (startDate && !endDate) {
          isValid = dayjs(elm.startDate.toDate()).isSame(startDate, "day");
          if (!isValid) return false;
        }

        if (startDate && endDate) {
          isValid =
            (dayjs(elm.startDate.toDate()).isAfter(startDate, "day") ||
              dayjs(elm.startDate.toDate()).isSame(startDate, "day")) &&
            (dayjs(elm.startDate.toDate()).isBefore(endDate, "day") ||
              dayjs(elm.startDate.toDate()).isSame(endDate, "day"));
          if (!isValid) return false;
        }
      }

      if (status && status !== "all") {
        isValid = elm.status === status;
        if (!isValid) return false;
      }
      if (doctor) {
        isValid = elm?.doctor?.id === doctor;
        if (!isValid) return false;
      }
      return isValid;
    });

    const responseData = [];
    for (let i = 0 + pageSize * page; i < pageSize * (page + 1); i++) {
      if (!filteredData[i]) {
        break;
      }
      responseData.push(filteredData[i]);
    }

    return {
      responseData,
      totalPage: Math.ceil(filteredData.length / pageSize),
    };
  };

  updateAppointmentEndDate = async (id, endDate) => {
    const appointmentRef = doc(this.db, "appointments", id);

    if (appointmentRef) {
      await updateDoc(appointmentRef, {
        endDate: Timestamp.fromDate(endDate.toDate()),
      });
    }
  };

  sendNoti = async (listRegist, title, body) => {
    return axios.post(
      "https://fcm.googleapis.com/fcm/send",
      {
        registration_ids: listRegist,
        notification: {
          title,
          body,
          type: "appointment_update",
          mutable_content: true,
          sound: "Tri-tone",
        },
        data: {
          action_type: "update_status",
        },
      },
      {
        headers: {
          Authorization:
            "key=AAAAchhm6xE:APA91bGPZZ8II_22wr5KHsRQCaJiraV7gx3Pg1WMIRzb7GLKrMQbERHBGnnxuQO2wWzev7sOohHCrCARaf8iJ8iY-PJa2BwPnRaYLrYXjx24Va-C1fCnEjtYaUmRn-GrDwyfxQIUTz1J",
        },
      }
    );
  };

  updateAppointmentDelay = async (id, delayTime) => {
    const appointmentRef = doc(this.db, "appointments", id);

    if (appointmentRef) {
      await updateDoc(appointmentRef, {
        delayTime,
      });
    }
  };

  sendEmailChangeStatus = async (
    email,
    patientName,
    doctorName,
    newStatus,
    timeOrHospital
  ) => {
    return axios.post("https://api.emailjs.com/api/v1.0/email/send", {
      service_id: "service_rj5v25q",
      template_id: "template_lkekyp9",
      user_id: "p848yyVNrCz4R28tY",
      template_params: {
        patientName,
        toEmail: email,
        fromName: "DrGo",
        doctorName: doctorName,
        hospital: timeOrHospital || "DrGo Hospital",
        newStatus,
        reply_to: "",
        fromEmail: "thanhluan20880@gmail.com",
      },
    });
  };

  sendEmailDelayed = async (email, patientName, doctorName, delayTime) => {
    return axios.post("https://api.emailjs.com/api/v1.0/email/send", {
      service_id: "service_rj5v25q",
      template_id: "template_tib9kwe",
      user_id: "p848yyVNrCz4R28tY",
      template_params: {
        patientName,
        toEmail: email,
        fromName: "DrGo",
        doctorName: doctorName,
        delayTime,
      },
    });
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

  updateDoctor = async (id, payload) => {
    const doctorRef = doc(this.db, "doctor", id);

    if (doctorRef) {
      await updateDoc(doctorRef, {
        ...payload,
      });
    } else {
      throw new Error("Doctor not found");
    }
  };

  createDoctor = async (payload) => {
    await addDoc(collection(this.db, "doctor"), {
      ...payload,
      insurance: "Group Medical Flexi Insurance",
    });
  };

  deleteDoctor = async (id) => {
    const doctorRef = doc(this.db, "doctor", id);

    if (doctorRef) {
      await deleteDoc(doctorRef);
    } else {
      throw new Error("Doctor not found");
    }
  };

  getAllPatient = async () => {
    try {
      const q = query(collection(this.db, "patient"));
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

  deletePatient = async (id) => {
    const patientRef = doc(this.db, "patient", id);

    if (patientRef) {
      await deleteDoc(patientRef);
    } else {
      throw new Error("Patient not found");
    }
  };

  createPatient = async (payload) => {
    await addDoc(collection(this.db, "patient"), {
      ...payload,
    });
  };

  updatePatient = async (id, payload) => {
    const patientRef = doc(this.db, "patient", id);

    console.log("payload", payload);
    if (patientRef) {
      await updateDoc(patientRef, {
        ...payload,
      });
    } else {
      throw new Error("Patient not found");
    }
  };

  getListPatient = async (page = 1, pageSize = 1000, patientName) => {
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
    const startDateFilter = dayjs(startDate);
    const endDateFilter = dayjs(endDate);

    // const doctorRef = doc(this.db, "doctor", doctor);

    const q = query(
      collection(this.db, "schedule"),
      orderBy("startDate")
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
      const startDateItem = dayjs(item.startDate);
      const endDateItem = dayjs(item.endDate);

      if (item.doctor !== doctor) {
        return false;
      }

      if (
        startDateItem.isBefore(startDateFilter) &&
        endDateItem.isBefore(startDateFilter)
      ) {
        return false;
      }

      if (
        startDateItem.isAfter(endDateFilter) &&
        endDateItem.isAfter(endDateFilter)
      ) {
        return false;
      }

      return true;
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
