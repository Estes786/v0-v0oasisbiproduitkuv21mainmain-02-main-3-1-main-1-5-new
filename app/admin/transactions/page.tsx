'use client'

export default function AdminTransactionsPage() {
  // Mock transaction data
  const transactions = [
    { 
      id: "TRX-2025-001234", 
      user: "PT Berkah Jaya", 
      email: "admin@berkahjaya.co.id",
      amount: 3999000, 
      plan: "Business", 
      paymentMethod: "BCA Virtual Account",
      status: "Success", 
      date: "2025-11-25 14:35:22",
      merchantOrderId: "OASIS-1732524922-ABC",
      reference: "123456789012"
    },
    { 
      id: "TRX-2025-001233", 
      user: "CV Digital Sukses", 
      email: "contact@digitalsukses.id",
      amount: 999000, 
      plan: "Professional", 
      paymentMethod: "OVO E-Wallet",
      status: "Success", 
      date: "2025-11-25 12:20:15",
      merchantOrderId: "OASIS-1732517615-DEF",
      reference: "987654321098"
    },
    { 
      id: "TRX-2025-001232", 
      user: "PT Maju Bersama", 
      email: "info@majubersama.com",
      amount: 299000, 
      plan: "Starter", 
      paymentMethod: "Mandiri Virtual Account",
      status: "Pending", 
      date: "2025-11-25 10:15:45",
      merchantOrderId: "OASIS-1732509945-GHI",
      reference: "pending"
    },
    { 
      id: "TRX-2025-001231", 
      user: "UD Sentosa Makmur", 
      email: "admin@sentosamakmur.id",
      amount: 999000, 
      plan: "Professional", 
      paymentMethod: "GoPay E-Wallet",
      status: "Success", 
      date: "2025-11-24 16:45:30",
      merchantOrderId: "OASIS-1732451130-JKL",
      reference: "567890123456"
    },
    { 
      id: "TRX-2025-001230", 
      user: "PT Inovasi Digital", 
      email: "hello@inovasidigital.id",
      amount: 3999000, 
      plan: "Business", 
      paymentMethod: "BNI Virtual Account",
      status: "Success", 
      date: "2025-11-24 09:30:12",
      merchantOrderId: "OASIS-1732422612-MNO",
      reference: "234567890123"
    },
    { 
      id: "TRX-2025-001229", 
      user: "CV Kreasi Mandiri", 
      email: "contact@kreasimandiri.co.id",
      amount: 999000, 
      plan: "Professional", 
      paymentMethod: "QRIS",
      status: "Failed", 
      date: "2025-11-23 15:20:45",
      merchantOrderId: "OASIS-1732373245-PQR",
      reference: "failed"
    },
    { 
      id: "TRX-2025-001228", 
      user: "PT Tech Solutions", 
      email: "admin@techsolutions.id",
      amount: 3999000, 
      plan: "Business", 
      paymentMethod: "Credit Card (Visa)",
      status: "Success", 
      date: "2025-11-23 11:45:30",
      merchantOrderId: "OASIS-1732360530-STU",
      reference: "345678901234"
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      Success: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Failed: 'bg-red-100 text-red-800',
    }
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction Management</h1>
              <p className="text-gray-600">Kelola dan monitor semua transaksi pembayaran</p>
            </div>
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">1,234</div>
                <div className="text-sm text-gray-600">Total Transactions</div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">1,189</div>
                <div className="text-sm text-gray-600">Success</div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">12</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">33</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-8 rounded-xl shadow-lg mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-primary-100 mb-2">Total Revenue</div>
              <div className="text-3xl font-bold">{formatCurrency(456789000)}</div>
            </div>
            <div>
              <div className="text-primary-100 mb-2">This Month</div>
              <div className="text-3xl font-bold">{formatCurrency(89456000)}</div>
              <div className="text-sm text-primary-100 mt-1">+24.5% from last month</div>
            </div>
            <div>
              <div className="text-primary-100 mb-2">Average Transaction</div>
              <div className="text-3xl font-bold">{formatCurrency(1899000)}</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder="Search by ID, user, or email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600">
              <option>All Status</option>
              <option>Success</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600">
              <option>All Plans</option>
              <option>Starter</option>
              <option>Professional</option>
              <option>Business</option>
            </select>
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900">{trx.id}</div>
                      <div className="text-xs text-gray-500">{trx.merchantOrderId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{trx.user}</div>
                      <div className="text-xs text-gray-500">{trx.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {trx.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{formatCurrency(trx.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{trx.paymentMethod}</div>
                      <div className="text-xs text-gray-500">{trx.reference}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(trx.status)}`}>
                        {trx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{trx.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button className="text-primary-600 hover:text-primary-700 font-medium">View</button>
                        <button className="text-gray-600 hover:text-gray-700 font-medium">Invoice</button>
                        {trx.status === 'Pending' && (
                          <button className="text-green-600 hover:text-green-700 font-medium">Verify</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing 1 to 7 of 1,234 transactions
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
