import "../index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminPanelPage from "./pages/AdminPanelPage.tsx";
import ArticlePage from "./pages/ArticlePage.tsx";
import CharSheetPage from "./pages/CharSheetPage.tsx";
import CombatCheatSheetPage from "./pages/CombatCheatSheetPage.tsx";
import CreateHomebrewPage from "./pages/CreateHomebrewPage.tsx";
import DatabasePage from "./pages/DatabasePage.tsx";
import DatabaseViewPage from "./pages/DatabaseViewPage.tsx";
import EditCharSheetPage from "./pages/EditCharSheetPage.tsx";
import EncyclopediaPage from "./pages/EncyclopediaPage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import LootGenPage from "./pages/LootGenPage.tsx";
import MapPage from "./pages/MapPage.tsx";
import MyCharSheetsPage from "./pages/MyCharSheetsPage.tsx";
import MyShopsPage from "./pages/MyShopsPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import ShopGenPage from "./pages/ShopGenPage.tsx";
import SoundboardPage from "./pages/SoundboardPage.tsx";
import SpellBookPage from "./pages/SpellBookPage.tsx";
import SpellLibraryPage from "./pages/SpellLibraryPage.tsx";
import UpdateLogPage from "./pages/UpdateLogPage.tsx";
import FAQPage from "./pages/FAQPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/registrace",
    element: <RegisterPage />,
  },
  {
    path: "/prihlaseni",
    element: <LoginPage />,
  },
  {
    path: "/admin-panel",
    element: <AdminPanelPage />,
  },
  {
    path: "/clanek/",
    element: <ArticlePage />,
  },
  {
    path: "/deniky-postavy",
    element: <MyCharSheetsPage />,
  },
  {
    path: "/tahak-pri-boji",
    element: <CombatCheatSheetPage />,
  },
  {
    path: "/vytvorit-homebrew",
    element: <CreateHomebrewPage />,
  },
  {
    path: "/databaze",
    element: <DatabasePage />,
  },
  {
    path: "/databaze/tbd",
    element: <DatabaseViewPage />,
  },
  {
    path: "/uprava-postavy/",
    element: <EditCharSheetPage />,
  },
  {
    path: "/wiki",
    element: <EncyclopediaPage />,
  },
  {
    path: "/generace-pokladu",
    element: <LootGenPage />,
  },
  {
    path: "/mapa",
    element: <MapPage />,
  },
  {
    path: "/deniky-postavy/postava/",
    element: <CharSheetPage />,
  },
  {
    path: "/moje-obchody",
    element: <MyShopsPage />,
  },
  {
    path: "/profil",
    element: <ProfilePage />,
  },
  {
    path: "/nastaveni",
    element: <SettingsPage />,
  },
  {
    path: "/mojeobchody/generace-obchodu",
    element: <ShopGenPage />,
  },
  {
    path: "/soundboard",
    element: <SoundboardPage />,
  },
  {
    path: "/knihovna-kouzel/kniha-kouzla",
    element: <SpellBookPage />,
  },
  {
    path: "/knihovna-kouzel",
    element: <SpellLibraryPage />,
  },
  {
    path: "/zmeny",
    element: <UpdateLogPage />,
  },
  {
    path: "/faq",
    element: <FAQPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
