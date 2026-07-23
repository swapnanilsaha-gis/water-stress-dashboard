import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LandingPage from "@/pages/LandingPage";
import Home from "@/pages/Home";
import StudyArea from "@/pages/StudyArea";
import Methodology from "@/pages/Methodology";
import Prediction from "@/pages/Prediction";
import Infrastructure from "@/pages/Infrastructure";
import Conclusion from "@/pages/Conclusion";
import { navItems } from "@/data/navigation";

/** All sections map to real pages. */
const pages: Record<string, React.ComponentType> = {
  "/home": Home,
  "/study-area": StudyArea,
  "/methodology": Methodology,
  "/prediction": Prediction,
  "/infrastructure": Infrastructure,
  "/conclusion": Conclusion,
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route element={<DashboardLayout />}>
          {navItems.map((item) => {
            const Page = pages[item.path];
            return <Route key={item.path} path={item.path} element={<Page />} />;
          })}
        </Route>
        {/* Unknown routes fall back to the landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
