import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const CommentsSection = () => {
  const { t } = useLanguage();

  // Xác định ngôn ngữ hiển thị
  const displayLanguage = t("lang") === 'vi' ? 'vi' : 'en';

  return (
    <div className="mt-12">
      <Tabs defaultValue="comments" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-card">
          <TabsTrigger value="comments" className="text-foreground">
            {displayLanguage === 'vi' ? 'Bình luận (0)' : 'Comments (0)'}
          </TabsTrigger>
          <TabsTrigger value="share" className="text-foreground">
            {displayLanguage === 'vi' ? 'Chia sẻ' : 'Share'}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="comments">
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-center text-muted-foreground py-8">
              {displayLanguage === 'vi'
                ? 'Tính năng bình luận đang được phát triển'
                : 'Comment feature is under development'}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="share">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex justify-center gap-4">
              <Button variant="outline">Facebook</Button>
              <Button variant="outline">Twitter</Button>
              <Button variant="outline">LinkedIn</Button>
              <Button variant="outline">
                {displayLanguage === 'vi' ? 'Sao chép liên kết' : 'Copy Link'}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};