
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, Clock, Search, Filter, Bell } from 'lucide-react';

const ComplianceAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      title: 'CBN: New Foreign Exchange Circular',
      description: 'CBN has issued new guidelines on foreign exchange transactions affecting corporate accounts.',
      severity: 'high',
      regulator: 'CBN',
      timestamp: '2024-05-28T10:30:00Z',
      status: 'unread',
      category: 'Regulatory Update',
      impact: 'High',
      actionRequired: true
    },
    {
      id: '2',
      title: 'NFIU: STR Filing Threshold Update',
      description: 'Updated suspicious transaction reporting thresholds effective immediately.',
      severity: 'medium',
      regulator: 'NFIU',
      timestamp: '2024-05-28T09:15:00Z',
      status: 'read',
      category: 'Threshold Change',
      impact: 'Medium',
      actionRequired: true
    },
    {
      id: '3',
      title: 'EFCC: Enhanced Due Diligence Requirements',
      description: 'New enhanced due diligence requirements for high-risk customers.',
      severity: 'high',
      regulator: 'EFCC',
      timestamp: '2024-05-28T08:45:00Z',
      status: 'acknowledged',
      category: 'Policy Change',
      impact: 'High',
      actionRequired: false
    },
    {
      id: '4',
      title: 'FATF: Virtual Asset Guidelines Updated',
      description: 'FATF has updated guidance on virtual asset service providers compliance.',
      severity: 'medium',
      regulator: 'FATF',
      timestamp: '2024-05-28T07:20:00Z',
      status: 'read',
      category: 'International Standard',
      impact: 'Medium',
      actionRequired: true
    },
    {
      id: '5',
      title: 'CBN: Capital Adequacy Ratio Adjustment',
      description: 'Temporary adjustment to capital adequacy requirements due to economic conditions.',
      severity: 'low',
      regulator: 'CBN',
      timestamp: '2024-05-27T16:30:00Z',
      status: 'read',
      category: 'Regulatory Relief',
      impact: 'Low',
      actionRequired: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [regulatorFilter, setRegulatorFilter] = useState('all');

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-blue-500';
      case 'read': return 'bg-gray-500';
      case 'acknowledged': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesRegulator = regulatorFilter === 'all' || alert.regulator === regulatorFilter;
    
    return matchesSearch && matchesSeverity && matchesRegulator;
  });

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'acknowledged' } : alert
    ));
  };

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-red-600">High Priority</p>
                <p className="text-2xl font-bold text-red-700">
                  {alerts.filter(a => a.severity === 'high').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-yellow-600">Medium Priority</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {alerts.filter(a => a.severity === 'medium').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-green-600">Low Priority</p>
                <p className="text-2xl font-bold text-green-700">
                  {alerts.filter(a => a.severity === 'low').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-blue-600">Unread</p>
                <p className="text-2xl font-bold text-blue-700">
                  {alerts.filter(a => a.status === 'unread').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={regulatorFilter} onValueChange={setRegulatorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by regulator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regulators</SelectItem>
                <SelectItem value="CBN">CBN</SelectItem>
                <SelectItem value="NFIU">NFIU</SelectItem>
                <SelectItem value="EFCC">EFCC</SelectItem>
                <SelectItem value="FATF">FATF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className={`bg-white shadow-lg hover:shadow-xl transition-shadow border-l-4 ${
            alert.status === 'unread' ? 'border-l-blue-500' : 
            alert.status === 'acknowledged' ? 'border-l-green-500' : 'border-l-gray-300'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getSeverityIcon(alert.severity)}
                    <h3 className="font-semibold text-lg text-gray-900">{alert.title}</h3>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{alert.regulator}</Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{alert.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Category: {alert.category}</span>
                    <span>Impact: {alert.impact}</span>
                    <span>Time: {formatTimestamp(alert.timestamp)}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 ml-6">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(alert.status)}`} />
                  
                  {alert.status === 'unread' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      Acknowledge
                    </Button>
                  )}
                  
                  {alert.actionRequired && (
                    <Button size="sm">
                      Take Action
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComplianceAlerts;
