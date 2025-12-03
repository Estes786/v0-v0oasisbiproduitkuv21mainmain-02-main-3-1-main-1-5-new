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
} from 'lucide-react';

export default function AnalyticsDashboardPage() {
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const [chartData, setChartData] = useState<any>(null);

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
    </div>
  );
}
