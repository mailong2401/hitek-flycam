// components/documents/DocumentCard.tsx
import { FileText, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DocumentItem } from "@/types/document";

interface DocumentCardProps {
  document: DocumentItem;
  onDownload?: (doc: DocumentItem) => void;
}

const DocumentCard = ({ document: doc, onDownload }: DocumentCardProps) => {
  const handleViewDetails = () => {
    // Download directly without showing modal
    handleDirectDownload();
  };

  const handleDirectDownload = () => {
    if (doc.file_url) {
      const link = window.document.createElement('a');
      link.href = doc.file_url;

      const getExtension = (fileType: string) => {
        const map: Record<string, string> = {
          'PDF': '.pdf',
          'RAR': '.rar',
          'ZIP': '.zip',
          'DOCX': '.docx',
          'XLSX': '.xlsx',
          'TXT': '.txt'
        };
        return map[fileType?.toUpperCase()] || '.pdf';
      };

      const fileType = doc.file_type || 'PDF';
      const extension = getExtension(fileType);
      const fileName = `${doc.title.replace(/[<>:"/\\|?*]+/g, '_')}${extension}`;

      link.download = fileName;
      link.target = '_blank';
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);

      if (onDownload) {
        onDownload(doc);
      }
    }
  };

  return (
    <>
      <Card className="group relative overflow-hidden border-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 flex flex-col h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10" />
        
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-red-500/20 rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
        
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-red-500/5 via-transparent to-red-500/5 p-6">
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-500/20 blur-xl rounded-full" />
              
              <div className="relative w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                <FileText className="w-10 h-10 text-red-600 group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-red-500 to-red-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        <CardContent className="p-6 flex flex-col flex-grow space-y-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-red-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {doc.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-grow">
            {doc.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {doc.file_type && (
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                {doc.file_type}
              </span>
            )}
            {doc.file_size && (
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                {doc.file_size}
              </span>
            )}
          </div>

          {doc.download_count !== undefined && (
            <div className="text-xs text-gray-500">
              <Download className="w-3 h-3 inline-block mr-1" />
              {doc.download_count} lượt tải
            </div>
          )}

          <Button 
            variant="default" 
            className="w-full mt-2 bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
            onClick={handleViewDetails}
          >
            Tải tài liệu
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:scale-110 transition-transform duration-300" />
          </Button>
        </CardContent>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-red-600 to-red-600 rounded-full opacity-0 group-hover:w-3/4 group-hover:opacity-100 transition-all duration-500" />
      </Card>
    </>
  );
};

export default DocumentCard;
