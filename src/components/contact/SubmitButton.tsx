// components/contact/SubmitButton.tsx
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SubmitButtonProps {
  isLoading: boolean;
  isValid: boolean;
}

const SubmitButton = ({ isLoading, isValid }: SubmitButtonProps) => {
  const { t } = useLanguage();

  return (
    <Button 
      type="submit" 
      className="w-full" 
      size="lg"
      disabled={isLoading || !isValid}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          {t<string>("contact.form.submit.loading")}
        </>
      ) : (
        t<string>("contact.form.submit.text")
      )}
    </Button>
  );
};

export default SubmitButton;