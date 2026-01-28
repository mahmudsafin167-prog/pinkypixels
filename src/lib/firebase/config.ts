import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase safely for Build time
let app;
let auth: any;
let db: any;

const isBuildTime = typeof window === 'undefined' && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

if (getApps().length === 0) {
    if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "BUILD_PLACEHOLDER") {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    } else {
        // Fallback for build time - mock objects to prevent crashes
        app = initializeApp({ apiKey: "BUILD_PLACEHOLDER", projectId: "build-placeholder" });
        auth = {} as any;
        db = {} as any;
    }
} else {
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
}

export { app, auth, db };
