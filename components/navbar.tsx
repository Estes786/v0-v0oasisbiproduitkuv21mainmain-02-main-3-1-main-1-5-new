'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import { LogOut, User, Settings } from 'lucide-react'

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [session, setSession] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user) {
        loadUserProfile(session.user.id)
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      
      if (session?.user) {
        await loadUserProfile(session.user.id)
      }
    } catch (error) {
      console.error('Auth check error:', error)
    } finally {
      setLoading(false)
    }
  }

  async function loadUserProfile(userId: string) {
    try {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profile) {
        setUser(profile)
      } else {
        // Fallback to auth user data
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUser({
            full_name: user.user_metadata?.full_name || 'User',
            email: user.email
          })
        }
      }
    } catch (error) {
      console.error('Profile load error:', error)
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    router.push('/')
    router.refresh()
  }

  // Don't show navbar on auth pages
  const isAuthPage = pathname?.startsWith('/auth')
  if (isAuthPage) return null

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              OASIS BI PRO
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/platform" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Platform
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Cara Kerja
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Harga
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Blog
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Blog
            </Link>
            <Link href="/legal/faq" className="text-gray-700 hover:text-blue-600 transition font-medium">
              FAQ
            </Link>
            
            {loading ? (
              <div className="w-24 h-8 bg-gray-200 animate-pulse rounded"></div>
            ) : session && user ? (
              // User is logged in - Show user menu
              <>
                <Link 
                  href="/member/dashboard" 
                  className="text-gray-700 hover:text-blue-600 transition font-semibold flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  {user.full_name || 'Dashboard'}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 transition font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              // User not logged in - Show Sign In
              <>
                <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 transition font-semibold">
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition"
                >
                  Mulai Gratis
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
