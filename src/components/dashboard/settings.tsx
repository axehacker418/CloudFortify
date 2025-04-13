"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Settings = () => {
  return (
    <Card className="w-full p-4">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: Implement settings options */}
        <p>Theme, language, and animation settings will be available here.</p>
        <p>Saved reports will be displayed when logged in.</p>
      </CardContent>
    </Card>
  );
};
