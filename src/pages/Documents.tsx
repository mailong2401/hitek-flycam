// pages/Documents.tsx
"use client";

import { useState } from "react";
import HeroSection from "@/components/documents/HeroSection";
import DocumentGrid from "@/components/documents/DocumentGrid";
import { Document } from "@/types/document";

const allDocuments: Document[] = [
  {
    id: 1,
    title: "Hướng dẫn sử dụng DJI Mavic 3",
    description: "Hướng dẫn chi tiết vận hành và bảo quản drone DJI Mavic 3",
    category: "Kỹ thuật",
    date: "15/03/2024",
    downloadCount: 245,
    fileUrl: "/documents/dji-mavic3-guide.pdf",
    fileType: "PDF",
    fileSize: "5.2 MB",
    tags: ["DJI", "Mavic 3", "Hướng dẫn"]
  },
  {
    id: 2,
    title: "Quy định bay không người lái tại Việt Nam 2024",
    description: "Cập nhật mới nhất về quy định bay UAV của Cục Hàng không Việt Nam",
    category: "Pháp lý",
    date: "10/03/2024",
    downloadCount: 189,
    fileUrl: "/documents/drone-regulations-vietnam.pdf",
    fileType: "PDF",
    fileSize: "3.8 MB",
    tags: ["Quy định", "Pháp luật", "UAV"]
  },
  {
    id: 3,
    title: "Catalog sản phẩm DJI 2024",
    description: "Danh mục đầy đủ các sản phẩm drone DJI mới nhất 2024",
    category: "Sản phẩm",
    date: "05/03/2024",
    downloadCount: 156,
    fileUrl: "/documents/dji-catalog-2024.pdf",
    fileType: "PDF",
    fileSize: "12.5 MB",
    tags: ["DJI", "Catalog", "Sản phẩm mới"]
  },
  {
    id: 4,
    title: "Hướng dẫn nhiếp ảnh bằng drone",
    description: "Kỹ thuật chụp ảnh và quay video chuyên nghiệp bằng drone",
    category: "Hướng dẫn",
    date: "01/03/2024",
    downloadCount: 312,
    fileUrl: "/documents/drone-photography-guide.pdf",
    fileType: "PDF",
    fileSize: "7.9 MB",
    tags: ["Nhiếp ảnh", "Quay phim", "Kỹ thuật"]
  },
  {
    id: 5,
    title: "Bảng giá dịch vụ thuê drone 2024",
    description: "Bảng giá các gói dịch vụ thuê drone chụp ảnh, quay phim",
    category: "Giá cả",
    date: "25/02/2024",
    downloadCount: 198,
    fileUrl: "/documents/drone-rental-prices.pdf",
    fileType: "PDF",
    fileSize: "2.1 MB",
    tags: ["Giá cả", "Thuê drone", "Dịch vụ"]
  },
  {
    id: 6,
    title: "Quy trình bảo trì định kỳ drone",
    description: "Hướng dẫn bảo trì và bảo dưỡng drone định kỳ",
    category: "Kỹ thuật",
    date: "20/02/2024",
    downloadCount: 134,
    fileUrl: "/documents/drone-maintenance.pdf",
    fileType: "PDF",
    fileSize: "4.3 MB",
    tags: ["Bảo trì", "Bảo dưỡng", "Kỹ thuật"]
  },
];

export default function DocumentsPage() {
  const handleDownload = (doc: Document) => {
    console.log(`Downloading: ${doc.title}`);
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.title.replace(/\s+/g, '-').toLowerCase() + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-gray-50/50 to-background dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <HeroSection />
      
      <section className="min-h-screen py-20">
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
