// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Check if any of the required environment variables are missing
const missingConfigValues: string[] = [];
if (!firebaseConfig.apiKey) missingConfigValues.push("NEXT_PUBLIC_FIREBASE_API_KEY");
if (!firebaseConfig.authDomain) missingConfigValues.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
if (!firebaseConfig.projectId) missingConfigValues.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
if (!firebaseConfig.appId) missingConfigValues.push("NEXT_PUBLIC_FIREBASE_APP_ID");

if (missingConfigValues.length > 0) {
  throw new Error(
    `Missing Firebase configuration values in environment variables: ${missingConfigValues.join(", ")}.  Please add them to your .env file.`
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signInGuest = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    console.log("Signed in as guest:", user.uid);
    return user;
  } catch (error: any) {
    console.error("Error signing in as guest:", error.message);
    throw error;
  }
};

export default app;
