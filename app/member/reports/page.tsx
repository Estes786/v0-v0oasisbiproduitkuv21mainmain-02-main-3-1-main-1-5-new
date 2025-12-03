'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Download,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Share2,
  MoreVertical
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  description: string;
  type: 'revenue' | 'traffic' | 'conversion' | 'custom';
  dateRange: string;
  createdAt: string;
  lastAccessed: string;
  status: 'completed' | 'processing' | 'scheduled';
  icon: any;
  color: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Monthly Revenue Analysis',
      description: 'Comprehensive revenue breakdown for December 2024',
      type: 'revenue',
      dateRange: 'Dec 1 - Dec 31, 2024',
      createdAt: '2024-12-28',
      lastAccessed: '2 hours ago',
      status: 'completed',
      icon: DollarSign,
      color: 'green'
    },
    {
      id: '2',
      title: 'Traffic Sources Report',
      description: 'Analysis of traffic channels and user acquisition',
      type: 'traffic',
      dateRange: 'Last 30 days',
      createdAt: '2024-12-25',
      lastAccessed: '1 day ago',
      status: 'completed',
      icon: Users,
      color: 'blue'
    },
    {
      id: '3',
      title: 'Conversion Funnel Analysis',
      description: 'Detailed conversion tracking and optimization insights',
      type: 'conversion',
      dateRange: 'Q4 2024',
      createdAt: '2024-12-20',
      lastAccessed: '3 days ago',
      status: 'completed',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      id: '4',
      title: 'Weekly Performance Summary',
      description: 'Automated weekly KPI report',
      type: 'custom',
      dateRange: 'Dec 23 - Dec 29',
      createdAt: '2024-12-30',
      lastAccessed: 'Just now',
      status: 'processing',
      icon: Activity,
      color: 'orange'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  // Filter and sort reports
  const filteredReports = reports
    .filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || report.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-700 border-green-300',
      processing: 'bg-blue-100 text-blue-700 border-blue-300',
      scheduled: 'bg-purple-100 text-purple-700 border-purple-300'
    };
    const labels = {
      completed: 'Completed',
      processing: 'Processing',
      scheduled: 'Scheduled'
    };
    return { style: styles[status as keyof typeof styles], label: labels[status as keyof typeof labels] };
  };

  const handleDelete = (reportId: string) => {
    if (confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(r => r.id !== reportId));
    }
  };

  const stats = [
    { label: 'Total Reports', value: reports.length, icon: FileText, color: 'blue' },
    { label: 'This Month', value: reports.filter(r => new Date(r.createdAt).getMonth() === new Date().getMonth()).length, icon: Calendar, color: 'purple' },
    { label: 'Processing', value: reports.filter(r => r.status === 'processing').length, icon: Clock, color: 'orange' },
    { label: 'Completed', value: reports.filter(r => r.status === 'completed').length, icon: TrendingUp, color: 'green' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Custom Reports</h2>
          <p className="text-gray-600">
            Generate, manage, and download custom analytics reports
          </p>
        </div>
        <Link
          href="/member/reports/create"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Report
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 hover:border-blue-500 transition-all">
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

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter by Type */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="revenue">Revenue</option>
            <option value="traffic">Traffic</option>
            <option value="conversion">Conversion</option>
            <option value="custom">Custom</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || filterType !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Create your first custom report to get started'}
          </p>
          <Link
            href="/member/reports/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Report
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReports.map((report) => {
            const statusBadge = getStatusBadge(report.status);
            return (
              <div
                key={report.id}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-blue-500 transition-all overflow-hidden group"
              >
                {/* Report Header */}
                <div className={`bg-gradient-to-r from-${report.color}-500 to-${report.color}-600 p-6 relative`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <report.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{report.title}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border-2 ${statusBadge.style}`}>
                          {statusBadge.label}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Report Body */}
                <div className="p-6">
                  <p className="text-gray-700 mb-4 leading-relaxed">{report.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="font-semibold">Date Range:</span>
                      <span>{report.dateRange}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold">Last accessed:</span>
                      <span>{report.lastAccessed}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      disabled={report.status === 'processing'}
                    >
                      {report.status === 'processing' ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          View
                        </>
                      )}
                    </button>
                    <button
                      className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all flex items-center gap-2"
                      disabled={report.status === 'processing'}
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Templates */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Report Templates</h3>
            <p className="text-purple-100">Start with pre-built templates for common use cases</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Monthly Performance', icon: TrendingUp },
            { name: 'Revenue Analysis', icon: DollarSign },
            { name: 'Traffic Overview', icon: Users }
          ].map((template, index) => (
            <Link
              key={index}
              href="/member/reports/create"
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all border-2 border-white/20 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <template.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">{template.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
