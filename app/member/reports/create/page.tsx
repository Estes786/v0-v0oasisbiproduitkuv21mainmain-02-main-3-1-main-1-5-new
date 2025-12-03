'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Calendar,
  Settings,
  ChevronRight,
  Check,
  Sparkles,
  Download,
  Eye,
  Clock
} from 'lucide-react';

interface ReportConfig {
  title: string;
  description: string;
  type: string;
  dateRange: string;
  customStartDate: string;
  customEndDate: string;
  metrics: string[];
  format: string;
  schedule: string;
}

export default function CreateReportPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<ReportConfig>({
    title: '',
    description: '',
    type: 'revenue',
    dateRange: 'last-30-days',
    customStartDate: '',
    customEndDate: '',
    metrics: ['revenue', 'users'],
    format: 'pdf',
    schedule: 'once'
  });

  const reportTypes = [
    {
      id: 'revenue',
      name: 'Revenue Analysis',
      description: 'Track revenue trends, conversions, and financial metrics',
      icon: DollarSign,
      color: 'green',
      metrics: ['Total Revenue', 'Average Order Value', 'Conversion Rate', 'Revenue Growth']
    },
    {
      id: 'traffic',
      name: 'Traffic & Engagement',
      description: 'Analyze traffic sources, user behavior, and engagement',
      icon: Users,
      color: 'blue',
      metrics: ['Page Views', 'Unique Visitors', 'Traffic Sources', 'Bounce Rate']
    },
    {
      id: 'conversion',
      name: 'Conversion Funnel',
      description: 'Deep dive into conversion paths and optimization',
      icon: TrendingUp,
      color: 'purple',
      metrics: ['Funnel Steps', 'Drop-off Rates', 'Conversion Time', 'Goal Completions']
    },
    {
      id: 'custom',
      name: 'Custom Report',
      description: 'Build your own report with custom metrics',
      icon: Activity,
      color: 'orange',
      metrics: ['Choose your own metrics']
    }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last-7-days', label: 'Last 7 days' },
    { value: 'last-30-days', label: 'Last 30 days' },
    { value: 'last-90-days', label: 'Last 90 days' },
    { value: 'this-month', label: 'This month' },
    { value: 'last-month', label: 'Last month' },
    { value: 'custom', label: 'Custom range' }
  ];

  const availableMetrics = [
    { id: 'revenue', name: 'Total Revenue', icon: DollarSign },
    { id: 'users', name: 'Total Users', icon: Users },
    { id: 'sessions', name: 'Sessions', icon: Activity },
    { id: 'pageviews', name: 'Page Views', icon: Eye },
    { id: 'conversions', name: 'Conversions', icon: TrendingUp },
    { id: 'bounce-rate', name: 'Bounce Rate', icon: Activity },
    { id: 'avg-session', name: 'Avg Session Duration', icon: Clock }
  ];

  const handleSubmit = () => {
    // Simulate report generation
    alert('Report generation started! You will be notified when it\'s ready.');
    router.push('/member/reports');
  };

  const toggleMetric = (metricId: string) => {
    setConfig(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metricId)
        ? prev.metrics.filter(m => m !== metricId)
        : [...prev.metrics, metricId]
    }));
  };

  const selectedType = reportTypes.find(t => t.id === config.type);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Custom Report</h2>
        <p className="text-gray-600">
          Build a tailored report with the metrics that matter most to you
        </p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Report Type' },
            { num: 2, label: 'Date Range' },
            { num: 3, label: 'Metrics' },
            { num: 4, label: 'Settings' }
          ].map((s, index) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s.num
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                </div>
                <span
                  className={`font-semibold ${
                    step >= s.num ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {index < 3 && (
                <div className="flex-1 mx-4">
                  <div className={`h-1 rounded-full ${step > s.num ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Report Type */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Report Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setConfig({ ...config, type: type.id })}
                  className={`p-6 rounded-2xl text-left transition-all border-2 ${
                    config.type === type.id
                      ? `border-${type.color}-500 bg-${type.color}-50 shadow-lg`
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${type.color}-500 to-${type.color}-600 rounded-xl flex items-center justify-center`}>
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{type.name}</h4>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                    {config.type === type.id && (
                      <Check className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                  <div className="space-y-1">
                    {type.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-2"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Date Range */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Date Range</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {dateRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setConfig({ ...config, dateRange: range.value })}
                  className={`p-4 rounded-xl text-center font-semibold transition-all border-2 ${
                    config.dateRange === range.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {config.dateRange === 'custom' && (
              <div className="grid grid-cols-2 gap-4 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={config.customStartDate}
                    onChange={(e) => setConfig({ ...config, customStartDate: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={config.customEndDate}
                    onChange={(e) => setConfig({ ...config, customEndDate: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-2"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Metrics Selection */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Metrics</h3>
            <p className="text-gray-600 mb-6">Choose the data points you want to include in your report</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {availableMetrics.map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => toggleMetric(metric.id)}
                  className={`p-4 rounded-xl text-left transition-all border-2 ${
                    config.metrics.includes(metric.id)
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      config.metrics.includes(metric.id)
                        ? 'bg-blue-600'
                        : 'bg-gray-200'
                    }`}>
                      <metric.icon className={`w-5 h-5 ${
                        config.metrics.includes(metric.id) ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900 block">{metric.name}</span>
                    </div>
                    {config.metrics.includes(metric.id) && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <p className="text-sm text-blue-900 font-semibold">
                {config.metrics.length} metric{config.metrics.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-2"
              disabled={config.metrics.length === 0}
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Settings & Generate */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Report Settings</h3>
            
            <div className="space-y-6">
              {/* Report Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Report Title *</label>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => setConfig({ ...config, title: e.target.value })}
                  placeholder="e.g., Monthly Performance Report"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
                <textarea
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                  placeholder="Brief description of this report..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Export Format */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Export Format</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'pdf', label: 'PDF Document' },
                    { value: 'xlsx', label: 'Excel Spreadsheet' },
                    { value: 'csv', label: 'CSV File' }
                  ].map((format) => (
                    <button
                      key={format.value}
                      onClick={() => setConfig({ ...config, format: format.value })}
                      className={`p-4 rounded-xl text-center font-semibold transition-all border-2 ${
                        config.format === format.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {format.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Schedule</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'once', label: 'Generate Once' },
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'monthly', label: 'Monthly' }
                  ].map((schedule) => (
                    <button
                      key={schedule.value}
                      onClick={() => setConfig({ ...config, schedule: schedule.value })}
                      className={`p-4 rounded-xl text-center font-semibold transition-all border-2 ${
                        config.schedule === schedule.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {schedule.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Report Summary</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-blue-100 text-sm mb-1">Type</p>
                <p className="font-bold text-lg">{selectedType?.name}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Date Range</p>
                <p className="font-bold text-lg">{dateRanges.find(r => r.value === config.dateRange)?.label}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Metrics</p>
                <p className="font-bold text-lg">{config.metrics.length} selected</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Format</p>
                <p className="font-bold text-lg">{config.format.toUpperCase()}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!config.title}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5" />
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
