import '../../index.css'
import NavbarButton from './navbarButton.tsx'
import Button from "./button.tsx";
import ThemeButton from "./themeButton.tsx";

interface NavbarProps {
    pageTitle: string;
    activePage: string;
}
function Navbar(props: NavbarProps){
    return(
        <>
            <header className={"flex w-full flex-col fixed"}>
                <div className={"grid grid-cols-3 items-center border-b border-slate-900/20 px-4 py-2 bg-slate-50"}>
                    <div className={"flex flex-row gap-3 items-center"}>
                        <div className={"bg-violet-500 size-8"}/>
                        <p className={"font-logo text-logo"}>ČAROTÉKA</p>
                    </div>
                    <h6 className={"font-action text-action-h6 text-center"}>
                        {props.pageTitle}
                    </h6>
                    <div className={"flex gap-3 justify-end items-center"}>
                        <ThemeButton color="dark" icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 text-light"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                />
                            </svg>
                        }/>
                        <Button to="/prihlaseni" text="Přihlásit se" color="primary"/>
                        <Button to="/registrace" text="Registrovat se" color="secondary"/>
                    </div>
                </div>
                <nav className={"flex w-full items-center justify-center gap-3 text-action"}>
                    <NavbarButton to="/" text="Domů" isActive={props.activePage === "Domů"} />
                    <NavbarButton to="/databaze" text="Databáze" isActive={props.activePage === "Databáze"} />
                    <NavbarButton to="/deniky-postavy" text="Hráč" isActive={props.activePage === "Hráč"} />
                    <NavbarButton to="/admin-panel" text="Pán jeskyně" isActive={props.activePage === "Pán jeskyně"} />
                    <NavbarButton to="/wiki" text="Svět" isActive={props.activePage === "Svět"} />
                </nav>
            </header>
        </>
    )
}

export default Navbar
