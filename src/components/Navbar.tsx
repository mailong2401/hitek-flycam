import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import logo_dark from "@/assets/logo/logo_dark.png";
import logo_light from "@/assets/logo/logo_light.png";

const services = [
  { name: "nav.services.droneRepair", path: "/services/drone-repair" },
  { name: "nav.services.surveyingDrone", path: "/services/surveying-drone" },
  { name: "nav.services.deliveryDrone", path: "/services/delivery-drone" },
  { name: "nav.services.flightPermit", path: "/services/flight-permit-service" },
  { name: "nav.services.droneImport", path: "/services/drone-import" },
  { name: "nav.services.droneFilming", path: "/services/drone-filming" },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const servicesDropdownRef = useRef(null);
  const servicesTimeoutRef = useRef(null);

  // Hàm scroll lên đầu trang
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
  }, []);

  // ----- SCROLL EFFECT -----
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ----- CLICK OUTSIDE DROPDOWN -----
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ----- HOVER HANDLERS -----
  const handleMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    };
  }, []);

  // ----- NAVIGATION LINKS -----
  const navLinks = [
    { name: t('nav.home' as any), href: "/", onClick: scrollToTop },
    { name: t('nav.about' as any), href: "/gioi-thieu", onClick: scrollToTop },
    { name: t('nav.services.title' as any), hasDropdown: true, onClick: scrollToTop },
    { name: t('nav.document' as any), href: "/tai-lieu", onClick: scrollToTop },
    { name: t('nav.blog' as any), href: "/blog", onClick: scrollToTop },
    { name: t('nav.contact' as any), href: "/lien-he", onClick: scrollToTop },
  ];

  // ----- RENDER SERVICES DROPDOWN -----
  const renderServicesDropdown = () => (
    <motion.div 
      className="absolute top-full left-0 mt-2 w-64 bg-pure-white dark:bg-pure-black rounded-lg shadow-lg border border-border overflow-hidden z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {services.map((service) => (
        <Link
          key={service.path}
          to={service.path}
          className="block px-4 py-3 text-pure-black dark:text-pure-white hover:text-vibrant-red dark:hover:text-vibrant-red hover:bg-light-gray dark:hover:bg-warm-gray transition-colors"
          onClick={scrollToTop}
        >
          {t(service.name as any)}
        </Link>
      ))}
    </motion.div>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-pure-white/95 dark:bg-pure-black/95 backdrop-blur-md ${isScrolled ? "shadow-lg" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Mobile & Desktop */}
          <div className="flex items-center gap-3">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-3">
              {/* Logo hiển thị trên cả mobile và desktop */}
              <img 
                className="w-16 h-16 lg:w-18 lg:h-18 object-contain dark:hidden"
                src={logo_light}
                alt="Hitek Flycam Logo"
              />
              <img 
                className="w-16 h-16 lg:w-18 lg:h-18 object-contain hidden dark:block"
                src={logo_dark}
                alt="Hitek Flycam Logo"
              />
              
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
                onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
                ref={link.hasDropdown ? servicesDropdownRef : null}
              >
                {link.hasDropdown ? (
                  <div className="flex items-center cursor-pointer">
                    <Link
                      to={link.href}
                      className="text-pure-black dark:text-pure-white hover:text-vibrant-red dark:hover:text-vibrant-red transition-colors font-medium"
                      onClick={link.onClick}
                    >
                      {link.name}
                    </Link>
                    <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                    <AnimatePresence>
                      {isServicesOpen && renderServicesDropdown()}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className="text-pure-black dark:text-pure-white hover:text-vibrant-red dark:hover:text-vibrant-red transition-colors font-medium"
                    onClick={link.onClick}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-3">
              <LanguageSelector />
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-pure-black dark:text-pure-white h-9 w-9"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-4 space-y-1 border-t border-border">

                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.hasDropdown ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                          className="flex items-center justify-between w-full px-4 py-3 text-left text-pure-black dark:text-pure-white hover:text-vibrant-red dark:hover:text-vibrant-red hover:bg-light-gray dark:hover:bg-warm-gray transition-colors"
                        >
                          <span className="font-medium">{link.name}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isMobileServicesOpen && (
                          <motion.div 
                            className="space-y-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            {services.map((service) => (
                              <Link
                                key={service.path}
                                to={service.path}
                                className="block px-8 py-2 text-sm text-pure-black dark:text-pure-white hover:text-vibrant-red dark:hover:text-vibrant-red hover:bg-light-gray dark:hover:bg-warm-gray transition-colors"
                                onClick={() => {
                                  scrollToTop();
                                  setIsMobileServicesOpen(false);
                                }}
                              >
                                {t(service.name as any)}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={link.href}
                        className="block px-4 py-3 text-pure-black dark:text-pure-white hover:text-vibrant-red dark:hover:text-vibrant-red hover:bg-light-gray dark:hover:bg-warm-gray transition-colors font-medium"
                        onClick={scrollToTop}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Hotline Mobile */}
                <div className="px-4 py-3 mt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-vibrant-red/10 rounded-lg">
                      <Phone className="w-4 h-4 text-vibrant-red" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Hotline hỗ trợ 24/7</p>
                      <div className="font-bold text-sm text-vibrant-red">
                        <div>028 99 95 95 88</div>
                        <div>034 612 4230</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
