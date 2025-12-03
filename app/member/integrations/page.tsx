'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Database,
  CheckCircle,
  XCircle,
  RefreshCw,
  Settings,
  Trash2,
  Plus,
  AlertCircle,
  Clock,
  Activity,
} from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { fetchIntegrations } from '@/lib/api-client';

interface Integration {
  id: string;
  type: string;
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string | null;
  dataPoints: number;
  syncFrequency: string;
}

export default function IntegrationsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [canManage, setCanManage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        router.push('/auth/signin');
        return;
      }

      await loadIntegrations();
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadIntegrations = async () => {
    try {
      const response = await fetchIntegrations();
      if (response.success) {
        setIntegrations(response.data);
        setCanManage(response.canManage);
      }
    } catch (err: any) {
      console.error('Error loading integrations:', err);
      setError('Failed to load integrations');
    }
  };

  const getIntegrationIcon = (type: string) => {
    const icons: any = {
      google_analytics: '📊',
      shopee: '🛍️',
      tokopedia: '🛒',
      facebook_ads: '📱',
      instagram: '📷',
      postgresql_db: '🗄️',
      stripe: '💳',
      duitku: '💰',
    };
    return icons[type] || '🔗';
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      connected: 'bg-green-100 text-green-800 border-green-200',
      disconnected: 'bg-gray-100 text-gray-800 border-gray-200',
      error: 'bg-red-100 text-red-800 border-red-200',
    };

    const icons = {
      connected: <CheckCircle className="w-4 h-4" />,
      disconnected: <XCircle className="w-4 h-4" />,
      error: <AlertCircle className="w-4 h-4" />,
    };

    return (
      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatLastSync = (lastSync: string | null) => {
    if (!lastSync) return 'Never';
    
    const date = new Date(lastSync);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading integrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Data Integrations</h1>
              <p className="text-gray-600 mt-1">
                Connect and manage your data sources
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadIntegrations}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              {canManage && (
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Integration
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{integrations.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Connected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {integrations.filter(i => i.status === 'connected').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Data Points</p>
                <p className="text-2xl font-bold text-gray-900">
                  {integrations.reduce((sum, i) => sum + i.dataPoints, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Sync</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatLastSync(
                    integrations
                      .filter(i => i.lastSync)
                      .sort((a, b) => new Date(b.lastSync!).getTime() - new Date(a.lastSync!).getTime())[0]?.lastSync || null
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Integrations List */}
        {integrations.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Integrations Yet</h3>
            <p className="text-gray-600 mb-6">
              Connect your first data source to start analyzing your business data.
            </p>
            {canManage && (
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Add Your First Integration
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{getIntegrationIcon(integration.type)}</div>
                    <div>
                      <h3 className="font-bold text-gray-900">{integration.name}</h3>
                      <p className="text-xs text-gray-500">{integration.type.replace(/_/g, ' ')}</p>
                    </div>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Data Points:</span>
                    <span className="font-semibold text-gray-900">
                      {integration.dataPoints.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Sync:</span>
                    <span className="font-semibold text-gray-900">
                      {formatLastSync(integration.lastSync)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-semibold text-gray-900 capitalize">
                      {integration.syncFrequency}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                {canManage && (
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Configure
                    </button>
                    {integration.status === 'connected' && (
                      <button
                        className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">💡 About Data Integrations</h3>
          <p className="text-blue-800 text-sm">
            Integrations allow you to automatically sync data from external platforms into OASIS BI PRO. 
            Once connected, your data will be aggregated and displayed in the analytics dashboard. 
            You can configure sync frequency and manage permissions for each integration.
          </p>
        </div>
      </div>
    </div>
  );
}
