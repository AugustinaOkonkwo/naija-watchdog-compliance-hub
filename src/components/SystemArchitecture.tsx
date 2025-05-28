
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Network, Database, Server, Cloud, Shield, Zap, Monitor, Bell } from 'lucide-react';

const SystemArchitecture = () => {
  const microservices = [
    {
      name: 'API Gateway',
      description: 'Central entry point for all client requests with authentication and rate limiting',
      endpoints: ['/api/v1/compliance', '/api/v1/alerts', '/api/v1/agents'],
      technology: 'Express.js + Redis',
      port: '3000'
    },
    {
      name: 'CBN Service',
      description: 'Monitors Central Bank of Nigeria regulations and banking compliance',
      endpoints: ['/cbn/regulations', '/cbn/compliance-check', '/cbn/reports'],
      technology: 'Node.js + ML Pipeline',
      port: '3001'
    },
    {
      name: 'NFIU Service',
      description: 'Handles Nigerian Financial Intelligence Unit monitoring and STR processing',
      endpoints: ['/nfiu/str-reports', '/nfiu/suspicious-patterns', '/nfiu/aml-check'],
      technology: 'Python + TensorFlow',
      port: '3002'
    },
    {
      name: 'EFCC Service',
      description: 'Economic and Financial Crimes Commission compliance and crime detection',
      endpoints: ['/efcc/crime-alerts', '/efcc/investigation-updates', '/efcc/risk-assessment'],
      technology: 'Node.js + Machine Learning',
      port: '3003'
    },
    {
      name: 'FATF Service',
      description: 'Financial Action Task Force international standards monitoring',
      endpoints: ['/fatf/recommendations', '/fatf/mutual-evaluations', '/fatf/best-practices'],
      technology: 'Python + NLP',
      port: '3004'
    },
    {
      name: 'Notification Service',
      description: 'Real-time alerts and notifications via multiple channels',
      endpoints: ['/notifications/send', '/notifications/subscribe', '/notifications/history'],
      technology: 'Node.js + WebSocket + Kafka',
      port: '3005'
    },
    {
      name: 'Analytics Service',
      description: 'Data processing, reporting, and compliance analytics',
      endpoints: ['/analytics/reports', '/analytics/trends', '/analytics/predictions'],
      technology: 'Python + Apache Spark',
      port: '3006'
    }
  ];

  const databaseSchema = {
    compliance_events: {
      description: 'Stores all compliance-related events and changes',
      fields: [
        'event_id (UUID, Primary Key)',
        'regulator (VARCHAR) - CBN, NFIU, EFCC, FATF',
        'event_type (VARCHAR) - regulation_update, violation, alert',
        'severity (ENUM) - low, medium, high, critical',
        'title (VARCHAR)',
        'description (TEXT)',
        'metadata (JSONB)',
        'timestamp (TIMESTAMPTZ)',
        'status (VARCHAR) - active, resolved, archived'
      ]
    },
    agent_activities: {
      description: 'Tracks AI agent processing and monitoring activities',
      fields: [
        'activity_id (UUID, Primary Key)',
        'agent_name (VARCHAR)',
        'action_type (VARCHAR)',
        'processing_time (INTEGER)',
        'accuracy_score (DECIMAL)',
        'data_processed (JSONB)',
        'timestamp (TIMESTAMPTZ)',
        'status (VARCHAR)'
      ]
    },
    notifications: {
      description: 'Manages notification delivery and user preferences',
      fields: [
        'notification_id (UUID, Primary Key)',
        'user_id (UUID)',
        'event_id (UUID, Foreign Key)',
        'channel (VARCHAR) - email, sms, webhook, dashboard',
        'content (JSONB)',
        'delivery_status (VARCHAR)',
        'sent_at (TIMESTAMPTZ)',
        'read_at (TIMESTAMPTZ)'
      ]
    },
    compliance_scores: {
      description: 'Historical compliance scoring and metrics',
      fields: [
        'score_id (UUID, Primary Key)',
        'regulator (VARCHAR)',
        'score_value (DECIMAL)',
        'factors (JSONB)',
        'calculation_date (DATE)',
        'period_start (DATE)',
        'period_end (DATE)'
      ]
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="microservices">Microservices</TabsTrigger>
          <TabsTrigger value="database">Database Schema</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Architecture Diagram */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5 text-blue-500" />
                System Architecture Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Client Layer */}
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                      <Monitor className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <h3 className="font-semibold">Client Applications</h3>
                      <p className="text-sm text-gray-600">React Dashboard, Mobile Apps, API Clients</p>
                    </div>
                  </div>

                  {/* API Gateway */}
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                      <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <h3 className="font-semibold">API Gateway</h3>
                      <p className="text-sm text-gray-600">Authentication, Rate Limiting, Load Balancing</p>
                    </div>
                  </div>

                  {/* Message Queue */}
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                      <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <h3 className="font-semibold">Message Queue</h3>
                      <p className="text-sm text-gray-600">Apache Kafka, Redis Pub/Sub</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {/* Microservices */}
                  {['CBN Service', 'NFIU Service', 'EFCC Service', 'FATF Service'].map((service) => (
                    <div key={service} className="bg-white p-3 rounded-lg shadow-md text-center">
                      <Server className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                      <h4 className="font-medium text-sm">{service}</h4>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {/* Database */}
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <Database className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <h3 className="font-semibold">Database Cluster</h3>
                      <p className="text-sm text-gray-600">PostgreSQL, Redis, Elasticsearch</p>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <Bell className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <h3 className="font-semibold">Notification System</h3>
                      <p className="text-sm text-gray-600">Real-time Alerts, Email, SMS, Webhooks</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <Shield className="w-10 h-10 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Security First</h3>
                <p className="text-blue-100">End-to-end encryption, OAuth 2.0, role-based access control</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <Zap className="w-10 h-10 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Real-time Processing</h3>
                <p className="text-green-100">Event-driven architecture with instant notifications</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <Cloud className="w-10 h-10 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Cloud Native</h3>
                <p className="text-purple-100">Containerized, auto-scaling, highly available</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="microservices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {microservices.map((service, index) => (
              <Card key={index} className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-blue-500" />
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{service.description}</p>
                  
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Technology Stack</h4>
                    <Badge variant="secondary">{service.technology}</Badge>
                    <Badge variant="outline" className="ml-2">Port: {service.port}</Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">API Endpoints</h4>
                    <div className="space-y-1">
                      {service.endpoints.map((endpoint, idx) => (
                        <code key={idx} className="block text-xs bg-gray-100 p-2 rounded">
                          {endpoint}
                        </code>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          {Object.entries(databaseSchema).map(([tableName, tableInfo]) => (
            <Card key={tableName} className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-500" />
                  {tableName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{tableInfo.description}</p>
                
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-3">Table Schema</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      {tableInfo.fields.map((field, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <code className="text-sm">{field}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-blue-500" />
                  Cloud Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="font-medium">Container Orchestration</span>
                    <Badge>Kubernetes</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="font-medium">Load Balancer</span>
                    <Badge>NGINX Ingress</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                    <span className="font-medium">Service Mesh</span>
                    <Badge>Istio</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                    <span className="font-medium">Monitoring</span>
                    <Badge>Prometheus + Grafana</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-green-500" />
                  Monitoring & Observability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="font-medium">Logging</span>
                    <Badge>ELK Stack</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="font-medium">Tracing</span>
                    <Badge>Jaeger</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                    <span className="font-medium">Metrics</span>
                    <Badge>Prometheus</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                    <span className="font-medium">Alerting</span>
                    <Badge>AlertManager</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Deployment Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mb-2">1</div>
                  <p className="text-sm font-medium">Code Commit</p>
                  <p className="text-xs text-gray-500">Git Repository</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-2">2</div>
                  <p className="text-sm font-medium">CI/CD Pipeline</p>
                  <p className="text-xs text-gray-500">GitHub Actions</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mb-2">3</div>
                  <p className="text-sm font-medium">Build & Test</p>
                  <p className="text-xs text-gray-500">Docker + Jest</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mb-2">4</div>
                  <p className="text-sm font-medium">Deploy</p>
                  <p className="text-xs text-gray-500">Kubernetes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemArchitecture;
