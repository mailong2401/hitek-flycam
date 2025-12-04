// types/document.ts
export interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  downloadCount: number;
  fileUrl: string;
  fileType: string;
  fileSize?: string;
  tags?: string[];
}
