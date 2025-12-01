
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactForm } from '@/components/ContactForm';
export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Liên hệ
            </h1>
            <p className="text-xl text-muted-foreground">
              Hãy để chúng tôi giúp bạn với dự án drone của bạn
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
