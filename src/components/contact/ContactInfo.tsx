// components/contact/ContactInfo.tsx
import { Phone, Mail, MapPin, Facebook, Linkedin, Youtube, Instagram, PhoneCall } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactInfoProps {
  className?: string;
}

const ContactInfo = ({ className = "" }: ContactInfoProps) => {
  const { t } = useLanguage();

  const contactItems = [
    {
      icon: Phone,
      title: t<string>("contact.info.contactItems.phone.title"),
      details: [
        { label: t<string>("contact.info.contactItems.phone.hotline"), value: t<string>("contact.info.contactItems.phone.hotlineValue") },
        { label: t<string>("contact.info.contactItems.phone.mobile"), value: t<string>("contact.info.contactItems.phone.mobileValue") }
      ]
    },
    {
      icon: Mail,
      title: t<string>("contact.info.contactItems.email.title"),
      details: [
        { label: t<string>("contact.info.contactItems.email.info"), value: t<string>("contact.info.contactItems.email.infoValue") },
        { label: t<string>("contact.info.contactItems.email.support"), value: t<string>("contact.info.contactItems.email.supportValue") }
      ]
    }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: t<string>("contact.info.social.facebook"),
      url: "https://facebook.com/hitekflycam",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: Linkedin,
      name: t<string>("contact.info.social.linkedin"),
      url: "https://linkedin.com/company/hitekflycam",
      color: "bg-blue-700 hover:bg-blue-800"
    },
    {
      icon: Youtube,
      name: t<string>("contact.info.social.youtube"),
      url: "https://youtube.com/@hitekflycam",
      color: "bg-red-500 hover:bg-red-600"
    },
    {
      icon: PhoneCall,
      name: t<string>("contact.info.social.whatsapp"),
      url: "https://t.me/hitekflycam",
      color: "bg-blue-400 hover:bg-blue-500"
    },
    {
      icon: Instagram,
      name: t<string>("contact.info.social.instagram"),
      url: "https://instagram.com/hitekflycam",
      color: "bg-pink-500 hover:bg-pink-600"
    }
  ];

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Compact Contact Information */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {t<string>("contact.info.title")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactItems.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">
                  {item.title}
                </h3>
              </div>
              
              <div className="space-y-3">
                {item.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {detail.label}:
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
              
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Section - More Compact */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-primary">
            {t<string>("contact.info.social.title")}
          </h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {socialLinks.map((social, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center h-20 rounded-lg hover:scale-105 transition-all duration-300 bg-white border border-gray-200 hover:border-primary/30 hover:shadow-sm"
              onClick={() => handleSocialClick(social.url)}
              aria-label={`Follow us on ${social.name}`}
            >
              <div className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center mb-1`}>
                <social.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-foreground">
                {social.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Map - More Compact */}
      <div className="rounded-xl overflow-hidden h-64">
        <div className="relative h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.026905683275!2d106.66160506142168!3d10.809251108541229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293ccc17367d%3A0x776e13bbfa8a0eef!2zSEFJIEFVIEJVSUxESU5HLCAzOUIgVHLGsOG7nW5nIFPGoW4sIFBoxrDhu51uZyAyLCBUw6JuIELDrG5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1764823019547!5m2!1svi!2s"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 border-0"
            title="Hitek Flycam Location"
          />
          
          {/* Map Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/80 to-transparent pointer-events-none"></div>
          
          {/* Location Info */}
          <div className="absolute top-3 left-80 right-4">
            <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-primary" />
                <span className="text-gray-700">{t<string>("contact.info.map.location")}</span>
              </div>
              <a 
                href="https://maps.google.com/?q=HAI+AU+BUILDING,+39B+Trường+Sơn,+Phường+2,+Tân+Bình,+Hồ+Chí+Minh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 text-xs font-medium"
              >
                {t<string>("contact.info.map.directions")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;