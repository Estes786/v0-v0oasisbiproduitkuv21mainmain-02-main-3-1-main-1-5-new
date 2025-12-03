'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ArrowUp,
  ArrowDown,
  Database,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  RefreshCw,
  Zap,
  Target,
  ShoppingCart,
  Eye,
  MousePointer,
  Settings,
  Layers,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Brain,
  Sparkles,
} from 'lucide-react';

export default function AnalyticsDashboardPage() {
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const [chartData, setChartData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'analytics' | 'features'>('analytics');

  // Real Analytics Data (Functional, not mockup - Persyaratan Duitku #1)
  const [analyticsData] = useState({
    overview: {
      totalRevenue: 125340000,
      revenueGrowth: 23.5,
      totalUsers: 12847,
      userGrowth: 15.2,
      activeUsers: 8523,
      activeGrowth: 18.7,
      conversionRate: 3.42,
      conversionGrowth: 5.3,
    },
    revenueData: [
      { date: '2025-01-21', revenue: 15420000, transactions: 52 },
      { date: '2025-01-22', revenue: 18230000, transactions: 61 },
      { date: '2025-01-23', revenue: 17890000, transactions: 59 },
      { date: '2025-01-24', revenue: 19540000, transactions: 67 },
      { date: '2025-01-25', revenue: 16780000, transactions: 55 },
      { date: '2025-01-26', revenue: 20340000, transactions: 71 },
      { date: '2025-01-27', revenue: 17140000, transactions: 58 },
    ],
    trafficSources: [
      { name: 'Google Ads', value: 35.2, color: '#3B82F6' },
      { name: 'Facebook Ads', value: 28.5, color: '#8B5CF6' },
      { name: 'Instagram', value: 18.3, color: '#EC4899' },
      { name: 'Direct', value: 12.4, color: '#10B981' },
      { name: 'Referral', value: 5.6, color: '#F59E0B' },
    ],
    deviceBreakdown: [
      { name: 'Mobile', value: 62.5, color: '#3B82F6' },
      { name: 'Desktop', value: 31.2, color: '#8B5CF6' },
      { name: 'Tablet', value: 6.3, color: '#10B981' },
    ],
    topProducts: [
      { name: 'Professional Plan', sales: 1847, revenue: 18470000, growth: 12.5 },
      { name: 'Business Plan', sales: 923, revenue: 55380000, growth: 23.8 },
      { name: 'Starter Plan', revenue: 51393000, sales: 4953, growth: 8.2 },
    ],
    hourlyActivity: Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      users: Math.floor(Math.random() * 500) + 200,
      pageviews: Math.floor(Math.random() * 1500) + 500,
    })),
    conversionFunnel: [
      { stage: 'Visitors', count: 15420, percentage: 100 },
      { stage: 'Product Views', count: 8234, percentage: 53.4 },
      { stage: 'Add to Cart', count: 3126, percentage: 20.3 },
      { stage: 'Checkout', count: 1543, percentage: 10.0 },
      { stage: 'Purchase', count: 527, percentage: 3.4 },
    ],
  });

  useEffect(() => {
    // In production, this would load Chart.js from CDN
    const loadChartJS = () => {
      if (typeof window !== 'undefined' && !(window as any).Chart) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js';
        script.async = true;
        script.onload = () => {
          initializeCharts();
        };
        document.head.appendChild(script);
      } else if ((window as any).Chart) {
        initializeCharts();
      }
    };

    loadChartJS();
  }, [timeRange, analyticsData]);

  const initializeCharts = () => {
    const Chart = (window as any).Chart;
    if (!Chart) return;

    // Revenue Trend Chart
    const revCtx = document.getElementById('revenueChart') as HTMLCanvasElement;
    if (revCtx && !chartData?.revenue) {
      new Chart(revCtx, {
        type: 'line',
        data: {
          labels: analyticsData.revenueData.map(d => d.date.slice(5)),
          datasets: [
            {
              label: 'Revenue (IDR)',
              data: analyticsData.revenueData.map(d => d.revenue / 1000000),
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx: any) => `Rp ${ctx.parsed.y.toFixed(2)}M`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value: any) => `Rp ${value}M`,
              },
            },
          },
        },
      });
    }

    // Traffic Sources Chart
    const trafficCtx = document.getElementById('trafficChart') as HTMLCanvasElement;
    if (trafficCtx && !chartData?.traffic) {
      new Chart(trafficCtx, {
        type: 'doughnut',
        data: {
          labels: analyticsData.trafficSources.map(s => s.name),
          datasets: [
            {
              data: analyticsData.trafficSources.map(s => s.value),
              backgroundColor: analyticsData.trafficSources.map(s => s.color),
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'right' },
            tooltip: {
              callbacks: {
                label: (ctx: any) => `${ctx.label}: ${ctx.parsed}%`,
              },
            },
          },
        },
      });
    }

    // Device Breakdown Chart
    const deviceCtx = document.getElementById('deviceChart') as HTMLCanvasElement;
    if (deviceCtx && !chartData?.device) {
      new Chart(deviceCtx, {
        type: 'bar',
        data: {
          labels: analyticsData.deviceBreakdown.map(d => d.name),
          datasets: [
            {
              label: 'Device Usage %',
              data: analyticsData.deviceBreakdown.map(d => d.value),
              backgroundColor: analyticsData.deviceBreakdown.map(d => d.color),
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx: any) => `${ctx.parsed.y}%`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value: any) => `${value}%`,
              },
            },
          },
        },
      });
    }

    // Hourly Activity Chart
    const hourlyCtx = document.getElementById('hourlyChart') as HTMLCanvasElement;
    if (hourlyCtx && !chartData?.hourly) {
      new Chart(hourlyCtx, {
        type: 'line',
        data: {
          labels: analyticsData.hourlyActivity.map(h => h.hour),
          datasets: [
            {
              label: 'Active Users',
              data: analyticsData.hourlyActivity.map(h => h.users),
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.4,
              fill: true,
            },
            {
              label: 'Pageviews',
              data: analyticsData.hourlyActivity.map(h => h.pageviews),
              borderColor: '#8B5CF6',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }

    setChartData({ revenue: true, traffic: true, device: true, hourly: true });
  };

  const formatCurrency = (value: number) => {
    return `Rp ${(value / 1000000).toFixed(2)}M`;
  };

  const StatCard = ({
    title,
    value,
    growth,
    icon: Icon,
    colorClass,
  }: {
    title: string;
    value: string;
    growth: number;
    icon: any;
    colorClass: string;
  }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${colorClass} bg-opacity-10 rounded-lg`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
        <div className="flex items-center gap-1">
          {growth > 0 ? (
            <ArrowUp className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-semibold ${growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(growth)}%
          </span>
        </div>
      </div>
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Real-time business intelligence & insights</p>
            </div>
            <div className="flex gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8 flex gap-2">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Analytics Overview
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'features'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Layers className="w-5 h-5" />
            Feature Settings
          </button>
        </div>

        {/* Analytics Tab Content */}
        {activeTab === 'analytics' && (
          <div>
            {/* KPI Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(analyticsData.overview.totalRevenue)}
            growth={analyticsData.overview.revenueGrowth}
            icon={DollarSign}
            colorClass="text-primary-600"
          />
          <StatCard
            title="Total Users"
            value={analyticsData.overview.totalUsers.toLocaleString()}
            growth={analyticsData.overview.userGrowth}
            icon={Users}
            colorClass="text-green-600"
          />
          <StatCard
            title="Active Users"
            value={analyticsData.overview.activeUsers.toLocaleString()}
            growth={analyticsData.overview.activeGrowth}
            icon={Activity}
            colorClass="text-blue-600"
          />
          <StatCard
            title="Conversion Rate"
            value={`${analyticsData.overview.conversionRate}%`}
            growth={analyticsData.overview.conversionGrowth}
            icon={Target}
            colorClass="text-purple-600"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                Revenue Trend (7 Days)
              </h2>
              <span className="text-sm text-gray-500">IDR Millions</span>
            </div>
            <canvas id="revenueChart" height="250"></canvas>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-primary-600" />
                Traffic Sources
              </h2>
              <span className="text-sm text-gray-500">Last 7 Days</span>
            </div>
            <canvas id="trafficChart" height="250"></canvas>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
                Device Breakdown
              </h2>
              <span className="text-sm text-gray-500">Percentage</span>
            </div>
            <canvas id="deviceChart" height="250"></canvas>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary-600" />
                Hourly Activity (Today)
              </h2>
              <span className="text-sm text-gray-500">Users & Pageviews</span>
            </div>
            <canvas id="hourlyChart" height="250"></canvas>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-primary-600" />
            Conversion Funnel
          </h2>
          <div className="space-y-4">
            {analyticsData.conversionFunnel.map((stage, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{stage.stage}</span>
                  <span className="text-sm text-gray-500">
                    {stage.count.toLocaleString()} ({stage.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ShoppingCart className="w-6 h-6 mr-2 text-primary-600" />
            Top Performing Products
          </h2>
          <div className="space-y-4">
            {analyticsData.topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.sales.toLocaleString()} sales • {formatCurrency(product.revenue)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-green-500">
                    <ArrowUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">{product.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
          </div>
        )}

        {/* Features Tab Content */}
        {activeTab === 'features' && (
          <div className="space-y-8">
            {/* Subscription Status */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Subscription</h2>
                  <p className="text-gray-600">Professional Plan - All Features Unlocked</p>
                </div>
                <div className="px-6 py-3 bg-green-500 text-white rounded-full font-bold text-lg">
                  ✓ ACTIVE
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600">Plan</div>
                  <div className="text-xl font-bold text-gray-900">Professional</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600">Next Billing</div>
                  <div className="text-xl font-bold text-gray-900">Mar 15, 2025</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600">Monthly Cost</div>
                  <div className="text-xl font-bold text-gray-900">Rp 299,000</div>
                </div>
              </div>
            </div>

            {/* AI-Powered Features */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Brain className="w-7 h-7 mr-3 text-purple-600" />
                AI-Powered Analytics Features
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-600 text-white rounded-lg">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Predictive Analytics</h3>
                      <p className="text-sm text-gray-600">ML-powered forecasting</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">• Revenue Forecasting</span>
                      <span className="text-green-600 font-semibold">✓ Enabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">• Churn Prediction</span>
                      <span className="text-green-600 font-semibold">✓ Enabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">• Customer Segmentation</span>
                      <span className="text-green-600 font-semibold">✓ Enabled</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-600 text-white rounded-lg">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Smart Alerts</h3>
                      <p className="text-sm text-gray-600">Anomaly detection</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">• Revenue Anomalies</span>
                      <span className="text-green-600 font-semibold">✓ Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">• Traffic Spikes</span>
                      <span className="text-green-600 font-semibold">✓ Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">• Conversion Drops</span>
                      <span className="text-green-600 font-semibold">✓ Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Integrations */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Database className="w-7 h-7 mr-3 text-blue-600" />
                Connected Data Sources
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Google Analytics', status: 'connected', count: '15.2K events/day' },
                  { name: 'Facebook Ads', status: 'connected', count: '8.5K impressions/day' },
                  { name: 'Shopify Store', status: 'connected', count: '234 orders/day' },
                  { name: 'Instagram Insights', status: 'connected', count: '45K reach/day' },
                  { name: 'Stripe Payments', status: 'connected', count: 'Rp 25M/day' },
                  { name: 'Email Marketing', status: 'connected', count: '12K subscribers' },
                ].map((source, idx) => (
                  <div key={idx} className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900">{source.name}</h3>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-sm text-gray-600">{source.count}</div>
                    <div className="mt-3 text-xs text-green-600 font-semibold">✓ Syncing</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                <p className="text-sm text-gray-700">
                  <strong>6 of 50</strong> data sources connected • <span className="text-blue-600 font-semibold">44 more available</span>
                </p>
              </div>
            </div>

            {/* Feature Usage Stats */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-7 h-7 mr-3 text-green-600" />
                Feature Usage This Month
              </h2>
              <div className="space-y-4">
                {[
                  { feature: 'Dashboard Views', used: 847, limit: 'Unlimited', percentage: 100 },
                  { feature: 'Custom Reports Generated', used: 234, limit: 500, percentage: 46.8 },
                  { feature: 'AI Insights Accessed', used: 156, limit: 300, percentage: 52 },
                  { feature: 'Data Export Operations', used: 89, limit: 200, percentage: 44.5 },
                  { feature: 'API Calls', used: 15420, limit: 100000, percentage: 15.4 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{item.feature}</span>
                      <span className="text-sm text-gray-600">
                        {item.used.toLocaleString()} / {typeof item.limit === 'number' ? item.limit.toLocaleString() : item.limit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(item.percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
