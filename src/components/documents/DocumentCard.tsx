// components/documents/DocumentCard.tsx
import { FileText, ArrowRight  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Document } from "@/types/document";

interface DocumentCardProps {
  document: Document;
  onDownload: (doc: Document) => void;
}

const DocumentCard = ({ document: doc, onDownload }: DocumentCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 flex flex-col h-full">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10" />
      
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-red-500/20 rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
      
      {/* Header with Icon */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-red-500/5 p-6">
        <div className="absolute top-4 right-4">
        </div>
        
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-red-500/20 blur-xl rounded-full" />
            
            {/* Icon Container */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-500">
              <FileText className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
            </div>
            
            {/* Decorative Corner */}
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-primary to-red-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-6 flex flex-col flex-grow space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
          {doc.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-grow">
          {doc.description}
        </p>

        {/* Action Button */}
        <Button 
          variant="default" 
          className="w-full mt-4 bg-gradient-to-r from-primary to-red-500 hover:from-red-500 hover:to-primary text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
          onClick={() => onDownload(doc)}
        >
          Xem chi tiết
          <ArrowRight className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
          <div className="absolute right-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300">
          </div>
        </Button>
      </CardContent>

      {/* Hover Indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-red-500 rounded-full opacity-0 group-hover:w-3/4 group-hover:opacity-100 transition-all duration-500" />
    </Card>
  );
};

export default DocumentCard;
