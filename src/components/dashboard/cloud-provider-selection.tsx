"use client";

import { useCallback, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CloudScanResults } from './cloud-scan-results';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const cloudProviders = ['AWS', 'Azure', 'GCP'];

export const CloudProviderSelection = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [connectingAccount, setConnectingAccount] = useState(false);

  const handleProviderSelect = useCallback((provider: string) => {
    setSelectedProvider((prevProvider) => (prevProvider === provider ? null : provider));
  }, []);

  const handleAccountConnect = () => {
    setConnectingAccount(true);
  };

  return (
    <>
      <Card className="w-full p-4">
        <CardHeader>
          <CardTitle>Select Cloud Provider</CardTitle>
          <CardDescription>Choose your cloud provider to start the compliance scan.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          {cloudProviders.map((provider) => (
            <Button
              key={provider}
              variant={selectedProvider === provider ? 'secondary' : 'outline'}
              onClick={() => handleProviderSelect(provider)}
            >
              {provider}
            </Button>
          ))}
        </CardContent>
      </Card>

      {selectedProvider && (
        <Card className="w-full p-4">
          <CardHeader>
            <CardTitle>Connect Account (Optional)</CardTitle>
            <CardDescription>
              Connect your cloud account for real-time compliance checks or continue with sample data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Connect Account</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Connect Your {selectedProvider} Account</DialogTitle>
                  <DialogDescription>
                    Enter your credentials to securely connect to your cloud environment.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="apiKey" className="text-right">
                      API Key
                    </Label>
                    <Input id="apiKey" defaultValue="" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="secretKey" className="text-right">
                      Secret Key
                    </Label>
                    <Input id="secretKey" defaultValue="" type="password" className="col-span-3" />
                  </div>
                </div>
          
              </DialogContent>
            </Dialog>
            <Button onClick={() => {}}>
                Run Compliance Scan
            </Button>
            
            {/* TODO: Implement secure credential handling and cloud API integration here */}
          </CardContent>
        </Card>
      )}

      {selectedProvider && <CloudScanResults selectedProvider={selectedProvider} />}
    </>
  );
};
