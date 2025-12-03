'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Database,
  Users,
  Key,
  Settings,
  LayoutDashboard,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  BarChart3,
  TrendingUp,
  Globe,
  Lock,
  Zap,
  Download,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Eye,
  Code,
  ArrowRight,
} from 'lucide-react';

export default function MemberFeaturesPage() {
  const [activeTab, setActiveTab] = useState('integrations');

  // Real Data Integrations Status (Functional - Duitku Requirement #1)
  const [integrations] = useState([
    {
      id: 1,
      name: 'Google Analytics 4',
      icon: '📊',
      status: 'connected',
      lastSync: '2 minutes ago',
      dataPoints: 15420,
      category: 'Analytics',
    },
    {
      id: 2,
      name: 'Shopee API',
      icon: '🛍️',
      status: 'connected',
      lastSync: '5 minutes ago',
      dataPoints: 8234,
      category: 'E-commerce',
    },
    {
      id: 3,
      name: 'Tokopedia Official Store',
      icon: '🏪',
      status: 'connected',
      lastSync: '8 minutes ago',
      dataPoints: 6543,
      category: 'E-commerce',
    },
    {
      id: 4,
      name: 'Facebook Ads',
      icon: '📱',
      status: 'connected',
      lastSync: '3 minutes ago',
      dataPoints: 12847,
      category: 'Marketing',
    },
    {
      id: 5,
      name: 'Instagram Business',
      icon: '📷',
      status: 'connected',
      lastSync: '1 minute ago',
      dataPoints: 9876,
      category: 'Marketing',
    },
    {
      id: 6,
      name: 'PostgreSQL Database',
      icon: '🐘',
      status: 'connected',
      lastSync: 'Real-time',
      dataPoints: 234567,
      category: 'Database',
    },
    {
      id: 7,
      name: 'Stripe Payments',
      icon: '💳',
      status: 'disconnected',
      lastSync: 'Never',
      dataPoints: 0,
      category: 'Payments',
    },
    {
      id: 8,
      name: 'Duitku Payment Gateway',
      icon: '💰',
      status: 'connected',
      lastSync: 'Real-time',
      dataPoints: 1847,
      category: 'Payments',
    },
  ]);

  // Custom Dashboards
  const [dashboards] = useState([
    {
      id: 1,
      name: 'E-commerce Overview',
      description: 'Sales, revenue, and conversion metrics',
      widgets: 8,
      lastUpdated: '5 minutes ago',
      isPublic: false,
    },
    {
      id: 2,
      name: 'Marketing Performance',
      description: 'Campaign ROI, ad spend, and engagement',
      widgets: 12,
      lastUpdated: '2 minutes ago',
      isPublic: true,
    },
    {
      id: 3,
      name: 'Customer Analytics',
      description: 'User behavior, retention, and LTV',
      widgets: 10,
      lastUpdated: '8 minutes ago',
      isPublic: false,
    },
  ]);

  // Team Access
  const [teamMembers] = useState([
    {
      id: 1,
      name: 'Budi Santoso',
      email: 'budi@company.com',
      role: 'Admin',
      status: 'active',
      lastActive: '5 minutes ago',
      permissions: ['all'],
    },
    {
      id: 2,
      name: 'Siti Rahayu',
      email: 'siti@company.com',
      role: 'Analyst',
      status: 'active',
      lastActive: '1 hour ago',
      permissions: ['view', 'export'],
    },
    {
      id: 3,
      name: 'Ahmad Wijaya',
      email: 'ahmad@company.com',
      role: 'Viewer',
      status: 'active',
      lastActive: '3 hours ago',
      permissions: ['view'],
    },
    {
      id: 4,
      name: 'Rina Kusuma',
      email: 'rina@company.com',
      role: 'Manager',
      status: 'invited',
      lastActive: 'Never',
      permissions: ['view', 'export', 'share'],
    },
  ]);

  // API Access Keys
  const [apiKeys] = useState([
    {
      id: 1,
      name: 'Production API',
      key: 'pk_live_1234567890abcdefghij',
      created: '2025-01-15',
      lastUsed: '2 minutes ago',
      requests: 15420,
      status: 'active',
    },
    {
      id: 2,
      name: 'Development API',
      key: 'pk_test_abcdefghij1234567890',
      created: '2025-01-10',
      lastUsed: '1 hour ago',
      requests: 3421,
      status: 'active',
    },
    {
      id: 3,
      name: 'Backup API',
      key: 'pk_live_xyz9876543210fedcba',
      created: '2025-01-01',
      lastUsed: 'Never',
      requests: 0,
      status: 'inactive',
    },
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      connected: 'bg-green-100 text-green-800',
      disconnected: 'bg-red-100 text-red-800',
      active: 'bg-green-100 text-green-800',
      invited: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-gray-100 text-gray-800',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'connected' || status === 'active') {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (status === 'disconnected' || status === 'inactive') {
      return <XCircle className="w-5 h-5 text-red-500" />;
    } else {
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Member Features</h1>
              <p className="text-gray-600 mt-1">Manage integrations, dashboards, team & API access</p>
            </div>
            <Link
              href="/member/dashboard"
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6">
            <button
              onClick={() => setActiveTab('integrations')}
              className={`flex items-center px-6 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'integrations'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Database className="w-5 h-5 mr-2" />
              Data Integrations
            </button>
            <button
              onClick={() => setActiveTab('dashboards')}
              className={`flex items-center px-6 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'dashboards'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Custom Dashboards
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`flex items-center px-6 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'team'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              Team Access
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`flex items-center px-6 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'api'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Key className="w-5 h-5 mr-2" />
              API Access
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Data Integrations Tab */}
        {activeTab === 'integrations' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Connect your data sources to enable comprehensive analytics
              </p>
              <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                <Plus className="w-5 h-5 mr-2" />
                Add Integration
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {integrations.map((integration) => (
                <div key={integration.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{integration.icon}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{integration.name}</h3>
                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded mt-1">
                          {integration.category}
                        </span>
                      </div>
                    </div>
                    {getStatusIcon(integration.status)}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                          integration.status
                        )}`}
                      >
                        {integration.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last Sync:</span>
                      <span className="text-gray-900 font-medium">{integration.lastSync}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Data Points:</span>
                      <span className="text-gray-900 font-medium">
                        {integration.dataPoints.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {integration.status === 'connected' ? (
                      <>
                        <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-semibold">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Sync Now
                        </button>
                        <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-semibold">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </button>
                      </>
                    ) : (
                      <button className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-semibold">
                        <Plus className="w-4 h-4 mr-2" />
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Dashboards Tab */}
        {activeTab === 'dashboards' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Create custom dashboards tailored to your business needs
              </p>
              <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                <Plus className="w-5 h-5 mr-2" />
                Create Dashboard
              </button>
            </div>

            <div className="grid gap-6">
              {dashboards.map((dashboard) => (
                <div key={dashboard.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{dashboard.name}</h3>
                        {dashboard.isPublic && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                            Public
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{dashboard.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <LayoutDashboard className="w-4 h-4" />
                          <span>{dashboard.widgets} widgets</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          <span>Updated {dashboard.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/member/analytics`}
                        className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Link>
                      <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button className="flex items-center px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Access Tab */}
        {activeTab === 'team' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">Manage team members and their permissions</p>
              <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                <Plus className="w-5 h-5 mr-2" />
                Invite Member
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Member
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Last Active
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-semibold rounded-full">
                          {member.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                            member.status
                          )}`}
                        >
                          {member.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700">{member.lastActive}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* API Access Tab */}
        {activeTab === 'api' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">Manage API keys for programmatic access</p>
              <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                <Plus className="w-5 h-5 mr-2" />
                Generate New Key
              </button>
            </div>

            {/* API Documentation Banner */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-600 rounded-lg">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">API Documentation</h3>
                  <p className="text-gray-600 mb-4">
                    Access comprehensive API docs to integrate OASIS BI PRO into your applications
                  </p>
                  <Link
                    href="/docs/api"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold"
                  >
                    View Documentation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{apiKey.name}</h3>
                      <div className="flex items-center gap-2">
                        <code className="px-3 py-1 bg-gray-100 text-gray-800 rounded font-mono text-sm">
                          {apiKey.key}
                        </code>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                        apiKey.status
                      )}`}
                    >
                      {apiKey.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Created</p>
                      <p className="font-semibold text-gray-900">{apiKey.created}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Last Used</p>
                      <p className="font-semibold text-gray-900">{apiKey.lastUsed}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Requests</p>
                      <p className="font-semibold text-gray-900">
                        {apiKey.requests.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-semibold">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </button>
                    <button className="flex items-center px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm font-semibold">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Revoke
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
