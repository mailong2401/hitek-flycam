// pages/Documents.tsx
"use client";

import { useState } from "react";
import HeroSection from "@/components/documents/HeroSection";
import DocumentGrid from "@/components/documents/DocumentGrid";
import { DocumentItem } from "@/types/document";

const allDocuments: DocumentItem[] = [
  {
    id: "1",
    title: "Hướng dẫn sử dụng DJI Mavic 3",
    description: "Hướng dẫn chi tiết vận hành và bảo quản drone DJI Mavic 3",
    category: "Kỹ thuật",
    date: "15/03/2024",
    download_count: 245,
    file_url: "/documents/test1.pdf",
    file_type: "PDF",
    file_size: "5.2 MB",
    tags: ["DJI", "Mavic 3", "Hướng dẫn"]
  },
  {
    id: "2",
    title: "Quy định bay không người lái tại Việt Nam 2024",
    description: "Cập nhật mới nhất về quy định bay UAV của Cục Hàng không Việt Nam",
    category: "Pháp lý",
    date: "10/03/2024",
    download_count: 189,
    file_url: "/documents/test2.pdf",
    file_type: "PDF",
    file_size: "3.8 MB",
    tags: ["Quy định", "Pháp luật", "UAV"]
  },
  {
    id: "3",
    title: "Catalog sản phẩm DJI 2024",
    description: "Danh mục đầy đủ các sản phẩm drone DJI mới nhất 2024",
    category: "Sản phẩm",
    date: "05/03/2024",
    download_count: 156,
    file_url: "/documents/test3.rar",
    file_type: "RAR",
    file_size: "12.5 MB",
    tags: ["DJI", "Catalog", "Sản phẩm mới"]
  },
];

export default function DocumentsPage() {
  const handleDownload = (doc: DocumentItem) => {
    console.log(`Download triggered: ${doc.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-gray-50/50 to-background dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <HeroSection />
      
      <section className="min-h-screen py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="pb-20">
            <DocumentGrid
              documents={allDocuments}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </section>
    </div>
  );
}