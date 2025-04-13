"use client";

import { CloudProviderSelection } from './cloud-provider-selection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Remediation } from './remediation';
import { Settings } from './settings';
import { Help } from './help';

export const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <Tabs defaultvalue="scan" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scan">Scan</TabsTrigger>
          <TabsTrigger value="remediation">Remediation</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>
        <TabsContent value="scan">
          <CloudProviderSelection />
        </TabsContent>
        <TabsContent value="remediation">
          <Remediation />
        </TabsContent>
        <TabsContent value="settings">
          <Settings />
        </TabsContent>
        <TabsContent value="help">
          <Help />
        </TabsContent>
      </Tabs>
    </div>
  );
};
