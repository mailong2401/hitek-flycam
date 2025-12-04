import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
      <SelectTrigger className="w-[90px] border-none bg-transparent shadow-none focus:ring-0">
        <SelectValue>
          <span className="flex items-center gap-1.5">
            <LanguageFlag language={language} />
            <span className="text-sm font-medium uppercase">
              {getLanguageCode(language)}
            </span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[140px]">
        <SelectItem value="vi" className="flex items-center gap-2">
          <span className="text-xl">🇻🇳</span>
          <div className="flex flex-col">
            <span className="font-medium">Tiếng Việt</span>
          </div>
        </SelectItem>
        <SelectItem value="en" className="flex items-center gap-2">
          <span className="text-xl">🇺🇸</span>
          <div className="flex flex-col">
            <span className="font-medium">English</span>
          </div>
        </SelectItem>
        <SelectItem value="ja" className="flex items-center gap-2">
          <span className="text-xl">🇯🇵</span>
          <div className="flex flex-col">
            <span className="font-medium">日本語</span>
          </div>
        </SelectItem>
        <SelectItem value="kr" className="flex items-center gap-2">
          <span className="text-xl">🇰🇷</span>
          <div className="flex flex-col">
            <span className="font-medium">한국어</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

// Helper component cho flag
function LanguageFlag({ language }: { language: string }) {
  const flags: Record<string, string> = {
    vi: "🇻🇳",
    en: "🇺🇸",
    ja: "🇯🇵",
    kr: "🇰🇷",
  };
  
  return <span className="text-lg">{flags[language] || "🌐"}</span>;
}

// Helper function để lấy mã ngôn ngữ
function getLanguageCode(lang: string): string {
  const codes: Record<string, string> = {
    vi: "VN",
    en: "EN",
    ja: "JA",
    kr: "KR",
  };
  return codes[lang] || lang.toUpperCase();
}
