"use client";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Toaster} from "@/components/ui/toaster";
import {useState, useEffect} from "react";
import {Dashboard} from "@/components/dashboard/dashboard";
import {SidebarProvider} from "@/components/ui/sidebar";
import {useToast} from "@/hooks/use-toast";
// import {auth, signInGuest} from "./firebase";
// import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const LoginPage = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const {toast} = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    // setLoggedIn(true);
    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   setLoading(false);
    //   if (user) {
    //     setLoggedIn(true);
    //   } else {
    //     setLoggedIn(false);
    //   }
    // });
    // return () => unsubscribe();
  }, []);

  // const handleGoogleLogin = async () => {
  //   setLoading(true);
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     const result = await signInWithPopup(auth, provider);
  //     // The signed-in user info.
  //     const user = result.user;
  //     console.log("Google Login success:", user);
  //     setLoggedIn(true);
  //     toast({
  //       title: "Login with Google",
  //       description: "Successfully logged in with Google.",
  //     });
  //   } catch (error: any) {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     console.error("Google Login Error:", {
  //       errorCode,
  //       errorMessage,
  //       email,
  //       credential,
  //     }); // Enhanced error logging
  //     toast({
  //       variant: "destructive",
  //       title: "Error logging in with Google",
  //       description: errorMessage || "An unexpected error occurred.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleGuestLogin = async () => {
  //   setLoading(true);
  //   try {
  //     const userCredential = await signInGuest();
  //     const user = userCredential.user;
  //     console.log("Signed in as guest:", user.uid);
  //     setLoggedIn(true);
  //     toast({
  //       title: "Continue as Guest",
  //       description: "Successfully logged in as guest.",
  //     });
  //   } catch (error: any) {
  //     console.error("Guest Login Error:", error); // Log the error for debugging
  //     toast({
  //       variant: "destructive",
  //       title: "Error logging in as guest",
  //       description: error.message || "An unexpected error occurred during guest login.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-secondary">Loading...</div>;
  }

  if (loggedIn) {
    return (
      <SidebarProvider>
        <Dashboard />
        <Toaster />
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
    <Dashboard />
    <Toaster />
  </SidebarProvider>
  );
};

export default LoginPage;

    