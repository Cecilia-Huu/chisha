import { HomeIcon, Flame } from "lucide-react";
import Index from "./pages/Index.jsx";
import RankingPage from "./pages/RankingPage.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Ranking",
    to: "/ranking",
    icon: <Flame className="h-4 w-4" />,
    page: <RankingPage />,
  },
];
