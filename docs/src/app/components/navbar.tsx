import "../../index.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import NavbarButton from "./navbarButton.tsx";
import Button from "./button.tsx";
import ThemeButton from "./themeButton.tsx";

interface NavbarProps {
  pageTitle: string;
  activePage: string;
}

function Navbar(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/", text: "Domů" },
    { to: "/databaze", text: "Databáze" },
    { to: "/deniky-postavy", text: "Hráč" },
    { to: "/admin-panel", text: "Pán jeskyně" },
    { to: "/wiki", text: "Svět" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-slate-50">
      {/* Top bar */}
      <div className="grid grid-cols-6 lg:grid-cols-3 items-center px-4 py-2 md:px-5 lg:px-6 border-b border-slate-900/20">
        {/* Left: mobile icon only, desktop icon + logo text */}
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="bg-primary-500 size-8 shrink-0 rounded-sm" />
          <p className="font-logo text-logo hidden lg:block">ČAROTÉKA</p>
        </Link>

        {/* Center title */}
        <div className="flex-1 px-3 flex justify-center col-start-2 col-span-4 lg:col-span-1">
          <h6 className="font-action text-h5 truncate sm:text-h4">
            {props.pageTitle}
          </h6>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-end gap-2 lg:gap-3">
          <div className="hidden sm:block">
            {/* BUDE TADY THEME BUTTON */}
            <p>TB</p>
          </div>

          {/* Mobile / tablet hamburger */}
          <button
            type="button"
            aria-pressed={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="cursor-pointer group inline-flex h-10 w-10 p-2 items-center justify-center rounded-full bg-primary-400 hover:bg-primary-500 text-slate-800 transition lg:hidden"
          >
            <svg
              className="pointer-events-none h-6 w-6 fill-current"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                className="origin-center translate-x-[7px] -translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-x-0 group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[315deg]"
                y="7"
                width="9"
                height="2"
                rx="1"
              />
              <rect
                className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-[[aria-pressed=true]]:rotate-45"
                y="7"
                width="16"
                height="2"
                rx="1"
              />
              <rect
                className="origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[135deg]"
                y="7"
                width="9"
                height="2"
                rx="1"
              />
            </svg>
          </button>

          {/* Desktop auth buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button to="/prihlaseni" text="Přihlásit se" color="primary" />
            <Button to="/registrace" text="Registrovat se" color="secondary" />
          </div>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:flex w-full items-center justify-center gap-3 px-4 pb-2 text-action">
        {navItems.map((item) => (
          <NavbarButton
            key={item.to}
            to={item.to}
            text={item.text}
            isActive={props.activePage === item.text}
          />
        ))}
      </nav>

      {/* Mobile / tablet dropdown menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-900/10 px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-2 text-action">
            {navItems.map((item) => (
              <NavbarButton
                key={item.to}
                to={item.to}
                text={item.text}
                isActive={props.activePage === item.text}
              />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
