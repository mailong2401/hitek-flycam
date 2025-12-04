// components/documents/DocumentGrid.tsx
import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DocumentCard from "./DocumentCard";
import { Document } from "@/types/document";

interface DocumentGridProps {
  documents: Document[];
  onDownload: (doc: Document) => void;
}

const DocumentGrid = ({ documents, onDownload }: DocumentGridProps) => {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 768) setColumns(1);
      else setColumns(2);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  if (documents.length === 0) {
    return (
      <Card className="py-16">
        <CardContent className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Không tìm thấy tài liệu
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Sẽ sớm có tài liệu mới
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};

export default DocumentGrid;
