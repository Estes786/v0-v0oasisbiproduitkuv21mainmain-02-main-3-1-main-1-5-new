'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase-client'
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [] as string[],
    color: 'red' as 'red' | 'yellow' | 'green'
  })

  // Password strength calculator
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength({ score: 0, feedback: [], color: 'red' })
      return
    }

    let score = 0
    const feedback: string[] = []

    // Length check
    if (formData.password.length >= 8) {
      score += 25
    } else {
      feedback.push('Minimal 8 karakter')
    }

    // Uppercase check
    if (/[A-Z]/.test(formData.password)) {
      score += 25
    } else {
      feedback.push('Minimal 1 huruf besar')
    }

    // Lowercase check
    if (/[a-z]/.test(formData.password)) {
      score += 25
    } else {
      feedback.push('Minimal 1 huruf kecil')
    }

    // Number check
    if (/\d/.test(formData.password)) {
      score += 25
    } else {
      feedback.push('Minimal 1 angka')
    }

    // Special character bonus
    if (/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      score += 10
    }

    const color: 'red' | 'yellow' | 'green' = 
      score >= 75 ? 'green' : score >= 50 ? 'yellow' : 'red'

    setPasswordStrength({ score: Math.min(score, 100), feedback, color })
  }, [formData.password])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password minimal 8 karakter')
      setLoading(false)
      return
    }

    // Check password strength
    if (passwordStrength.score < 50) {
      setError('Password terlalu lemah. ' + passwordStrength.feedback.join(', '))
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error

      if (data.user) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/member/dashboard')
        }, 2000)
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mendaftar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">O</span>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            OASIS BI PRO
          </span>
        </Link>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mulai Free Trial 14 Hari</h1>
          <p className="text-gray-600 mb-6">Daftar sekarang, tanpa perlu kartu kredit</p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">
                ✓ Akun berhasil dibuat! Redirecting...
              </p>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Minimal 8 karakter, huruf besar, kecil, angka"
                  aria-label="Password"
                  aria-describedby="password-strength"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2" id="password-strength">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.color === 'green' ? 'bg-green-500' :
                          passwordStrength.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${passwordStrength.score}%` }}
                        role="progressbar"
                        aria-valuenow={passwordStrength.score}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      passwordStrength.color === 'green' ? 'text-green-600' :
                      passwordStrength.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {passwordStrength.score >= 75 ? 'Kuat' : passwordStrength.score >= 50 ? 'Sedang' : 'Lemah'}
                    </span>
                  </div>
                  {passwordStrength.feedback.length > 0 && (
                    <ul className="text-xs text-gray-600 space-y-1" role="alert">
                      {passwordStrength.feedback.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <XCircle className="w-3 h-3 text-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {passwordStrength.score >= 75 && (
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3 h-3" />
                      Password kuat!
                    </p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ulangi password"
                  aria-label="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                  <XCircle className="w-3 h-3" />
                  Password tidak cocok
                </p>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Password cocok
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Mendaftar...' : 'Daftar Gratis'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link href="/auth/signin" className="text-blue-600 font-semibold hover:text-blue-700">
                Sign In
              </Link>
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Yang Anda dapatkan:</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                14 hari free trial penuh
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Akses semua fitur analytics
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                AI-powered insights
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Tanpa kartu kredit
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Dengan mendaftar, Anda menyetujui{' '}
          <Link href="/legal/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{' '}
          dan{' '}
          <Link href="/legal/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
