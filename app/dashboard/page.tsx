'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ArrowUp,
  ArrowDown,
  Database,
  RefreshCw,
  Calendar,
  Download,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { 
  fetchAnalyticsOverview, 
  fetchRevenueData, 
  fetchTrafficData 
} from '@/lib/api-client';

export default function RealDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Analytics state
  const [overview, setOverview] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [trafficData, setTrafficData] = useState<any>(null);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push('/auth/signin');
        return;
      }
      setUser(user);
      loadDashboardData();
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/auth/signin');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [overviewRes, revenueRes, trafficRes] = await Promise.all([
        fetchAnalyticsOverview(timeRange),
        fetchRevenueData(timeRange),
        fetchTrafficData(timeRange),
      ]);

      if (overviewRes.success) setOverview(overviewRes.data);
      if (revenueRes.success) setRevenueData(revenueRes.data);
      if (trafficRes.success) setTrafficData(trafficRes.data);
    } catch (err: any) {
      console.error('Dashboard error:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  // Change time range
  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [timeRange]);

  // Sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  if (loading && !overview) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">O</span>
              </div>
              <span className="text-xl font-bold text-gray-900">OASIS BI PRO</span>
            </Link>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50"
                title="Refresh data"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              <Link
                href="/member/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Member Area
              </Link>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Overview</h1>
          <p className="text-gray-600">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Error loading data</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Time Range Selector */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Time Range:</span>
            <div className="flex space-x-2">
              {['7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as any)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    timeRange === range
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>
          </div>

          <Link
            href="/member/analytics"
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>View Full Analytics</span>
          </Link>
        </div>

        {/* Overview Cards */}
        {overview && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Revenue */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  overview.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {overview.revenueGrowth >= 0 ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(overview.revenueGrowth)}%</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(overview.totalRevenue)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {overview.revenueGrowth >= 0 ? 'Up' : 'Down'} from previous period
              </p>
            </div>

            {/* Total Users */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  overview.userGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {overview.userGrowth >= 0 ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(overview.userGrowth)}%</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Users</h3>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(overview.totalUsers)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Average per day
              </p>
            </div>

            {/* Active Users */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  overview.activeGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {overview.activeGrowth >= 0 ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(overview.activeGrowth)}%</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Active Users</h3>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(overview.activeUsers)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Average per day
              </p>
            </div>

            {/* Conversion Rate */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-pink-600" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  overview.conversionGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {overview.conversionGrowth >= 0 ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(overview.conversionGrowth)}%</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Conversion Rate</h3>
              <p className="text-2xl font-bold text-gray-900">
                {overview.conversionRate}%
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {overview.conversionGrowth >= 0 ? 'Up' : 'Down'} from previous period
              </p>
            </div>
          </div>
        )}

        {/* Revenue Chart */}
        {revenueData && revenueData.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Revenue Trend</h2>
              <Download className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors" />
            </div>
            <div className="space-y-4">
              {revenueData.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.date}</p>
                    <p className="text-xs text-gray-500">{item.transactions} transactions</p>
                  </div>
                  <p className="text-lg font-bold text-blue-600">
                    {formatCurrency(item.revenue)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Traffic & Devices */}
        {trafficData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Traffic Sources */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Traffic Sources</h2>
              <div className="space-y-4">
                {trafficData.trafficSources.map((source: any, index: number) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{source.name}</span>
                      <span className="text-sm font-bold text-gray-900">{source.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${source.value}%`,
                          backgroundColor: source.color 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Device Breakdown</h2>
              <div className="space-y-4">
                {trafficData.deviceBreakdown.map((device: any, index: number) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{device.name}</span>
                      <span className="text-sm font-bold text-gray-900">{device.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${device.value}%`,
                          backgroundColor: device.color 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Need More Insights?</h2>
          <p className="text-blue-100 mb-6">
            Explore our comprehensive member dashboard with AI-powered insights, team collaboration, and advanced analytics.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/member/dashboard"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:shadow-xl transition-all"
            >
              Go to Member Dashboard
            </Link>
            <Link
              href="/platform"
              className="px-6 py-3 bg-blue-500 bg-opacity-30 text-white font-semibold rounded-lg hover:bg-opacity-40 transition-all border border-white border-opacity-30"
            >
              Connect Integrations
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
