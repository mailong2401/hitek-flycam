export type UserRole = 'user' | 'admin'

export interface User {
  id: string
  email: string
  role: UserRole
}

export interface BlogPost {
  id?: string
  title: string
  excerpt: string
  content?: string
  image: string
  date: string
  author: string
  category: string
  status?: 'draft' | 'published'
  created_at?: string
  user_id?: string
}
export interface Document {
  id?: string
  title: string
  description: string
  category: string
  status: 'published' | 'draft'
  date?: string
  file_url: string
  file_name?: string
  file_size?: string
  file_type?: string
  author?: string
  user_id?: string
  created_at?: string
  download_count?: number // Thêm dòng này
}