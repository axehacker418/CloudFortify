"use client";

import {CloudProviderSelection} from './cloud-provider-selection';

export const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <CloudProviderSelection />
    </div>
  );
};
