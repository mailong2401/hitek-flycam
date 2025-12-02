import { FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { Document } from "@/types";

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc: Document) => {
    try {
      if (doc.id) {
        const currentCount = (doc as any).download_count || 0;
        await supabase
          .from('documents')
          .update({ download_count: currentCount + 1 })
          .eq('id', doc.id);
      }

      if (doc.file_url) {
        window.open(doc.file_url, '_blank');
      }
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Tài liệu
              </h1>
              <p className="text-xl text-muted-foreground">
                Thư viện tài liệu hữu ích về drone và dịch vụ của chúng tôi
              </p>
            </div>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Tài liệu
            </h1>
            <p className="text-xl text-muted-foreground">
              Thư viện tài liệu hữu ích về drone và dịch vụ của chúng tôi
            </p>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Chưa có tài liệu nào được công khai.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {doc.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {doc.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {doc.description}
                  </p>
                  
                  {/* Thêm ngày đăng */}
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-3 h-3 mr-2" />
                    {doc.date || 'N/A'}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>
                      {(doc as any).download_count || 0} lượt tải
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Đã công khai
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDownload(doc)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}