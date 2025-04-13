"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { Dashboard } from "@/components/dashboard/dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";

const LoginPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth login functionality
    console.log("Logging in with Google");
    setLoggedIn(true);
  };

  const handleGuestLogin = () => {
    // TODO: Implement guest login functionality
    console.log("Continuing as Guest");
    setLoggedIn(true);
  };

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
