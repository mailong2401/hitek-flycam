import React, { createContext, useState, useContext, useEffect } from 'react'
import { supabase } from '@/services/supabase'

interface User {
  id: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Hàm redirect
  const redirectTo = (path: string) => {
    if (window.location.pathname !== path) {
      console.log(`🔄 Redirecting to: ${path}`)
      window.location.href = path
    }
  }

  useEffect(() => {
    // Kiểm tra session hiện tại
    const checkSession = async () => {
      console.log('🔍 Checking existing session...')
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          console.log('✅ Found existing session for:', session.user.email)
          setUser({
            id: session.user.id,
            email: session.user.email!
          })
        } else {
          console.log('📭 No existing session')
          setUser(null)
        }
      } catch (error) {
        console.error('❌ Error checking session:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Lắng nghe thay đổi auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth event:', event)
        
        if (session?.user) {
          const newUser = {
            id: session.user.id,
            email: session.user.email!
          }
          setUser(newUser)
          
          // Tự động redirect sau khi login
          if (event === 'SIGNED_IN' && window.location.pathname === '/admin/login') {
            console.log('🔄 Auto-redirecting to /admin')
            setTimeout(() => redirectTo('/admin'), 500)
          }
        } else {
          setUser(null)
          // Nếu đang ở trang admin mà logout, redirect về login
          if (window.location.pathname.startsWith('/admin') && 
              window.location.pathname !== '/admin/login') {
            console.log('🔒 Logged out, redirecting to login')
            setTimeout(() => redirectTo('/admin/login'), 500)
          }
        }
        setLoading(false)
      }
    )

    return () => {
      console.log('🧹 Cleaning up auth listener')
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    console.log('🔑 Attempting login for:', email)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('❌ Login error:', error.message)
        throw error
      }
      
      console.log('✅ Login successful for:', data.user?.email)
      // onAuthStateChange sẽ handle redirect
      
    } catch (error: any) {
      console.error('💥 Login failed:', error)
      setUser(null)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      console.log('👋 Logging out...')
      await supabase.auth.signOut()
      setUser(null)
      console.log('✅ Logged out successfully')
      redirectTo('/admin/login')
    } catch (error) {
      console.error('❌ Logout error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Hiển thị loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}