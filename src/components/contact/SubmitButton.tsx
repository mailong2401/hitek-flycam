// components/contact/SubmitButton.tsx
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
}

const SubmitButton = ({ isLoading, className = "" }: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className={`w-full ${className}`} 
      size="lg"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Đang gửi...
        </>
      ) : (
        'Gửi tin nhắn'
      )}
    </Button>
  );
};

export default SubmitButton;
