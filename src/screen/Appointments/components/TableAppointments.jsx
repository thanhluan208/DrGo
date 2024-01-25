import React from "react";
import CommonStyles from "../../../components/CommonStyles";
import Edit from "../../../assets/icons/Edit";
import Delete from "../../../assets/icons/Delete";
import useFilter from "../../../hooks/useFilter";
import useGetListAppointment from "../../../hooks/appointments/useGetListAppointment";
import ButtonEditAppointment from "./ButtonEditAppointment";

const data = [
  {
    name: "Patient 3mPLtIiQlNKNwdMqg96K",
    doctor: {
      email: "clinic@gmail.com",
      name: "Gleneagles Hospital",
      clinic: true,
      description: "Wong Chuk Hang, Hong Kong",
      insurance: {
        converter: null,
        _key: {
          path: {
            segments: [
              "projects",
              "drgo-aa24d",
              "databases",
              "(default)",
              "documents",
              "insurance",
              "kP4S2EybzV77bIWY0axm",
            ],
            offset: 5,
            len: 2,
          },
        },
        type: "document",
        firestore: {
          app: {
            _isDeleted: false,
            _options: {
              apiKey: "AIzaSyAEOglmJy2QnccVcwyUf8lZUSts4zfzG-4",
              authDomain: "drgo-aa24d.firebaseapp.com",
              projectId: "drgo-aa24d",
              storageBucket: "drgo-aa24d.appspot.com",
              messagingSenderId: "490035669777",
              appId: "1:490035669777:web:3c23f2dc9b473975f23ab0",
              measurementId: "G-Y5DY0ZXBQK",
              databaseURL:
                "https://drgo-aa24d-default-rtdb.asia-southeast1.firebasedatabase.app",
            },
            _config: {
              name: "[DEFAULT]",
              automaticDataCollectionEnabled: false,
            },
            _name: "[DEFAULT]",
            _automaticDataCollectionEnabled: false,
            _container: {
              name: "[DEFAULT]",
              providers: {},
            },
          },
          databaseId: {
            projectId: "drgo-aa24d",
            database: "(default)",
          },
          settings: {
            host: "firestore.googleapis.com",
            ssl: true,
            ignoreUndefinedProperties: false,
            cacheSizeBytes: 41943040,
            experimentalForceLongPolling: false,
            experimentalAutoDetectLongPolling: true,
            experimentalLongPollingOptions: {},
            useFetchStreams: true,
          },
        },
      },
      about:
        "A general description about the doctor, her expertise, and years of experience in the industry. Usually a 2 to 3 liners",
      id: "5bacuxE27gYGOQJLmNqh",
    },
    endDate: "2024-01-24T07:28:00.000Z",
    id: "FtTQHupZqfuOTp0VNI4h",
    insurance: null,
    patient: {
      email: "ostarcp3412@gmail.com",
      is_employee: false,
      phone_number: "0399924717",
      id: "3mPLtIiQlNKNwdMqg96K",
    },
    startDate: "2024-01-24T06:30:00.000Z",
    type: "scheduled",
    status: 1,
    symptoms: "",
    visitedBefore: false,
    visitTime: "13:30-14:28",
    date: "24/01/2024",
  },
  {
    name: "Patient",
    doctor: {
      about:
        "A general description about the doctor, her expertise, and years of experience in the industry. Usually a 2 to 3 liners",
      insurance: {
        converter: null,
        _key: {
          path: {
            segments: [
              "projects",
              "drgo-aa24d",
              "databases",
              "(default)",
              "documents",
              "insurance",
              "kkrqbNUAsNRvIwBpDlQ9",
            ],
            offset: 5,
            len: 2,
          },
        },
        type: "document",
        firestore: {
          app: {
            _isDeleted: false,
            _options: {
              apiKey: "AIzaSyAEOglmJy2QnccVcwyUf8lZUSts4zfzG-4",
              authDomain: "drgo-aa24d.firebaseapp.com",
              projectId: "drgo-aa24d",
              storageBucket: "drgo-aa24d.appspot.com",
              messagingSenderId: "490035669777",
              appId: "1:490035669777:web:3c23f2dc9b473975f23ab0",
              measurementId: "G-Y5DY0ZXBQK",
              databaseURL:
                "https://drgo-aa24d-default-rtdb.asia-southeast1.firebasedatabase.app",
            },
            _config: {
              name: "[DEFAULT]",
              automaticDataCollectionEnabled: false,
            },
            _name: "[DEFAULT]",
            _automaticDataCollectionEnabled: false,
            _container: {
              name: "[DEFAULT]",
              providers: {},
            },
          },
          databaseId: {
            projectId: "drgo-aa24d",
            database: "(default)",
          },
          settings: {
            host: "firestore.googleapis.com",
            ssl: true,
            ignoreUndefinedProperties: false,
            cacheSizeBytes: 41943040,
            experimentalForceLongPolling: false,
            experimentalAutoDetectLongPolling: true,
            experimentalLongPollingOptions: {},
            useFetchStreams: true,
          },
        },
      },
      name: "Dr. Maria Watson",
      schedules: [
        {
          weekday: 0,
          hour: 12,
        },
        {
          weekday: 1,
          hour: 16,
        },
      ],
      description: "General Practitioner, Gleneagles Hospital Hong Kong",
      email: "user@gmail.com",
      clinic: false,
      id: "3bnAVG09GHCpi2i8UAZO",
    },
    endDate: "2024-01-23T14:00:00.994Z",
    id: "H7Rjo8g9c8oOwU5ImuPl",
    insurance: null,
    patient: {
      name: "Patient",
      email: "lhhai1999@gmail.com",
      is_employee: false,
      phone_number: "+8482302723",
      id: "GEBTUJjjms8eooeSwCTx",
    },
    startDate: "2024-01-23T13:00:00.994Z",
    type: "checkedIn",
    status: 5,
    symptoms: "",
    visitTime: "20:00-21:00",
    date: "23/01/2024",
  },
  {
    name: "Patient",
    doctor: {
      insurance: {
        converter: null,
        _key: {
          path: {
            segments: [
              "projects",
              "drgo-aa24d",
              "databases",
              "(default)",
              "documents",
              "insurance",
              "kP4S2EybzV77bIWY0axm",
            ],
            offset: 5,
            len: 2,
          },
        },
        type: "document",
        firestore: {
          app: {
            _isDeleted: false,
            _options: {
              apiKey: "AIzaSyAEOglmJy2QnccVcwyUf8lZUSts4zfzG-4",
              authDomain: "drgo-aa24d.firebaseapp.com",
              projectId: "drgo-aa24d",
              storageBucket: "drgo-aa24d.appspot.com",
              messagingSenderId: "490035669777",
              appId: "1:490035669777:web:3c23f2dc9b473975f23ab0",
              measurementId: "G-Y5DY0ZXBQK",
              databaseURL:
                "https://drgo-aa24d-default-rtdb.asia-southeast1.firebasedatabase.app",
            },
            _config: {
              name: "[DEFAULT]",
              automaticDataCollectionEnabled: false,
            },
            _name: "[DEFAULT]",
            _automaticDataCollectionEnabled: false,
            _container: {
              name: "[DEFAULT]",
              providers: {},
            },
          },
          databaseId: {
            projectId: "drgo-aa24d",
            database: "(default)",
          },
          settings: {
            host: "firestore.googleapis.com",
            ssl: true,
            ignoreUndefinedProperties: false,
            cacheSizeBytes: 41943040,
            experimentalForceLongPolling: false,
            experimentalAutoDetectLongPolling: true,
            experimentalLongPollingOptions: {},
            useFetchStreams: true,
          },
        },
      },
      clinic: true,
      email: "clinic@gmail.com",
      about:
        "A general description about the doctor, her expertise, and years of experience in the industry. Usually a 2 to 3 liners",
      description: "Wong Chuk Hang, Hong Kong",
      name: "Gleneagles Hospital",
      id: "5bacuxE27gYGOQJLmNqh",
    },
    endDate: "2024-01-19T04:00:37.500Z",
    id: "Jk4AvYz9ynx6pWJZ6Cvm",
    insurance: null,
    patient: {
      email: "lhhai1999@gmail.com",
      is_employee: false,
      phone_number: "+8482302723",
      name: "Patient",
      id: "GEBTUJjjms8eooeSwCTx",
    },
    startDate: "2024-01-19T02:00:00.000Z",
    type: "checkedIn",
    status: 5,
    symptoms: "",
    visitTime: "09:00-11:00",
    date: "19/01/2024",
  },
  {
    name: "Patient",
    doctor: {
      schedules: [
        {
          weekday: 0,
          hour: 12,
        },
        {
          hour: 16,
          weekday: 1,
        },
      ],
      insurance: {
        converter: null,
        _key: {
          path: {
            segments: [
              "projects",
              "drgo-aa24d",
              "databases",
              "(default)",
              "documents",
              "insurance",
              "kkrqbNUAsNRvIwBpDlQ9",
            ],
            offset: 5,
            len: 2,
          },
        },
        type: "document",
        firestore: {
          app: {
            _isDeleted: false,
            _options: {
              apiKey: "AIzaSyAEOglmJy2QnccVcwyUf8lZUSts4zfzG-4",
              authDomain: "drgo-aa24d.firebaseapp.com",
              projectId: "drgo-aa24d",
              storageBucket: "drgo-aa24d.appspot.com",
              messagingSenderId: "490035669777",
              appId: "1:490035669777:web:3c23f2dc9b473975f23ab0",
              measurementId: "G-Y5DY0ZXBQK",
              databaseURL:
                "https://drgo-aa24d-default-rtdb.asia-southeast1.firebasedatabase.app",
            },
            _config: {
              name: "[DEFAULT]",
              automaticDataCollectionEnabled: false,
            },
            _name: "[DEFAULT]",
            _automaticDataCollectionEnabled: false,
            _container: {
              name: "[DEFAULT]",
              providers: {},
            },
          },
          databaseId: {
            projectId: "drgo-aa24d",
            database: "(default)",
          },
          settings: {
            host: "firestore.googleapis.com",
            ssl: true,
            ignoreUndefinedProperties: false,
            cacheSizeBytes: 41943040,
            experimentalForceLongPolling: false,
            experimentalAutoDetectLongPolling: true,
            experimentalLongPollingOptions: {},
            useFetchStreams: true,
          },
        },
      },
      description: "General Practitioner, Gleneagles Hospital Hong Kong",
      about:
        "A general description about the doctor, her expertise, and years of experience in the industry. Usually a 2 to 3 liners",
      name: "Dr. Maria Watson",
      email: "user@gmail.com",
      clinic: false,
      id: "3bnAVG09GHCpi2i8UAZO",
    },
    endDate: "2024-01-24T19:00:00.000Z",
    id: "NkQ0RbAuR8hWFAoOVIOP",
    insurance: null,
    patient: {
      name: "Patient",
      phone_number: "+8482302723",
      email: "lhhai1999@gmail.com",
      is_employee: false,
      id: "GEBTUJjjms8eooeSwCTx",
    },
    startDate: "2024-01-24T18:00:00.000Z",
    type: "checkedIn",
    status: 5,
    symptoms: "",
    visitTime: "01:00-02:00",
    date: "25/01/2024",
  },
  {
    name: "Patient",
    doctor: {
      name: "Dr. Maria Watson",
      insurance: {
        converter: null,
        _key: {
          path: {
            segments: [
              "projects",
              "drgo-aa24d",
              "databases",
              "(default)",
              "documents",
              "insurance",
              "kkrqbNUAsNRvIwBpDlQ9",
            ],
            offset: 5,
            len: 2,
          },
        },
        type: "document",
        firestore: {
          app: {
            _isDeleted: false,
            _options: {
              apiKey: "AIzaSyAEOglmJy2QnccVcwyUf8lZUSts4zfzG-4",
              authDomain: "drgo-aa24d.firebaseapp.com",
              projectId: "drgo-aa24d",
              storageBucket: "drgo-aa24d.appspot.com",
              messagingSenderId: "490035669777",
              appId: "1:490035669777:web:3c23f2dc9b473975f23ab0",
              measurementId: "G-Y5DY0ZXBQK",
              databaseURL:
                "https://drgo-aa24d-default-rtdb.asia-southeast1.firebasedatabase.app",
            },
            _config: {
              name: "[DEFAULT]",
              automaticDataCollectionEnabled: false,
            },
            _name: "[DEFAULT]",
            _automaticDataCollectionEnabled: false,
            _container: {
              name: "[DEFAULT]",
              providers: {},
            },
          },
          databaseId: {
            projectId: "drgo-aa24d",
            database: "(default)",
          },
          settings: {
            host: "firestore.googleapis.com",
            ssl: true,
            ignoreUndefinedProperties: false,
            cacheSizeBytes: 41943040,
            experimentalForceLongPolling: false,
            experimentalAutoDetectLongPolling: true,
            experimentalLongPollingOptions: {},
            useFetchStreams: true,
          },
        },
      },
      schedules: [
        {
          hour: 12,
          weekday: 0,
        },
        {
          hour: 16,
          weekday: 1,
        },
      ],
      email: "user@gmail.com",
      about:
        "A general description about the doctor, her expertise, and years of experience in the industry. Usually a 2 to 3 liners",
      clinic: false,
      description: "General Practitioner, Gleneagles Hospital Hong Kong",
      id: "3bnAVG09GHCpi2i8UAZO",
    },
    endDate: "2024-01-22T17:00:00.000Z",
    id: "TfyjPOawbdyk85mloejz",
    insurance: null,
    patient: {
      email: "lhhai1999@gmail.com",
      phone_number: "+8482302723",
      name: "Patient",
      is_employee: false,
      id: "GEBTUJjjms8eooeSwCTx",
    },
    startDate: "2024-01-22T16:00:00.000Z",
    type: "checkedIn",
    status: 5,
    symptoms: "",
    visitTime: "23:00-00:00",
    date: "22/01/2024",
  },
  {
    name: "Patient",
    doctor: {
      insurance: {
        converter: null,
        _key: {
          path: {
            segments: [
              "projects",
              "drgo-aa24d",
              "databases",
              "(default)",
              "documents",
              "insurance",
              "kkrqbNUAsNRvIwBpDlQ9",
            ],
            offset: 5,
            len: 2,
          },
        },
        type: "document",
        firestore: {
          app: {
            _isDeleted: false,
            _options: {
              apiKey: "AIzaSyAEOglmJy2QnccVcwyUf8lZUSts4zfzG-4",
              authDomain: "drgo-aa24d.firebaseapp.com",
              projectId: "drgo-aa24d",
              storageBucket: "drgo-aa24d.appspot.com",
              messagingSenderId: "490035669777",
              appId: "1:490035669777:web:3c23f2dc9b473975f23ab0",
              measurementId: "G-Y5DY0ZXBQK",
              databaseURL:
                "https://drgo-aa24d-default-rtdb.asia-southeast1.firebasedatabase.app",
            },
            _config: {
              name: "[DEFAULT]",
              automaticDataCollectionEnabled: false,
            },
            _name: "[DEFAULT]",
            _automaticDataCollectionEnabled: false,
            _container: {
              name: "[DEFAULT]",
              providers: {},
            },
          },
          databaseId: {
            projectId: "drgo-aa24d",
            database: "(default)",
          },
          settings: {
            host: "firestore.googleapis.com",
            ssl: true,
            ignoreUndefinedProperties: false,
            cacheSizeBytes: 41943040,
            experimentalForceLongPolling: false,
            experimentalAutoDetectLongPolling: true,
            experimentalLongPollingOptions: {},
            useFetchStreams: true,
          },
        },
      },
      clinic: false,
      schedules: [
        {
          hour: 12,
          weekday: 0,
        },
        {
          weekday: 1,
          hour: 16,
        },
      ],
      about:
        "A general description about the doctor, her expertise, and years of experience in the industry. Usually a 2 to 3 liners",
      email: "user@gmail.com",
      description: "General Practitioner, Gleneagles Hospital Hong Kong",
      name: "Dr. Maria Watson",
      id: "3bnAVG09GHCpi2i8UAZO",
    },
    endDate: "2024-01-19T11:00:00.000Z",
    id: "bO1hSVcR9RZkjuojTnDH",
    insurance: null,
    patient: {
      phone_number: "+8482302723",
      is_employee: false,
      email: "lhhai1999@gmail.com",
      name: "Patient",
      id: "GEBTUJjjms8eooeSwCTx",
    },
    startDate: "2024-01-19T10:00:00.000Z",
    type: "checkedIn",
    status: 1,
    symptoms: "",
    visitTime: "17:00-18:00",
    date: "19/01/2024",
  },
  {
    name: "Patient 7ZGt5KMmU32VTOEqKcH5",
    doctor: {
      description: "General Practitioner, Gleneagles Hospital Hong Kong",
      name: "Dr. Maria Watson",
      schedules: [
        {
          weekday: 0,
          hour: 12,
        },
        {
          hour: 16,
          weekday: 1,
        },
      ],
      about:
        "A general description about the doctor, her expertise, and years of experience in the industry. Usually a 2 to 3 liners",
      clinic: false,
      email: "user@gmail.com",
      insurance: {
        converter: null,
        _key: {
          path: {
            segments: [
              "projects",
              "drgo-aa24d",
              "databases",
              "(default)",
              "documents",
              "insurance",
              "kkrqbNUAsNRvIwBpDlQ9",
            ],
            offset: 5,
            len: 2,
          },
        },
        type: "document",
        firestore: {
          app: {
            _isDeleted: false,
            _options: {
              apiKey: "AIzaSyAEOglmJy2QnccVcwyUf8lZUSts4zfzG-4",
              authDomain: "drgo-aa24d.firebaseapp.com",
              projectId: "drgo-aa24d",
              storageBucket: "drgo-aa24d.appspot.com",
              messagingSenderId: "490035669777",
              appId: "1:490035669777:web:3c23f2dc9b473975f23ab0",
              measurementId: "G-Y5DY0ZXBQK",
              databaseURL:
                "https://drgo-aa24d-default-rtdb.asia-southeast1.firebasedatabase.app",
            },
            _config: {
              name: "[DEFAULT]",
              automaticDataCollectionEnabled: false,
            },
            _name: "[DEFAULT]",
            _automaticDataCollectionEnabled: false,
            _container: {
              name: "[DEFAULT]",
              providers: {},
            },
          },
          databaseId: {
            projectId: "drgo-aa24d",
            database: "(default)",
          },
          settings: {
            host: "firestore.googleapis.com",
            ssl: true,
            ignoreUndefinedProperties: false,
            cacheSizeBytes: 41943040,
            experimentalForceLongPolling: false,
            experimentalAutoDetectLongPolling: true,
            experimentalLongPollingOptions: {},
            useFetchStreams: true,
          },
        },
      },
      id: "3bnAVG09GHCpi2i8UAZO",
    },
    endDate: "2024-01-24T08:56:52.500Z",
    id: "g2jzxPpTwKKxnMFuy1Ww",
    insurance: "",
    patient: {
      is_employee: false,
      email: "doanthanh58812@gmail.com",
      phone_number: "1232323",
      id: "7ZGt5KMmU32VTOEqKcH5",
    },
    startDate: "2024-01-24T07:30:00.000Z",
    type: "checkedIn",
    status: 1,
    symptoms: "",
    visitedBefore: false,
    visitTime: "14:30-15:56",
    date: "24/01/2024",
  },
  {
    name: "Patient",
    doctor: {
      clinic: false,
      email: "user@gmail.com",
      schedules: [
        {
          weekday: 0,
          hour: 12,
        },
        {
          hour: 16,
          weekday: 1,
        },
      ],
      description: "General Practitioner, Gleneagles Hospital Hong Kong",
      about:
        "A general description about the doctor, her expertise, and years of experience in the industry. Usually a 2 to 3 liners",
      name: "Dr. Maria Watson",
      insurance: {
        converter: null,
        _key: {
          path: {
            segments: [
              "projects",
              "drgo-aa24d",
              "databases",
              "(default)",
              "documents",
              "insurance",
              "kkrqbNUAsNRvIwBpDlQ9",
            ],
            offset: 5,
            len: 2,
          },
        },
        type: "document",
        firestore: {
          app: {
            _isDeleted: false,
            _options: {
              apiKey: "AIzaSyAEOglmJy2QnccVcwyUf8lZUSts4zfzG-4",
              authDomain: "drgo-aa24d.firebaseapp.com",
              projectId: "drgo-aa24d",
              storageBucket: "drgo-aa24d.appspot.com",
              messagingSenderId: "490035669777",
              appId: "1:490035669777:web:3c23f2dc9b473975f23ab0",
              measurementId: "G-Y5DY0ZXBQK",
              databaseURL:
                "https://drgo-aa24d-default-rtdb.asia-southeast1.firebasedatabase.app",
            },
            _config: {
              name: "[DEFAULT]",
              automaticDataCollectionEnabled: false,
            },
            _name: "[DEFAULT]",
            _automaticDataCollectionEnabled: false,
            _container: {
              name: "[DEFAULT]",
              providers: {},
            },
          },
          databaseId: {
            projectId: "drgo-aa24d",
            database: "(default)",
          },
          settings: {
            host: "firestore.googleapis.com",
            ssl: true,
            ignoreUndefinedProperties: false,
            cacheSizeBytes: 41943040,
            experimentalForceLongPolling: false,
            experimentalAutoDetectLongPolling: true,
            experimentalLongPollingOptions: {},
            useFetchStreams: true,
          },
        },
      },
      id: "3bnAVG09GHCpi2i8UAZO",
    },
    endDate: "2024-01-25T09:00:00.000Z",
    id: "hSnlhwKo1VfkDRb90Hbm",
    insurance: null,
    patient: {
      is_employee: false,
      email: "doanthanh588@gmail.com",
      phone_number: "+84823072823",
      name: "Patient",
      id: "P8Iwa7fSuxVxUsUuK0ZR",
    },
    startDate: "2024-01-25T08:00:00.000Z",
    type: "checkedIn",
    status: 5,
    symptoms: "",
    visitTime: "15:00-16:00",
    date: "25/01/2024",
  },
  {
    name: "Hai",
    doctor: {
      email: "user1@gmail.com",
      insurance: {
        converter: null,
        _key: {
          path: {
            segments: [
              "projects",
              "drgo-aa24d",
              "databases",
              "(default)",
              "documents",
              "insurance",
              "kP4S2EybzV77bIWY0axm",
            ],
            offset: 5,
            len: 2,
          },
        },
        type: "document",
        firestore: {
          app: {
            _isDeleted: false,
            _options: {
              apiKey: "AIzaSyAEOglmJy2QnccVcwyUf8lZUSts4zfzG-4",
              authDomain: "drgo-aa24d.firebaseapp.com",
              projectId: "drgo-aa24d",
              storageBucket: "drgo-aa24d.appspot.com",
              messagingSenderId: "490035669777",
              appId: "1:490035669777:web:3c23f2dc9b473975f23ab0",
              measurementId: "G-Y5DY0ZXBQK",
              databaseURL:
                "https://drgo-aa24d-default-rtdb.asia-southeast1.firebasedatabase.app",
            },
            _config: {
              name: "[DEFAULT]",
              automaticDataCollectionEnabled: false,
            },
            _name: "[DEFAULT]",
            _automaticDataCollectionEnabled: false,
            _container: {
              name: "[DEFAULT]",
              providers: {},
            },
          },
          databaseId: {
            projectId: "drgo-aa24d",
            database: "(default)",
          },
          settings: {
            host: "firestore.googleapis.com",
            ssl: true,
            ignoreUndefinedProperties: false,
            cacheSizeBytes: 41943040,
            experimentalForceLongPolling: false,
            experimentalAutoDetectLongPolling: true,
            experimentalLongPollingOptions: {},
            useFetchStreams: true,
          },
        },
      },
      schedules: [
        {
          hour: 14,
          weekday: 0,
        },
      ],
      clinic: false,
      description: "General Practitioner, Gleneagles Hospital Hong Kong",
      about:
        "A general description about the doctor, her expertise, and years of experience in the industry. Usually a 2 to 3 liners",
      name: "Dr. Emma Watson",
      id: "b82TjnKjTGRrOE7XDZO3",
    },
    endDate: "2024-01-23T09:00:00.000Z",
    id: "l6qEE3FrTtVDrsQylbMH",
    insurance: "",
    patient: {
      email: "hailh@gmail.com",
      phone_number: "0399924717",
      is_employee: false,
      name: "Hai",
      id: "lBlpBz41ksUfc5B08Y9F",
    },
    startDate: "2024-01-23T08:30:00.000Z",
    type: "checkedIn",
    status: 1,
    symptoms: "",
    visitedBefore: false,
    visitTime: "15:30-16:00",
    date: "23/01/2024",
  },
  {
    name: "Patient",
    doctor: {
      insurance: {
        converter: null,
        _key: {
          path: {
            segments: [
              "projects",
              "drgo-aa24d",
              "databases",
              "(default)",
              "documents",
              "insurance",
              "kkrqbNUAsNRvIwBpDlQ9",
            ],
            offset: 5,
            len: 2,
          },
        },
        type: "document",
        firestore: {
          app: {
            _isDeleted: false,
            _options: {
              apiKey: "AIzaSyAEOglmJy2QnccVcwyUf8lZUSts4zfzG-4",
              authDomain: "drgo-aa24d.firebaseapp.com",
              projectId: "drgo-aa24d",
              storageBucket: "drgo-aa24d.appspot.com",
              messagingSenderId: "490035669777",
              appId: "1:490035669777:web:3c23f2dc9b473975f23ab0",
              measurementId: "G-Y5DY0ZXBQK",
              databaseURL:
                "https://drgo-aa24d-default-rtdb.asia-southeast1.firebasedatabase.app",
            },
            _config: {
              name: "[DEFAULT]",
              automaticDataCollectionEnabled: false,
            },
            _name: "[DEFAULT]",
            _automaticDataCollectionEnabled: false,
            _container: {
              name: "[DEFAULT]",
              providers: {},
            },
          },
          databaseId: {
            projectId: "drgo-aa24d",
            database: "(default)",
          },
          settings: {
            host: "firestore.googleapis.com",
            ssl: true,
            ignoreUndefinedProperties: false,
            cacheSizeBytes: 41943040,
            experimentalForceLongPolling: false,
            experimentalAutoDetectLongPolling: true,
            experimentalLongPollingOptions: {},
            useFetchStreams: true,
          },
        },
      },
      schedules: [
        {
          hour: 12,
          weekday: 0,
        },
        {
          weekday: 1,
          hour: 16,
        },
      ],
      name: "Dr. Maria Watson",
      about:
        "A general description about the doctor, her expertise, and years of experience in the industry. Usually a 2 to 3 liners",
      email: "user@gmail.com",
      description: "General Practitioner, Gleneagles Hospital Hong Kong",
      clinic: false,
      id: "3bnAVG09GHCpi2i8UAZO",
    },
    endDate: "2024-01-24T19:00:00.000Z",
    id: "oflx2NfqEqjW2N4StuY3",
    insurance: null,
    patient: {
      phone_number: "+8482302723",
      email: "lhhai1999@gmail.com",
      name: "Patient",
      is_employee: false,
      id: "GEBTUJjjms8eooeSwCTx",
    },
    startDate: "2024-01-25T19:00:00.000Z",
    type: "checkedIn",
    status: 5,
    symptoms: "",
    visitTime: "02:00-02:00",
    date: "26/01/2024",
  },
];

const columns = [
  {
    id: "name",
    title: "Name",
    width: 160,
  },
  {
    id: "contact",
    title: "Contact",
    width: 241,
  },
  {
    id: "date",
    title: "Date",
    width: 96,
  },
  {
    id: "visitTime",
    title: "Visit Time",
    width: 118,
  },
  {
    id: "doctor",
    title: "Doctor",
    width: 200,
    renderContent: (props) => {
      const { doctor } = props;
      return (
        <CommonStyles.Typography type="normal14">
          {doctor?.name}
        </CommonStyles.Typography>
      );
    },
  },
  {
    id: "symptoms",
    title: "Symptoms",
  },
  {
    id: "action",
    title: "",
    renderContent: (props) => {
      return (
        <CommonStyles.Box
          centered
          sx={{
            display: "flex",
            gap: "12px",
            width: "100%",
          }}
        >
          <ButtonEditAppointment data={props} />
          <CommonStyles.IconButton>
            <CommonStyles.Box sx={{ padding: "8px" }}>
              <Delete />
            </CommonStyles.Box>
          </CommonStyles.IconButton>
        </CommonStyles.Box>
      );
    },
  },
];

const TableAppointments = () => {
  //! State
  const { filters } = useFilter({
    currentPage: 1,
    pageSize: 10,
  });

  const {
    data: listAppointment,
    isLoading: loadingListAppointment,
    error,
  } = useGetListAppointment(filters);

  //! Function

  //! Render
  return (
    <CommonStyles.Card>
      <CommonStyles.Table
        columns={columns}
        data={listAppointment}
        disabledCheckboxHeader
        maxHeight="500px"
        totalPage={3}
        filters={filters}
        loading={loadingListAppointment}
        // tableWidth={1500}
      />
    </CommonStyles.Card>
  );
};

export default TableAppointments;
