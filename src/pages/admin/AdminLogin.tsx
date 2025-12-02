import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Mail } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@hitekdrone.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { user, login } = useAuth()

  // Nếu đã login, redirect đến admin
  useEffect(() => {
    if (user) {
      console.log('✅ User already logged in, redirecting...')
      const timer = setTimeout(() => {
        window.location.href = '/admin'
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    console.log('📝 Form submitted')

    try {
      await login(email, password)
      console.log('✅ Login function completed')
      // AuthContext sẽ tự động redirect
    } catch (err: any) {
      console.error('❌ Login error:', err)
      setError(err.message || 'Đăng nhập thất bại')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">Đăng nhập để quản lý hệ thống</p>
        </div>

        {/* Đã login thông báo */}
        {user && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-green-700">
              ✅ Đã đăng nhập với tư cách <strong>{user.email}</strong>
            </p>
            <p className="text-sm text-green-600 mt-1">
              Đang chuyển hướng đến trang admin...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
              <strong>Lỗi:</strong> {error}
            </div>
          )}

          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
              disabled={loading || !!user}
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
              required
              disabled={loading || !!user}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12"
            disabled={loading || !!user}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>

          <div className="text-center">
            <a href="/" className="text-sm text-blue-600 hover:underline">
              ← Quay lại trang chủ
            </a>
          </div>
        </form>

        {/* Manual redirect button */}
        {user && (
          <div className="mt-6 text-center">
            <Button 
              onClick={() => window.location.href = '/admin'}
              className="w-full"
              variant="outline"
            >
              🚀 Vào Admin Dashboard Ngay
            </Button>
          </div>
        )}

        {/* Test credentials */}
        <div className="mt-8 p-4 bg-gray-100 rounded text-sm text-gray-600">
          <p className="font-medium mb-2">Test credentials:</p>
          <p>Email: admin@hitekdrone.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  )
}