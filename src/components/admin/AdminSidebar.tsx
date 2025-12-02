import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings,
  LogOut,
  PenSquare
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export const AdminSidebar = () => {
  const location = useLocation()
  const { logout } = useAuth()

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/blog', label: 'Quản lý Blog', icon: PenSquare },
    { path: '/admin/documents', label: 'Quản lý Tài liệu', icon: FileText },
    { path: '/admin/chatbot', label: 'Chatbot', icon: MessageSquare },
    { path: '/admin/settings', label: 'Cài đặt', icon: Settings },
  ]

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white lg:pt-5 lg:pb-4">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <nav className="mt-5 flex-1 space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive(item.path)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive(item.path)
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button
            onClick={logout}
            className="flex-shrink-0 w-full group block"
          >
            <div className="flex items-center">
              <LogOut className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Đăng xuất
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}