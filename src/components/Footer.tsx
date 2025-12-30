import { Link } from "react-router-dom";
import facebook from '@/assets/footer/facebook-app-symbol.png'
import linkedin from '@/assets/footer/linkedin-big-logo.png'
import telegram from '@/assets/footer/telegram.png'
import whatsapp from '@/assets/footer/whatsapp.png'
import youtube from '@/assets/footer/youtube.png'
import logo from '@/assets/logo/Hitek-Flycam-Logo-5.png'
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-warm-gray text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img 
                src={logo} 
                alt="Hitek Flycam Logo" 
                className="w-32 h-auto object-contain" // Đặt kích thước cố định cho logo
              />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.contact.title" as any)}</h3>
            <ul className="space-y-3">
              <li className="leading-tight">
                <div className="text-white/70 text-sm">
                  <div className="font-medium mb-1">{t("footer.contact.company.name" as any)}</div>
                  <div className="text-white/60">{t("footer.contact.company.hotline" as any)}</div>
                  <div className="text-white/60">{t("footer.contact.company.email" as any)}</div>
                </div>
              </li>
              <li className="leading-tight">
                <div className="text-white/70 text-sm">
                  <div className="font-medium mb-1">{t("footer.contact.ceo.title" as any)}</div>
                  <div className="text-white/60">{t("footer.contact.ceo.hotline" as any)}</div>
                  <div className="text-white/60">{t("footer.contact.ceo.email" as any)}</div>
                </div>
              </li>
              <li className="leading-tight">
                <div className="text-white/70 text-sm">
                  <div className="font-medium mb-1">{t("footer.contact.manager.title" as any)}</div>
                  <div className="text-white/60">{t("footer.contact.manager.hotline" as any)}</div>
                  <div className="text-white/60">{t("footer.contact.manager.email" as any)}</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.services.title" as any)}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/drone-repair" className="text-white/70 hover:text-primary transition-colors text-sm block py-1">
                  {t("footer.services.items.droneRepair" as any)}
                </Link>
              </li>
              <li>
                <Link to="/services/surveying-drone" className="text-white/70 hover:text-primary transition-colors text-sm block py-1">
                  {t("footer.services.items.surveyingDrone" as any)}
                </Link>
              </li>
              <li>
                <Link to="/services/delivery-drone" className="text-white/70 hover:text-primary transition-colors text-sm block py-1">
                  {t("footer.services.items.deliveryDrone" as any)}
                </Link>
              </li>
              <li>
                <Link to="/services/flight-permit-service" className="text-white/70 hover:text-primary transition-colors text-sm block py-1">
                  {t("footer.services.items.flightPermit" as any)}
                </Link>
              </li>
              <li>
                <Link to="/services/drone-import" className="text-white/70 hover:text-primary transition-colors text-sm block py-1">
                  {t("footer.services.items.droneImport" as any)}
                </Link>
              </li>
              <li>
                <Link to="/services/drone-filming" className="text-white/70 hover:text-primary transition-colors text-sm block py-1">
                  {t("footer.services.items.droneFilming" as any)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.policy.title" as any)}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dieu-khoan-chung" className="text-white/70 hover:text-primary transition-colors text-sm block py-1">
                  {t("footer.policy.items.general" as any)}
                </Link>
              </li>
              <li>
                <Link to="/chinh-sach-bao-mat" className="text-white/70 hover:text-primary transition-colors text-sm block py-1">
                  {t("footer.policy.items.privacy" as any)}
                </Link>
              </li>
              <li>
                <Link to="/chinh-sach-an-toan-bay" className="text-white/70 hover:text-primary transition-colors text-sm block py-1">
                  {t("footer.policy.items.flightSafety" as any)}
                </Link>
              </li>
              <li>
                <Link to="/dieu-khoan-xin-phep-bay" className="text-white/70 hover:text-primary transition-colors text-sm block py-1">
                  {t("footer.policy.items.flightPermit" as any)}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Connect with us */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.connect.title" as any)}</h3>
            <div className="flex gap-3 mb-6">
              <a href="#" className=" flex items-center justify-center">
                <img 
                  src={facebook} 
                  alt="Facebook" 
                  className="w-full h-full object-contain"
                />
              </a>
              <a href="#" className=" flex items-center justify-center">
                <img 
                  src={whatsapp} 
                  alt="WhatsApp" 
                  className="w-full h-full object-contain"
                />
              </a>
              <a href="#" className=" flex items-center justify-center">
                <img 
                  src={youtube} 
                  alt="YouTube" 
                  className="w-full h-full object-contain"
                />
              </a>
              <a href="#" className=" flex items-center justify-center">
                <img 
                  src={linkedin} 
                  alt="LinkedIn" 
                  className="w-full h-full object-contain"
                />
              </a>
              <a href="#" className=" flex items-center justify-center">
                <img 
                  src={telegram} 
                  alt="Telegram" 
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
          <p>{t("footer.copyright" as any)}</p>
        </div>
      </div>
    </footer>
  );
}