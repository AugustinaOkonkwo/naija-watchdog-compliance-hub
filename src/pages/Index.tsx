
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComplianceDashboard from '../components/ComplianceDashboard';
import AgentMonitoring from '../components/AgentMonitoring';
import ComplianceAlerts from '../components/ComplianceAlerts';
import SystemArchitecture from '../components/SystemArchitecture';
import { Shield, Activity, Bell, Network } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Nigerian Regulatory Compliance Tracking System
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            AI-Powered Microservices Architecture for Real-time Monitoring of CBN, NFIU, EFCC, and FATF Regulations
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg rounded-lg">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              AI Agents
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-2">
              <Network className="w-4 h-4" />
              Architecture
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <ComplianceDashboard />
          </TabsContent>

          <TabsContent value="agents">
            <AgentMonitoring />
          </TabsContent>

          <TabsContent value="alerts">
            <ComplianceAlerts />
          </TabsContent>

          <TabsContent value="architecture">
            <SystemArchitecture />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
