"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  Zap,
  Crown,
  CreditCard,
  Calendar,
  Settings,
  BarChartIcon,
} from "lucide-react"

// Sample data - Replace with real API calls
const revenueData = [
  { month: "Jan", revenue: 125000, target: 150000 },
  { month: "Feb", revenue: 158000, target: 150000 },
  { month: "Mar", revenue: 142000, target: 150000 },
  { month: "Apr", revenue: 195000, target: 180000 },
  { month: "May", revenue: 223000, target: 200000 },
  { month: "Jun", revenue: 248000, target: 220000 },
  { month: "Jul", revenue: 285000, target: 250000 },
]

const trafficSources = [
  { name: "Organic Search", value: 45, color: "#3b82f6" },
  { name: "Direct", value: 25, color: "#10b981" },
  { name: "Social Media", value: 20, color: "#f59e0b" },
  { name: "Referral", value: 10, color: "#ef4444" },
]

const conversionFunnel = [
  { stage: "Visitors", count: 50000 },
  { stage: "Signups", count: 12000 },
  { stage: "Trial Users", count: 5000 },
  { stage: "Paid Users", count: 1250 },
]

const hourlyActivity = [
  { hour: "00:00", events: 120, users: 45 },
  { hour: "04:00", events: 80, users: 30 },
  { hour: "08:00", events: 350, users: 150 },
  { hour: "12:00", events: 620, users: 280 },
  { hour: "16:00", events: 580, users: 260 },
  { hour: "20:00", events: 420, users: 180 },
  { hour: "24:00", events: 220, users: 90 },
]

const aiInsights = [
  {
    type: "success",
    icon: <CheckCircle className="text-green-600" size={24} />,
    title: "Revenue Surge Detected",
    description:
      "Your revenue increased by 45% this month. Key drivers: Premium tier upgrades (+32%), Enterprise deals (+18%)",
    action: "View Details",
    priority: "high",
  },
  {
    type: "warning",
    icon: <AlertCircle className="text-yellow-600" size={24} />,
    title: "Conversion Dip Alert",
    description: "Trial-to-paid conversion dropped 8% last week. Recommended: Review onboarding flow, add product tour",
    action: "Optimize Now",
    priority: "medium",
  },
  {
    type: "info",
    icon: <Clock className="text-blue-600" size={24} />,
    title: "Peak Traffic Window",
    description:
      "Your users are most active between 12PM-4PM. Schedule important features/announcements during this time",
    action: "Schedule Campaign",
    priority: "low",
  },
]

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("7d")
  const [activeTab, setActiveTab] = useState<"analytics" | "member">("analytics")

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Member Dashboard</h1>
          <p className="text-gray-600">Real-time business intelligence with AI-powered insights</p>
        </div>

        {/* Subscription Status Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 mb-8 text-white shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Crown className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold">Professional Plan</h2>
                <p className="text-blue-100">Member sejak: 15 November 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-sm text-blue-100">Billing Period</div>
                <div className="font-bold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Monthly - Rp 299,000
                </div>
              </div>
              <div>
                <div className="text-sm text-blue-100">Next Billing Date</div>
                <div className="font-bold">15 Desember 2024</div>
              </div>
              <Link
                href="/pricing"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2"
              >
                <Settings className="w-5 h-5" />
                Manage Subscription
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white rounded-lg p-2 shadow">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "analytics" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            📊 Analytics Dashboard
          </button>
          <button
            onClick={() => setActiveTab("member")}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "member" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            👤 Member Features
          </button>
        </div>

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Revenue"
                value="Rp 285M"
                change="+45%"
                trend="up"
                icon={<DollarSign size={24} />}
                color="blue"
              />
              <StatCard
                title="Active Users"
                value="12,450"
                change="+12%"
                trend="up"
                icon={<Users size={24} />}
                color="green"
              />
              <StatCard
                title="Conversion Rate"
                value="2.5%"
                change="-8%"
                trend="down"
                icon={<ShoppingCart size={24} />}
                color="yellow"
              />
              <StatCard
                title="Avg. Session"
                value="8m 32s"
                change="+5%"
                trend="up"
                icon={<Activity size={24} />}
                color="purple"
              />
            </div>

            {/* AI Insights Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🤖 AI-Powered Insights</h2>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex-shrink-0">{insight.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                      <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                        {insight.action} →
                      </button>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        insight.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : insight.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {insight.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Revenue Trend */}
              <ChartCard title="Revenue Trend vs Target">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      name="Actual Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.1}
                      name="Target"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Traffic Sources */}
              <ChartCard title="Traffic Sources Distribution">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Conversion Funnel */}
              <ChartCard title="Conversion Funnel Analysis">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conversionFunnel}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Hourly Activity */}
              <ChartCard title="Hourly Activity Pattern">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hourlyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="events" stroke="#3b82f6" name="Events" />
                    <Line type="monotone" dataKey="users" stroke="#10b981" name="Active Users" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        )}

        {/* Member Features Tab */}
        {activeTab === "member" && (
          <div className="space-y-8">
            {/* Member Features Overview */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Your Member Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Database className="w-8 h-8 text-blue-600" />,
                    title: "Data Integrations",
                    description: "50/50 data sources connected",
                    status: "Active",
                    features: ["Google Analytics", "Shopee API", "Tokopedia", "Facebook Ads", "Instagram"],
                  },
                  {
                    icon: <BarChartIcon className="w-8 h-8 text-green-600" />,
                    title: "Custom Dashboards",
                    description: "18/50 dashboards created",
                    status: "Active",
                    features: ["Real-time analytics", "Custom widgets", "AI insights", "Export reports"],
                  },
                  {
                    icon: <Users className="w-8 h-8 text-purple-600" />,
                    title: "Team Access",
                    description: "4/10 team members",
                    status: "Active",
                    features: ["Role-based access", "Activity logs", "Collaboration tools"],
                  },
                  {
                    icon: <Zap className="w-8 h-8 text-yellow-600" />,
                    title: "API Access",
                    description: "Unlimited API calls",
                    status: "Active",
                    features: ["REST API", "Webhooks", "Real-time data push"],
                  },
                  {
                    icon: <Zap className="w-8 h-8 text-red-600" />,
                    title: "AI Analytics",
                    description: "Advanced AI features",
                    status: "Active",
                    features: ["Anomaly detection", "Revenue forecasting", "Churn prediction"],
                  },
                  {
                    icon: <Zap className="w-8 h-8 text-indigo-600" />,
                    title: "Priority Support",
                    description: "24/7 support access",
                    status: "Active",
                    features: ["Email support", "Live chat", "Dedicated account manager"],
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm">{feature.icon}</div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        {feature.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Source Connections */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔌 Connected Data Sources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "Google Analytics", status: "Connected", lastSync: "5 minutes ago", icon: "📊" },
                  { name: "Shopee Merchant API", status: "Connected", lastSync: "10 minutes ago", icon: "🛒" },
                  { name: "Tokopedia API", status: "Connected", lastSync: "15 minutes ago", icon: "🏪" },
                  { name: "Facebook Ads", status: "Connected", lastSync: "20 minutes ago", icon: "📱" },
                  { name: "Instagram Business", status: "Connected", lastSync: "25 minutes ago", icon: "📸" },
                  { name: "PostgreSQL Database", status: "Connected", lastSync: "2 minutes ago", icon: "🗄️" },
                ].map((source, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{source.icon}</div>
                      <div>
                        <h3 className="font-bold text-gray-900">{source.name}</h3>
                        <p className="text-sm text-gray-600">Last sync: {source.lastSync}</p>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                      {source.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Add New Data Source
                </button>
              </div>
            </div>

            {/* Subscription Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">💳 Subscription Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <CreditCard className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Current Plan</h3>
                  <p className="text-2xl font-bold text-blue-600">Professional</p>
                  <p className="text-sm text-gray-600 mt-1">Rp 299,000/month</p>
                </div>
                <div className="p-6 bg-green-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Next Billing</h3>
                  <p className="text-2xl font-bold text-green-600">15 Des 2024</p>
                  <p className="text-sm text-gray-600 mt-1">Auto-renewal active</p>
                </div>
                <div className="p-6 bg-purple-50 rounded-lg">
                  <Activity className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Usage This Month</h3>
                  <p className="text-2xl font-bold text-purple-600">72%</p>
                  <p className="text-sm text-gray-600 mt-1">36/50 dashboards</p>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <Link
                  href="/pricing"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Upgrade to Enterprise
                </Link>
                <button className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
                  View Billing History
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Payment Method</h2>
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg">
                <div className="flex items-center gap-4">
                  <CreditCard className="w-12 h-12" />
                  <div>
                    <p className="text-sm opacity-90">Payment via</p>
                    <p className="text-xl font-bold">Duitku Payment Gateway</p>
                    <p className="text-sm opacity-90 mt-1">Bank Transfer, E-Wallet, Credit Card</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                  Change Method
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ title, value, change, trend, icon, color }: any) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>{icon}</div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend === "up" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  )
}

function ChartCard({ title, children }: any) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  )
}
