import Link from 'next/link'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Launching OASIS BI PRO: Enterprise Business Intelligence untuk Indonesia",
      excerpt: "Kami dengan bangga memperkenalkan OASIS BI PRO, platform Business Intelligence enterprise yang dirancang khusus untuk kebutuhan bisnis di Indonesia.",
      date: "November 15, 2025",
      category: "Product Launch",
      image: "📊",
      author: "OASIS Team"
    },
    {
      id: 2,
      title: "Integrasi Duitku Payment Gateway: Kemudahan Pembayaran untuk SaaS",
      excerpt: "OASIS BI PRO kini terintegrasi penuh dengan Duitku Payment Gateway, memberikan 15+ metode pembayaran untuk kemudahan berlangganan platform kami.",
      date: "November 18, 2025",
      category: "Integration",
      image: "💳",
      author: "Engineering Team"
    },
    {
      id: 3,
      title: "AI-Powered Analytics: Masa Depan Business Intelligence",
      excerpt: "Pelajari bagaimana AI dan Machine Learning mengubah cara perusahaan menganalisis data dan membuat keputusan strategis.",
      date: "November 20, 2025",
      category: "Technology",
      image: "🤖",
      author: "Data Science Team"
    },
    {
      id: 4,
      title: "Keamanan Data: Compliance dengan GDPR dan Indonesian Law No. 27/2022",
      excerpt: "Komitmen kami terhadap keamanan data dan privacy dengan standar internasional dan regulasi Indonesia.",
      date: "November 22, 2025",
      category: "Security",
      image: "🔒",
      author: "Security Team"
    },
    {
      id: 5,
      title: "Real-time Dashboard: Monitoring Bisnis dalam Genggaman",
      excerpt: "Pantau performa bisnis Anda secara real-time dengan dashboard interaktif yang mudah digunakan dan powerful.",
      date: "November 24, 2025",
      category: "Features",
      image: "📈",
      author: "Product Team"
    },
    {
      id: 6,
      title: "Success Story: Bagaimana SME Meningkatkan Revenue 200% dengan OASIS BI PRO",
      excerpt: "Kisah nyata bagaimana salah satu client kami berhasil meningkatkan revenue hingga 200% dalam 6 bulan menggunakan OASIS BI PRO.",
      date: "November 25, 2025",
      category: "Case Study",
      image: "🎯",
      author: "Customer Success Team"
    }
  ]

  const categories = ["All", "Product Launch", "Integration", "Technology", "Security", "Features", "Case Study"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Blog OASIS BI PRO
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-100">
              Insights, Updates, dan Best Practices seputar Business Intelligence, Data Analytics, dan Platform kami
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  category === "All"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-12 flex items-center justify-center">
                  <div className="text-6xl">{post.image}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.author}</span>
                    <button className="text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1">
                      Baca
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe ke Newsletter Kami</h2>
            <p className="text-xl text-primary-100 mb-8">
              Dapatkan update terbaru, tips, dan insights langsung di inbox Anda
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Platform Updates</h2>
          <div className="space-y-6">
            <div className="bg-white border-l-4 border-primary-600 p-6 rounded-r-lg shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">New Feature: Advanced AI Forecasting</h3>
                  <p className="text-gray-600 mb-2">
                    Kami telah menambahkan algoritma forecasting yang lebih advanced dengan akurasi prediksi hingga 95%.
                  </p>
                  <span className="text-sm text-gray-500">2 hari yang lalu</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-l-4 border-green-500 p-6 rounded-r-lg shadow">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">System Update: Performance Improvement</h3>
                  <p className="text-gray-600 mb-2">
                    Response time dashboard kini 40% lebih cepat dengan optimisasi backend terbaru.
                  </p>
                  <span className="text-sm text-gray-500">5 hari yang lalu</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-lg shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Integration: Duitku Payment Gateway</h3>
                  <p className="text-gray-600 mb-2">
                    Integrasi penuh dengan Duitku untuk 15+ metode pembayaran yang aman dan mudah.
                  </p>
                  <span className="text-sm text-gray-500">1 minggu yang lalu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Siap Mencoba OASIS BI PRO?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Mulai transformasi data Anda hari ini dengan free trial 7 hari
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Mulai Free Trial
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/about"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
