"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AwsConfiguration,
  AwsSecurityScanResult,
  getAwsSecurityScanResults,
} from '@/services/aws';
import {
  AzureConfiguration,
  AzureSecurityScanResult,
  getAzureSecurityScanResults,
} from '@/services/azure';
import {
  GcpConfiguration,
  GcpSecurityScanResult,
  getGcpSecurityScanResults,
} from '@/services/gcp';

interface CloudScanResultsProps {
  selectedProvider: string;
}

export const CloudScanResults = ({ selectedProvider }: CloudScanResultsProps) => {
  const [securityData, setSecurityData] = useState<
    AwsSecurityScanResult | AzureSecurityScanResult | GcpSecurityScanResult | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        switch (selectedProvider) {
          case 'AWS': {
            // Replace with your actual AWS configuration
            const awsConfig: AwsConfiguration = { region: 'us-west-2', accountId: '123456789012' };
            const data = await getAwsSecurityScanResults(awsConfig);
            setSecurityData(data);
            break;
          }
          case 'Azure': {
            // Replace with your actual Azure configuration
            const azureConfig: AzureConfiguration = {
              subscriptionId: 'your-subscription-id',
              resourceGroup: 'your-resource-group',
            };
            const data = await getAzureSecurityScanResults(azureConfig);
            setSecurityData(data);
            break;
          }
          case 'GCP': {
            // Replace with your actual GCP configuration
            const gcpConfig: GcpConfiguration = { projectId: 'your-project-id', zone: 'us-central1-a' };
            const data = await getGcpSecurityScanResults(gcpConfig);
            setSecurityData(data);
            break;
          }
          default:
            throw new Error('Invalid cloud provider selected');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch security scan results');
        setSecurityData(null); // Clear any previous data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedProvider]);

  if (!selectedProvider) {
    return <Card className="w-full p-4">
      <CardContent>Please select a cloud provider to view scan results.</CardContent>
    </Card>;
  }

  if (loading) {
    return <Card className="w-full p-4">
      <CardContent>Loading security scan results...</CardContent>
    </Card>;
  }

  if (error) {
    return <Card className="w-full p-4">
      <CardContent>Error: {error}</CardContent>
    </Card>;
  }

  if (!securityData) {
    return null;
  }

  return (
    <Card className="w-full p-4">
      <CardHeader>
        <CardTitle>{selectedProvider} Security Scan Results</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Compliance Score: {securityData.complianceScore}</p>
        {securityData.securityAlerts && securityData.securityAlerts.length > 0 ? (
          <>
            <p>Security Alerts:</p>
            <ul>
              {securityData.securityAlerts.map((alert, index) => (
                <li key={index}>{alert}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>No security alerts found.</p>
        )}
      </CardContent>
    </Card>
  );
};
