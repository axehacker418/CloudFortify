"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { Dashboard } from "@/components/dashboard/dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { auth, signInGuest } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false);
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      setLoggedIn(true);
      toast({
        title: "Login with Google",
        description: "Successfully logged in with Google.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging in",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await signInGuest();
      setLoggedIn(true);
      toast({
        title: "Continue as Guest",
        description: "Successfully logged in as guest.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging in as guest",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

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
    <div className="flex items-center justify-center h-screen bg-secondary">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome to CloudFortify</CardTitle>
          <CardDescription className="text-center">
            Your all-in-one solution for Cloud Compliance Checking and Security Hardening.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button onClick={handleGoogleLogin}>🔐 Login with Google</Button>
          <Button variant="outline" onClick={handleGuestLogin}>👤 Continue as Guest</Button>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default LoginPage;
