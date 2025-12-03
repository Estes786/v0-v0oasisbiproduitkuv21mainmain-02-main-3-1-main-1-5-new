'use client';

import { useEffect, useState } from 'react';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Lightbulb,
  Zap,
  Target,
  DollarSign,
  Users,
  Activity,
  RefreshCw,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Clock,
  Star
} from 'lucide-react';

interface Insight {
  id: string;
  type: 'opportunity' | 'warning' | 'success' | 'recommendation';
  category: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  metric: {
    label: string;
    value: string;
    change: number;
  };
  action: string;
  timestamp: string;
}

export default function AIInsightsPage() {
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: '1',
      type: 'opportunity',
      category: 'Revenue Optimization',
      title: 'Peak Revenue Window Detected',
      description: 'Your highest conversion rate occurs between 2 PM - 4 PM on weekdays. Consider increasing ad spend during this window to maximize ROI.',
      impact: 'high',
      confidence: 92,
      metric: {
        label: 'Potential Revenue Increase',
        value: '+Rp 12.4M',
        change: 24.5
      },
      action: 'Optimize ad scheduling',
      timestamp: '5 minutes ago'
    },
    {
      id: '2',
      type: 'warning',
      category: 'User Engagement',
      title: 'Bounce Rate Spike on Mobile',
      description: 'Mobile bounce rate has increased by 18% in the last 7 days. Page load time may be affecting user experience.',
      impact: 'high',
      confidence: 87,
      metric: {
        label: 'Affected Users',
        value: '2,847',
        change: -18.3
      },
      action: 'Optimize mobile performance',
      timestamp: '12 minutes ago'
    },
    {
      id: '3',
      type: 'success',
      category: 'Conversion Rate',
      title: 'A/B Test Winner Identified',
      description: 'Variant B of your pricing page shows 34% higher conversion rate. Consider making this the default experience.',
      impact: 'high',
      confidence: 95,
      metric: {
        label: 'Conversion Improvement',
        value: '+34%',
        change: 34.2
      },
      action: 'Deploy winning variant',
      timestamp: '1 hour ago'
    },
    {
      id: '4',
      type: 'recommendation',
      category: 'Customer Retention',
      title: 'Re-engagement Campaign Opportunity',
      description: '423 users have been inactive for 30+ days but showed high engagement previously. A targeted email campaign could recover 15-20% of these users.',
      impact: 'medium',
      confidence: 78,
      metric: {
        label: 'Recoverable Revenue',
        value: 'Rp 8.2M',
        change: 15.8
      },
      action: 'Launch re-engagement campaign',
      timestamp: '2 hours ago'
    },
    {
      id: '5',
      type: 'opportunity',
      category: 'Traffic Growth',
      title: 'Trending Content Identified',
      description: 'Your blog post "AI Analytics Guide" is gaining traction on social media. Amplifying this content could drive 2-3x more organic traffic.',
      impact: 'medium',
      confidence: 84,
      metric: {
        label: 'Organic Traffic Potential',
        value: '+1,240',
        change: 156.8
      },
      action: 'Boost content promotion',
      timestamp: '3 hours ago'
    },
    {
      id: '6',
      type: 'warning',
      category: 'Funnel Analysis',
      title: 'Cart Abandonment Increase',
      description: 'Shopping cart abandonment rate increased from 42% to 58%. Payment page load time may be a contributing factor.',
      impact: 'high',
      confidence: 91,
      metric: {
        label: 'Lost Revenue',
        value: 'Rp 6.3M',
        change: -38.1
      },
      action: 'Optimize checkout flow',
      timestamp: '5 hours ago'
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRegenerateInsights = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      // Simulate new insights
    }, 2000);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return Lightbulb;
      case 'warning': return AlertCircle;
      case 'success': return CheckCircle;
      case 'recommendation': return Target;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'blue';
      case 'warning': return 'red';
      case 'success': return 'green';
      case 'recommendation': return 'purple';
      default: return 'gray';
    }
  };

  const getImpactBadge = (impact: string) => {
    const styles = {
      high: 'bg-red-100 text-red-700 border-red-300',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      low: 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return styles[impact as keyof typeof styles];
  };

  const stats = [
    { label: 'Total Insights', value: insights.length, icon: Brain, color: 'purple' },
    { label: 'High Priority', value: insights.filter(i => i.impact === 'high').length, icon: AlertCircle, color: 'red' },
    { label: 'Avg Confidence', value: `${Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length)}%`, icon: Star, color: 'blue' },
    { label: 'Last Updated', value: '5 min ago', icon: Clock, color: 'green' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-semibold">Generating AI insights...</p>
          <p className="text-gray-500 mt-2">Analyzing your data with machine learning</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            AI-Powered Insights
          </h2>
          <p className="text-gray-600">
            Actionable recommendations powered by machine learning
          </p>
        </div>
        <button
          onClick={handleRegenerateInsights}
          disabled={generating}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${generating ? 'animate-spin' : ''}`} />
          {generating ? 'Generating...' : 'Refresh Insights'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 hover:border-purple-500 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-14 h-14 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Status Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">AI Analysis Active</h3>
              <p className="text-purple-100">
                Continuously analyzing {insights.length} patterns across your data
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">RUNNING</span>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="space-y-6">
        {insights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          const color = getInsightColor(insight.type);
          
          return (
            <div
              key={insight.id}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-purple-500 transition-all overflow-hidden group"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-14 h-14 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{insight.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getImpactBadge(insight.impact)}`}>
                          {insight.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 font-semibold mb-3">
                        {insight.category} • {insight.timestamp}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div className="text-right ml-6">
                    <div className="w-20 h-20 relative">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="#e5e7eb"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke={`var(--${color}-600)`}
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${insight.confidence * 2.26} 226`}
                          strokeLinecap="round"
                          className={`stroke-${color}-600`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">{insight.confidence}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 font-semibold mt-1">Confidence</p>
                  </div>
                </div>

                {/* Metric */}
                <div className={`bg-gradient-to-br from-${color}-50 to-${color}-100 rounded-xl p-6 mb-6 border-2 border-${color}-200`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">{insight.metric.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{insight.metric.value}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${
                      insight.metric.change > 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {insight.metric.change > 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      {Math.abs(insight.metric.change)}%
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button className={`w-full px-6 py-4 bg-gradient-to-r from-${color}-600 to-${color}-700 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 group-hover:gap-4`}>
                  <Zap className="w-5 h-5" />
                  {insight.action}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* How AI Works */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 border-2 border-purple-200">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">How Our AI Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {[
                {
                  title: 'Data Analysis',
                  description: 'Continuously analyzes patterns across all your metrics',
                  icon: Activity
                },
                {
                  title: 'Pattern Recognition',
                  description: 'Identifies trends, anomalies, and opportunities automatically',
                  icon: TrendingUp
                },
                {
                  title: 'Actionable Insights',
                  description: 'Provides specific recommendations with confidence scores',
                  icon: Target
                }
              ].map((step, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border-2 border-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
