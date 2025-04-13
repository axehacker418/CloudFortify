"use client";

import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

const cloudProviders = ['AWS', 'Azure', 'GCP'];

export const CloudProviderSelection = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider);
  };

  return (
    <Card className="w-full p-4">
      <CardHeader>
        <CardTitle>Select Cloud Provider</CardTitle>
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
  );
};
