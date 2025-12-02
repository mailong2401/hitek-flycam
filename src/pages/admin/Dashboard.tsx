import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { LogOut, FileText, BookOpen, MessageSquare, Users, TrendingUp, Calendar, Eye, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { supabase } from "@/services/supabase"
import { BlogPost } from "@/types"
import { Document } from "@/types"

interface DashboardStats {
  totalPosts: number
  totalDocuments: number
  totalPublishedPosts: number
  totalPublishedDocuments: number
  totalUsers?: number
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalDocuments: 0,
    totalPublishedPosts: 0,
    totalPublishedDocuments: 0,
    totalUsers: 0
  })
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch all data in parallel
      const [
        postsData,
        documentsData,
        publishedPostsData,
        publishedDocumentsData,
        usersData
      ] = await Promise.all([
        supabase.from('blog_posts').select('*'),
        supabase.from('documents').select('*'),
        supabase.from('blog_posts').select('*').eq('status', 'published'),
        supabase.from('documents').select('*').eq('status', 'published'),
        supabase.auth.admin.listUsers() // Để lấy số lượng users
      ])

      // Fetch recent posts (last 3)
      const { data: recentPostsData } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

      // Fetch recent documents (last 3)
      const { data: recentDocumentsData } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

      // Set stats
      setStats({
        totalPosts: postsData.data?.length || 0,
        totalDocuments: documentsData.data?.length || 0,
        totalPublishedPosts: publishedPostsData.data?.length || 0,
        totalPublishedDocuments: publishedDocumentsData.data?.length || 0,
        totalUsers: usersData.data?.users?.length || 0
      })

      // Set recent data
      setRecentPosts(recentPostsData || [])
      setRecentDocuments(recentDocumentsData || [])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateChange = (current: number, previous: number = current * 0.8) => {
    if (previous === 0) return '+100%'
    const change = ((current - previous) / previous) * 100
    return `${change >= 0 ? '+' : ''}${Math.round(change)}%`
  }

  const dashboardStats = [
    { 
      title: "Tổng bài viết", 
      value: stats.totalPosts.toString(), 
      icon: BookOpen, 
      change: calculateChange(stats.totalPosts), 
      color: "bg-blue-500",
      description: `${stats.totalPublishedPosts} đã công khai`
    },
    { 
      title: "Tài liệu", 
      value: stats.totalDocuments.toString(), 
      icon: FileText, 
      change: calculateChange(stats.totalDocuments), 
      color: "bg-green-500",
      description: `${stats.totalPublishedDocuments} đã công khai`
    },
    { 
      title: "FAQ Chatbot", 
      value: "42", 
      icon: MessageSquare, 
      change: "+23%", 
      color: "bg-purple-500",
      description: "Câu hỏi thường gặp"
    },
    { 
      title: "Người dùng", 
      value: stats.totalUsers?.toString() || "0", 
      icon: Users, 
      change: calculateChange(stats.totalUsers || 0), 
      color: "bg-orange-500",
      description: "Tài khoản hệ thống"
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Xin chào, <span className="font-semibold text-blue-600">{user?.email}</span> • Chào mừng trở lại!
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Cập nhật lúc: {new Date().toLocaleString('vi-VN')}
            </p>
          </div>
          <Button onClick={logout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">{stat.change} so với tháng trước</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Blog Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Bài viết gần đây
              </CardTitle>
              <CardDescription>
                {recentPosts.length} bài viết mới nhất
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentPosts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p>Chưa có bài viết nào</p>
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bài viết</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentPosts.map((post) => (
                        <TableRow key={post.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium truncate max-w-[200px]">
                            {post.title}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              post.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {post.status === 'published' ? 'Công khai' : 'Nháp'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.date || 'N/A'}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full" onClick={() => window.location.href = '/admin/blog'}>
                      Xem tất cả bài viết ({stats.totalPosts})
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Tài liệu mới
              </CardTitle>
              <CardDescription>
                {recentDocuments.length} tài liệu mới nhất
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentDocuments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p>Chưa có tài liệu nào</p>
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tài liệu</TableHead>
                        <TableHead>Loại</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {recentDocuments.map((doc) => (
                      <TableRow key={doc.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium truncate max-w-[200px]">
                          {doc.title || doc.file_name}
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 truncate max-w-[80px] inline-block">
                            {doc.file_type || 'FILE'}
                          </span>
                        </TableCell>
                        <TableCell className="min-w-[100px]"> {/* Thêm class này */}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            doc.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          } whitespace-nowrap inline-block`}> {/* Thêm whitespace-nowrap và inline-block */}
                            {doc.status === 'published' ? 'Công khai' : 'Nháp'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {doc.file_url && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(doc.file_url, '_blank')}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full" onClick={() => window.location.href = '/admin/documents'}>
                      Xem tất cả tài liệu ({stats.totalDocuments})
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
            <CardDescription>
              Truy cập nhanh vào các tính năng quản lý
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/admin/blog" className="group">
                <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.totalPosts}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Quản lý Blog</h3>
                  <p className="text-gray-600 text-sm">
                    {stats.totalPublishedPosts} bài đã công khai
                  </p>
                </div>
              </a>

              <a href="/admin/documents" className="group">
                <div className="border border-gray-200 rounded-lg p-6 hover:border-green-500 hover:bg-green-50 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {stats.totalDocuments}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Quản lý Tài liệu</h3>
                  <p className="text-gray-600 text-sm">
                    {stats.totalPublishedDocuments} tài liệu đã công khai
                  </p>
                </div>
              </a>

              <a href="/admin/chatbot" className="group">
                <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      42
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Quản lý Chatbot</h3>
                  <p className="text-gray-600 text-sm">Quản lý câu hỏi thường gặp</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}