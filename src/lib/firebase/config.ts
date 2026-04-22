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

// Initialize Firebase safely for Build time vs Runtime
let app;
let auth: any;
let db: any;

const isBrowser = typeof window !== 'undefined';
const hasFullConfig = firebaseConfig.apiKey && firebaseConfig.apiKey !== "BUILD_PLACEHOLDER";

if (getApps().length === 0) {
    if (hasFullConfig) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    } else {
        // Fallback for build time ONLY or missing config at runtime
        app = initializeApp({ apiKey: "BUILD_PLACEHOLDER", projectId: "build-placeholder" });
        // Use proxies or dummy objects that don't crash standard calls
        auth = isBrowser ? getAuth(app) : {} as any;
        db = isBrowser ? getFirestore(app) : {} as any;
    }
} else {
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
}

export { app, auth, db };
