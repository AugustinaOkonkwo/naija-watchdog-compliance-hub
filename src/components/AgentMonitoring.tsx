
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bot, Activity, Clock, Database, AlertCircle, CheckCircle, Pause, Play } from 'lucide-react';

const AgentMonitoring = () => {
  const [agents, setAgents] = useState([
    {
      id: 'cbn-agent',
      name: 'CBN Compliance Agent',
      status: 'active',
      lastUpdate: '2 minutes ago',
      processingRate: 245,
      accuracy: 97.8,
      monitored: ['Banking Regulations', 'KYC Requirements', 'Capital Adequacy', 'Liquidity Ratios'],
      recentActions: [
        { time: '1 min ago', action: 'Processed new circular on foreign exchange', severity: 'info' },
        { time: '15 min ago', action: 'Detected policy update in lending guidelines', severity: 'warning' },
        { time: '32 min ago', action: 'Validated compliance report submission', severity: 'success' }
      ]
    },
    {
      id: 'nfiu-agent',
      name: 'NFIU Intelligence Agent',
      status: 'active',
      lastUpdate: '1 minute ago',
      processingRate: 189,
      accuracy: 95.2,
      monitored: ['STR Requirements', 'CTR Thresholds', 'Suspicious Patterns', 'AML Reporting'],
      recentActions: [
        { time: '30 sec ago', action: 'Analyzed suspicious transaction patterns', severity: 'warning' },
        { time: '5 min ago', action: 'Updated STR filing requirements', severity: 'info' },
        { time: '18 min ago', action: 'Validated customer risk assessment', severity: 'success' }
      ]
    },
    {
      id: 'efcc-agent',
      name: 'EFCC Monitoring Agent',
      status: 'warning',
      lastUpdate: '5 minutes ago',
      processingRate: 156,
      accuracy: 93.4,
      monitored: ['Financial Crime Alerts', 'Investigation Updates', 'Prosecution Guidelines', 'Asset Recovery'],
      recentActions: [
        { time: '3 min ago', action: 'High-risk transaction flagged for review', severity: 'error' },
        { time: '12 min ago', action: 'Updated fraud detection parameters', severity: 'warning' },
        { time: '25 min ago', action: 'Processed compliance certification', severity: 'success' }
      ]
    },
    {
      id: 'fatf-agent',
      name: 'FATF Standards Agent',
      status: 'active',
      lastUpdate: '3 minutes ago',
      processingRate: 78,
      accuracy: 98.9,
      monitored: ['40 Recommendations', 'Mutual Evaluations', 'Best Practices', 'International Standards'],
      recentActions: [
        { time: '2 min ago', action: 'New FATF guidance on virtual assets', severity: 'info' },
        { time: '20 min ago', action: 'Updated risk-based approach guidelines', severity: 'info' },
        { time: '45 min ago', action: 'Processed international cooperation request', severity: 'success' }
      ]
    }
  ]);

  const toggleAgentStatus = (agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' }
        : agent
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'paused': return <Pause className="w-4 h-4 text-gray-500" />;
      default: return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Agent Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Active Agents</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Bot className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Avg Accuracy</p>
                <p className="text-2xl font-bold">96.3%</p>
              </div>
              <Activity className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Processing Rate</p>
                <p className="text-2xl font-bold">668/h</p>
              </div>
              <Database className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Uptime</p>
                <p className="text-2xl font-bold">99.9%</p>
              </div>
              <Clock className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Agent Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-500" />
                  {agent.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(agent.status)}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAgentStatus(agent.id)}
                    className="ml-2"
                  >
                    {agent.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Agent Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Processing Rate</p>
                  <p className="text-xl font-semibold">{agent.processingRate}/hour</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Accuracy</p>
                  <p className="text-xl font-semibold">{agent.accuracy}%</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Accuracy Rate</p>
                <Progress value={agent.accuracy} className="h-2" />
              </div>

              {/* Monitored Areas */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Monitored Areas</p>
                <div className="flex flex-wrap gap-1">
                  {agent.monitored.map((area, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recent Actions */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Recent Actions</p>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {agent.recentActions.map((action, index) => (
                    <div key={index} className={`p-2 rounded text-xs ${getSeverityColor(action.severity)}`}>
                      <p className="font-medium">{action.action}</p>
                      <p className="opacity-75">{action.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500">Last Update: {agent.lastUpdate}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AgentMonitoring;
