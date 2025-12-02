import { useState, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { BlogPost } from '@/types'
import { supabase } from '@/services/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Image, Upload, X, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface BlogFormProps {
  post?: BlogPost | null
  onSuccess: () => void
}

const categories = [
  'Tin tức',
  'Hướng dẫn', 
  'Review',
  'Công nghệ',
  'Sản phẩm',
  'Pháp lý',
  'Nhiếp ảnh',
  'Bảo trì',
]

export const BlogForm: React.FC<BlogFormProps> = ({ post, onSuccess }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string>(post?.image || '')
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    image: post?.image || '', // URL từ storage
    date: post?.date || new Date().toISOString().split('T')[0],
    author: post?.author || user?.email?.split('@')[0] || '',
    category: post?.category || categories[0],
    status: post?.status || 'draft',
  })

  // Hàm upload ảnh lên Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setUploading(true)

    try {
      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!validTypes.includes(file.type)) {
        setError('Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WebP)')
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File quá lớn. Vui lòng chọn file nhỏ hơn 5MB')
        return
      }

      // Tạo tên file unique
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `blog-images/${fileName}`

      // Upload lên storage bucket 'blog-images'
      const { data, error: uploadError } = await supabase.storage
        .from('blog-images') // Cần tạo bucket này trong Supabase Storage
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Lấy public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      // Cập nhật preview và form data
      setPreviewImage(publicUrl)
      setFormData(prev => ({ ...prev, image: publicUrl }))
      
    } catch (error: any) {
      console.error('Error uploading image:', error)
      
      // Kiểm tra nếu bucket chưa tồn tại
      if (error.message?.includes('bucket') || error.message?.includes('not found')) {
        setError('Bucket "blog-images" chưa được tạo. Vui lòng tạo bucket trong Supabase Storage.')
      } else {
        setError(`Có lỗi khi upload ảnh: ${error.message}`)
      }
    } finally {
      setUploading(false)
    }
  }

  // Xóa ảnh
  const removeImage = () => {
    setPreviewImage('')
    setFormData(prev => ({ ...prev, image: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Xử lý URL ảnh từ internet
  const handleImageUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }))
    setPreviewImage(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validate
      if (!formData.title.trim()) {
        setError('Vui lòng nhập tiêu đề')
        return
      }
      if (!formData.excerpt.trim()) {
        setError('Vui lòng nhập tóm tắt')
        return
      }
      if (!formData.image.trim()) {
        setError('Vui lòng thêm hình ảnh cho bài viết')
        return
      }

      const blogData: any = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content?.trim() || '',
        image: formData.image,
        date: formData.date,
        author: formData.author.trim() || user?.email?.split('@')[0] || 'Admin',
        category: formData.category,
        status: formData.status,
        user_id: user?.id,
      }

      console.log('Saving post data:', blogData)

      if (post?.id) {
        // Update
        const { error } = await supabase
          .from('blog_posts')
          .update(blogData)
          .eq('id', post.id)

        if (error) throw error
      } else {
        // Insert
        const { error } = await supabase
          .from('blog_posts')
          .insert([blogData])

        if (error) throw error
      }

      onSuccess()
    } catch (error: any) {
      console.error('Error saving post:', error)
      setError(`Lỗi: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Danh mục *</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Tác giả *</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Ngày đăng *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Trạng thái</Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
          >
            <option value="draft">Bản nháp</option>
            <option value="published">Xuất bản</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Hình ảnh *</Label>
          <div className="space-y-4">
            {previewImage && (
              <div className="relative w-full max-w-md">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Error'
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                  disabled={loading || uploading}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Input
                  value={formData.image.startsWith('http') && !formData.image.includes('supabase.co/storage') ? formData.image : ''}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  placeholder="Nhập URL ảnh từ internet (https://...)"
                  disabled={loading || uploading}
                />
                <span className="text-sm text-gray-500 self-center">hoặc</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  disabled={loading || uploading}
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading || uploading}
                  className="whitespace-nowrap"
                >
                  {uploading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 mr-2" />
                  )}
                  {uploading ? 'Đang upload...' : 'Upload ảnh'}
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                • Upload ảnh lên storage: JPG, PNG, GIF, WebP (tối đa 5MB)
                <br />
                • Hoặc nhập URL ảnh từ internet
                <br />
                • Ảnh sẽ được lưu trong Supabase Storage
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="excerpt">Tóm tắt *</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={2}
            required
            disabled={loading}
            placeholder="Mô tả ngắn gọn về bài viết (hiển thị trên trang danh sách)"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="content">Nội dung chi tiết *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={8}
            required
            disabled={loading}
            placeholder="Nội dung đầy đủ của bài viết..."
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onSuccess}
          disabled={loading}
        >
          Hủy
        </Button>
        <Button 
          type="submit" 
          disabled={loading || uploading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang lưu...
            </>
          ) : post?.id ? 'Cập nhật' : 'Tạo bài viết'}
        </Button>
      </div>
    </form>
  )
}