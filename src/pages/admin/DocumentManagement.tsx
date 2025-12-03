import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Filter, Calendar, User, MoreVertical, ArrowUpDown, Download, FileText, File, FileImage, FileArchive, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DocumentForm } from '@/components/admin/DocumentForm'
import { Document as DocumentType } from '@/types' // Đổi tên import
import { supabase } from '@/services/supabase'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

// Định nghĩa type Document (nếu chưa có trong types.ts)
interface Document {
  id: string
  title: string
  description: string
  category: string
  author: string
  status: 'published' | 'draft'
  date: string
  file_url: string
  file_name: string
  file_size: string
  file_type: string
  created_at: string
}

export default function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'author'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    fetchDocuments()
  }, [])

  useEffect(() => {
    filterAndSortDocuments()
  }, [documents, searchQuery, categoryFilter, statusFilter, sortBy, sortOrder])

  const fetchDocuments = async () => {
  try {
    let query = supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    // Nếu không phải admin, chỉ lấy tài liệu của user hiện tại
    // const { user } = useAuth();
    // if (user && !user.isAdmin) {
    //   query = query.eq('user_id', user.id);
    // }

    const { data, error } = await query;

    if (error) throw error
    setDocuments(data || [])
  } catch (error) {
    console.error('Error fetching documents:', error)
  } finally {
    setLoading(false)
  }
}

  const filterAndSortDocuments = () => {
    let filtered = [...documents]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        doc.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(doc => doc.category === categoryFilter)
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(doc => doc.status === statusFilter)
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date || '').getTime()
          bValue = new Date(b.date || '').getTime()
          break
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case 'author':
          aValue = a.author.toLowerCase()
          bValue = b.author.toLowerCase()
          break
      }
      return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (bValue > aValue ? 1 : -1)
    })

    setFilteredDocuments(filtered)
  }

  const handleEdit = (doc: Document) => {
    setSelectedDocument(doc)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setDocuments(documents.filter(doc => doc.id !== id))
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  }

  const toggleStatus = async (doc: Document) => {
  try {
    const newStatus = doc.status === 'published' ? 'draft' : 'published'
    const { error } = await supabase
      .from('documents')
      .update({ status: newStatus })
      .eq('id', doc.id)

    if (error) throw error
    
    fetchDocuments()
  } catch (error) {
    console.error('Error updating status:', error)
  }
}

  const handleDownload = (fileUrl: string, fileName: string) => {
    // Tạo link tải xuống
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getCategoryBadgeColor = (category: string) => {
  const colors: Record<string, string> = {
    'Kỹ thuật': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    'Pháp lý': 'bg-green-100 text-green-800 hover:bg-green-200',
    'Sản phẩm': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    'Đào tạo': 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    'Giá cả': 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
    'Hướng dẫn': 'bg-pink-100 text-pink-800 hover:bg-pink-200',
  }
  return colors[category] || 'bg-gray-100 text-gray-800 hover:bg-gray-200'
}

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="h-4 w-4 text-red-500" />
    if (fileType.includes('word') || fileType.includes('doc')) return <FileText className="h-4 w-4 text-blue-500" />
    if (fileType.includes('excel') || fileType.includes('xls')) return <FileText className="h-4 w-4 text-green-500" />
    if (fileType.includes('image')) return <FileImage className="h-4 w-4 text-purple-500" />
    if (fileType.includes('zip') || fileType.includes('rar')) return <FileArchive className="h-4 w-4 text-orange-500" />
    return <File className="h-4 w-4 text-gray-500" />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải tài liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Quản lý Tài liệu
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Quản lý và xuất bản tài liệu, văn bản của công ty
          </p>
        </div>
        {/* THÊM NÚT TRỞ VỀ DASHBOARD Ở ĐÂY */}
        <div className="flex gap-2">
          <Button 
            onClick={() => window.location.href = '/admin'} // hoặc '/dashboard' tùy route của bạn
            variant="outline"
            className="gap-2 border-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <Home className="w-4 h-4" />
            Trở về Dashboard
          </Button>
          <Button 
            onClick={() => {
              setSelectedDocument(null)
              setShowForm(true)
            }} 
            className="mr-2 gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md"
            >
            <Plus className="w-4 h-4" />
            Thêm tài liệu mới
          </Button>
        </div>
      </div>
      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm tài liệu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  <SelectItem value="Kỹ thuật">Kỹ thuật</SelectItem>
                  <SelectItem value="Pháp lý">Pháp lý</SelectItem>
                  <SelectItem value="Sản phẩm">Sản phẩm</SelectItem>
                  <SelectItem value="Đào tạo">Đào tạo</SelectItem>
                  <SelectItem value="Giá cả">Giá cả</SelectItem>
                  <SelectItem value="Hướng dẫn">Hướng dẫn</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="published">Đã xuất bản</SelectItem>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value: 'date' | 'title' | 'author') => setSortBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Ngày đăng</SelectItem>
                  <SelectItem value="title">Tiêu đề</SelectItem>
                  <SelectItem value="author">Tác giả</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card className="shadow-sm border-gray-200 dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                Danh sách tài liệu
              </CardTitle>
              <CardDescription className="mt-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">{filteredDocuments.length}</span> tài liệu
                {searchQuery && (
                  <span className="ml-2 text-sm text-gray-500">
                    (Kết quả tìm kiếm cho "{searchQuery}")
                  </span>
                )}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Tài liệu</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Tác giả</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày đăng</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Không tìm thấy tài liệu nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 flex-shrink-0 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            {getFileIcon(doc.file_type)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 dark:text-white truncate">
                              {doc.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {doc.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getCategoryBadgeColor(doc.category)}>
                          {doc.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-gray-400" />
                          {doc.author}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            {doc.file_name && doc.file_name.length > 20 
                              ? `${doc.file_name.substring(0, 20)}...` 
                              : doc.file_name}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => handleDownload(doc.file_url, doc.file_name)}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                        {doc.file_size && (
                          <div className="text-xs text-gray-500">
                            {doc.file_size}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={doc.status === 'published'}
                            onCheckedChange={() => toggleStatus(doc)}
                          />
                          <span className={`text-sm ${doc.status === 'published' ? 'text-green-600' : 'text-gray-500'}`}>
                            {doc.status === 'published' ? 'Công khai' : 'Nháp'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {doc.date || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(doc.file_url, doc.file_name)}
                            className="h-8 w-8 p-0"
                            title="Tải xuống"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleEdit(doc)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownload(doc.file_url, doc.file_name)}>
                                <Download className="h-4 w-4 mr-2" />
                                Tải xuống
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleStatus(doc)}>
                                {doc.status === 'published' ? (
                                  <>
                                    <EyeOff className="h-4 w-4 mr-2" />
                                    Chuyển sang nháp
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Công khai
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => setDeleteConfirm(doc.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedDocument ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}
            </DialogTitle>
            <DialogDescription>
              {selectedDocument ? 'Cập nhật thông tin tài liệu' : 'Tải lên tài liệu mới'}
            </DialogDescription>
          </DialogHeader>
          <DocumentForm
            document={selectedDocument}
            onSuccess={() => {
              setShowForm(false)
              fetchDocuments()
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Hành động này không thể hoàn tác. Tài liệu sẽ bị xóa vĩnh viễn.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(deleteConfirm!)}
            >
              Xóa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}