// types/document.ts
export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  download_count?: number;
  file_url: string;
  file_type: string;
  file_size: string;
  tags: string[];
}

export interface DocumentDownloadRequest {
  name: string;
  phone: string;
  email: string;
  company?: string;
  document: {
    id: string | number;
    title: string;
    description?: string;
    file_url?: string;
    file_type?: string;
    file_size?: string;
  };
}

export interface DocumentDownloadResponse {
  success: boolean;
  data?: any;
  error?: string;
}