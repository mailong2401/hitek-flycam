// components/contact/ContactInfo.tsx
import { Phone, Mail, MapPin, Clock, LucideIcon } from "lucide-react";

interface ContactInfoProps {
  className?: string;
}

const ContactInfo = ({ className = "" }: ContactInfoProps) => {
  const contactItems = [
    {
      icon: Phone,
      title: "Hotline",
      details: ["028 99 95 95 88", "034 612 4230"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@droneservices.vn", "support@droneservices.vn"]
    },
    {
      icon: MapPin,
      title: "Địa chỉ",
      details: ["Quận 1, Tp. Hồ Chí Minh, Việt Nam"]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Thông tin liên hệ
        </h2>
        <div className="space-y-6">
          {contactItems.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="rounded-2xl overflow-hidden h-64">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.026905683275!2d106.66160506142168!3d10.809251108541229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293ccc17367d%3A0x776e13bbfa8a0eef!2zSEFJIEFVIEJVSUxESU5HLCAzOUIgVHLGsOG7nW5nIFPGoW4sIFBoxrDhu51uZyAyLCBUw6JuIELDrG5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1764823019547!5m2!1svi!2s"
    width="100%"
    height="100%"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

    </div>
  );
};

export default ContactInfo;
