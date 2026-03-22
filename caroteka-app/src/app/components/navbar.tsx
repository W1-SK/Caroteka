import "../../index.css";
import NavbarButton from "./navbarButton.tsx";
import Button from "./button.tsx";
import ThemeButton from "./themeButton.tsx";
import { Link } from "react-router-dom"; // CLICK LOGO TO GO TO HOME

interface NavbarProps {
  pageTitle: string;
  activePage: string;
}
function Navbar(props: NavbarProps) {
  return (
    <>
      <header className={"flex w-full flex-col fixed z-50"}>
        <div
          className={
            "grid grid-cols-3 items-center px-4 py-2 border-b border-slate-900/20 bg-slate-50"
          }
        >
          <Link to="/" className="flex w-fit flex-row gap-3 items-center">
            <div className="bg-primary-500 size-8" />
            <p className="font-logo text-logo">ČAROTÉKA</p>
          </Link>
          <h6 className={"font-action text-h4 text-center"}>
            {props.pageTitle}
          </h6>
          <div className={"flex gap-3 justify-end items-center"}>
            <div>TCH</div>
            <Button to="/prihlaseni" text="Přihlásit se" color="primary" />
            <Button to="/registrace" text="Registrovat se" color="secondary" />
          </div>
        </div>
        <nav
          className={
            "w-full flex items-center justify-center gap-3 text-action"
          }
        >
          <NavbarButton
            to="/"
            text="Domů"
            isActive={props.activePage === "Domů"}
          />
          <NavbarButton
            to="/databaze"
            text="Databáze"
            isActive={props.activePage === "Databáze"}
          />
          <NavbarButton
            to="/deniky-postavy"
            text="Hráč"
            isActive={props.activePage === "Hráč"}
          />
          <NavbarButton
            to="/admin-panel"
            text="Pán jeskyně"
            isActive={props.activePage === "Pán jeskyně"}
          />
          <NavbarButton
            to="/wiki"
            text="Svět"
            isActive={props.activePage === "Svět"}
          />
        </nav>
      </header>
    </>
  );
}

export default Navbar;
