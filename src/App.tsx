import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";

// Public pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Documents from "./pages/Documents";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/blog/BlogDetail";
import Contact from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

// Services
import DroneRepair from "@/pages/services/DroneRepair";
import SurveyingDrone from "@/pages/services/SurveyingDrone";
import DeliveryDrone from "@/pages/services/DeliveryDrone";
import DroneImport from "@/pages/services/DroneImport";
import FlightPermitService from "@/pages/services/FlightPermitService";
import DroneFilming from "@/pages/services/DroneFilming";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Home />} />
              <Route path="/gioi-thieu" element={<About />} />
              <Route path="/dich-vu" element={<Services />} />
              <Route path="/tai-lieu" element={<Documents />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/lien-he" element={<Contact />} />

              {/* SERVICES */}
              <Route path="/services/drone-repair" element={<DroneRepair />} />
              <Route
                path="/services/surveying-drone"
                element={<SurveyingDrone />}
              />
              <Route
                path="/services/delivery-drone"
                element={<DeliveryDrone />}
              />
              <Route path="/services/drone-import" element={<DroneImport />} />
              <Route
                path="/services/flight-permit-service"
                element={<FlightPermitService />}
              />
              <Route
                path="/services/drone-filming"
                element={<DroneFilming />}
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;