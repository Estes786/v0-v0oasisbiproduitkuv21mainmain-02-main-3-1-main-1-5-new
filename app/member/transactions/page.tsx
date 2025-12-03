'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Search, Filter, FileText, Calendar } from 'lucide-react';

export default function TransactionsPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in real app, fetch from API
  const transactions = [
    {
      id: '1',
      merchantOrderId: 'OASIS-1735132800-ABC',
      reference: 'REF-2025-001',
      planType: 'professional',
      amount: 299000,
      paymentMethod: 'BCA Virtual Account',
      status: 'success',
      paidAt: '2025-01-01T10:30:00',
      invoiceUrl: '#',
    },
    {
      id: '2',
      merchantOrderId: 'OASIS-1732540800-DEF',
      reference: 'REF-2024-012',
      planType: 'starter',
      amount: 99000,
      paymentMethod: 'GoPay',
      status: 'success',
      paidAt: '2024-12-01T15:20:00',
      invoiceUrl: '#',
    },
    {
      id: '3',
      merchantOrderId: 'OASIS-1729948800-GHI',
      reference: null,
      planType: 'business',
      amount: 499000,
      paymentMethod: 'Credit Card',
      status: 'pending',
      paidAt: null,
      invoiceUrl: null,
    },
    {
      id: '4',
      merchantOrderId: 'OASIS-1727356800-JKL',
      reference: null,
      planType: 'starter',
      amount: 99000,
      paymentMethod: 'OVO',
      status: 'failed',
      paidAt: null,
      invoiceUrl: null,
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      success: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getPlanName = (planType: string) => {
    const plans: { [key: string]: string } = {
      starter: 'Starter',
      professional: 'Professional',
      business: 'Business',
    };
    return plans[planType] || planType;
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      transaction.merchantOrderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: transactions.length,
    success: transactions.filter((t) => t.status === 'success').length,
    pending: transactions.filter((t) => t.status === 'pending').length,
    failed: transactions.filter((t) => t.status === 'failed').length,
    totalAmount: transactions
      .filter((t) => t.status === 'success')
      .reduce((sum, t) => sum + t.amount, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Link
                href="/member/dashboard"
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Riwayat Transaksi</h1>
                <p className="text-gray-600 mt-1">Lihat semua transaksi dan download invoice</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-2">Total Transaksi</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-2">Success</p>
            <p className="text-3xl font-bold text-green-600">{stats.success}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-2">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-2">Total Paid</p>
            <p className="text-2xl font-bold text-primary-600">
              Rp {stats.totalAmount.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Order ID or Reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                <option value="all">Semua Status</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Reference
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Plan
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Payment Method
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.merchantOrderId}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-600">
                        {transaction.reference || '-'}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {getPlanName(transaction.planType)}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-600">{transaction.paymentMethod}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-semibold text-gray-900">
                        Rp {transaction.amount.toLocaleString('id-ID')}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                          transaction.status
                        )}`}
                      >
                        {transaction.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {transaction.paidAt
                          ? new Date(transaction.paidAt).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })
                          : '-'}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {transaction.status === 'success' && transaction.invoiceUrl ? (
                        <button className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-semibold">
                          <Download className="w-4 h-4 mr-1" />
                          Invoice
                        </button>
                      ) : transaction.status === 'pending' ? (
                        <Link
                          href={`/payment/pending?merchantOrderId=${transaction.merchantOrderId}`}
                          className="text-yellow-600 hover:text-yellow-700 text-sm font-semibold"
                        >
                          Check Status
                        </Link>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tidak ada transaksi ditemukan</p>
              <p className="text-gray-400 text-sm mt-2">
                Coba ubah filter atau search query Anda
              </p>
            </div>
          )}
        </div>

        {/* Export Button */}
        {filteredTransactions.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Export to CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
