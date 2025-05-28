
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

const ComplianceDashboard = () => {
  const [complianceData, setComplianceData] = useState({
    cbn: { score: 92, status: 'compliant', trend: 'up', violations: 2 },
    nfiu: { score: 88, status: 'compliant', trend: 'up', violations: 3 },
    efcc: { score: 85, status: 'warning', trend: 'down', violations: 5 },
    fatf: { score: 94, status: 'compliant', trend: 'up', violations: 1 }
  });

  const chartData = [
    { name: 'Jan', CBN: 88, NFIU: 82, EFCC: 79, FATF: 91 },
    { name: 'Feb', CBN: 89, NFIU: 84, EFCC: 81, FATF: 92 },
    { name: 'Mar', CBN: 91, NFIU: 86, EFCC: 83, FATF: 93 },
    { name: 'Apr', CBN: 92, NFIU: 88, EFCC: 85, FATF: 94 }
  ];

  const violationData = [
    { regulator: 'CBN', high: 1, medium: 3, low: 8 },
    { regulator: 'NFIU', high: 2, medium: 4, low: 6 },
    { regulator: 'EFCC', high: 3, medium: 5, low: 4 },
    { regulator: 'FATF', high: 0, medium: 2, low: 5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(complianceData).map(([key, data]) => (
          <Card key={key} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {key.toUpperCase()}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-3xl font-bold ${getScoreColor(data.score)}`}>
                  {data.score}%
                </span>
                {data.trend === 'up' ? (
                  <TrendingUp className="w-6 h-6 text-green-500" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-500" />
                )}
              </div>
              <Progress value={data.score} className="h-2" />
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(data.status)}>
                  {data.status}
                </Badge>
                <span className="text-sm text-gray-500">
                  {data.violations} violations
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Compliance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="CBN" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="NFIU" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="EFCC" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="FATF" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Violation Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={violationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="regulator" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="high" stackId="a" fill="#ef4444" />
                <Bar dataKey="medium" stackId="a" fill="#f59e0b" />
                <Bar dataKey="low" stackId="a" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Recent Compliance Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: '2 hours ago', regulator: 'CBN', action: 'Updated AML policies compliance check', status: 'completed' },
              { time: '4 hours ago', regulator: 'NFIU', action: 'STR filing validation completed', status: 'completed' },
              { time: '6 hours ago', regulator: 'EFCC', action: 'Customer due diligence review', status: 'warning' },
              { time: '8 hours ago', regulator: 'FATF', action: 'Beneficial ownership verification', status: 'completed' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.regulator} • {activity.time}</p>
                  </div>
                </div>
                <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceDashboard;
